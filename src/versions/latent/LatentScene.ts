import * as THREE from "three";
import {
  CLUSTERS,
  CLUSTER_ORDER,
  ITEMS,
  clusterIndex,
  gaussian,
  mulberry32,
  type ClusterId,
} from "./space";

export interface CameraRig {
  px: number;
  py: number;
  pz: number;
  tx: number;
  ty: number;
  tz: number;
}

const CLUSTER_COUNT = CLUSTER_ORDER.length;

/* Focus weights are read with a constant-bound loop so the shader also compiles on WebGL1. */
const FOCUS_GLSL = /* glsl */ `
  uniform float uFocus[${CLUSTER_COUNT}];
  float focusOf(float idx) {
    if (idx < -0.5) return 0.0;
    float w = 0.0;
    for (int k = 0; k < ${CLUSTER_COUNT}; k++) {
      if (abs(float(k) - idx) < 0.5) w = uFocus[k];
    }
    return w;
  }
`;

const POINT_VERT = /* glsl */ `
  ${FOCUS_GLSL}
  uniform float uTime;
  uniform float uAny;
  uniform float uCollapse;
  uniform vec3 uCollapseTarget;
  uniform float uPixelRatio;
  uniform float uScale;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aCluster1;
  attribute float aCluster2;
  attribute float aDrift;
  attribute float aKind;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vKind;

  void main() {
    float s = aSeed * 6.2831;
    vec3 p = position;
    p += aDrift * 0.09 * vec3(sin(uTime * 0.5 + s), cos(uTime * 0.42 + s * 1.3), sin(uTime * 0.33 + s * 0.7));

    float k = clamp(uCollapse * (1.0 + 0.6 * aSeed), 0.0, 1.0);
    k = k * k * (3.0 - 2.0 * k);
    float theta = 6.2831 * fract(aSeed * 17.317);
    float cosPhi = 2.0 * fract(aSeed * 53.731) - 1.0;
    float sinPhi = sqrt(1.0 - cosPhi * cosPhi);
    vec3 dir = vec3(sinPhi * cos(theta), sinPhi * sin(theta), cosPhi);
    vec3 core = uCollapseTarget + dir * 0.55 * pow(fract(aSeed * 7.13), 1.6);
    p = mix(p, core, k);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float w = max(focusOf(aCluster1), focusOf(aCluster2));
    float dim = mix(1.0, mix(0.12, 1.0, w), uAny);
    float depth = max(-mv.z, 0.001);
    float fade = smoothstep(44.0, 10.0, depth) * smoothstep(0.6, 2.6, depth);

    vColor = aColor;
    vKind = aKind;
    vAlpha = dim * mix(0.3, 1.0, fade);
    gl_PointSize = aSize * uPixelRatio * uScale * (1.0 + 0.45 * w * uAny) / depth;
  }
`;

const POINT_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vKind;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = pow(smoothstep(0.5, 0.0, d), 1.7);
    float core = smoothstep(0.17, 0.07, d);
    float ring = smoothstep(0.04, 0.0, abs(d - 0.4));
    float isItem = step(0.5, vKind);
    float hasRing = step(1.5, vKind);
    float a = mix(glow, core + glow * 0.4 + ring * hasRing * 0.85, isItem);
    gl_FragColor = vec4(vColor * (1.0 + isItem * 0.25), a * vAlpha);
  }
`;

const LINE_VERT = /* glsl */ `
  ${FOCUS_GLSL}
  uniform float uAny;
  uniform float uCollapse;
  attribute float aCluster1;
  attribute float aCluster2;
  varying float vAlpha;

  void main() {
    float w = max(focusOf(aCluster1), focusOf(aCluster2));
    vAlpha = (0.05 * (1.0 - uAny) + 0.42 * w * uAny) * (1.0 - clamp(uCollapse * 3.0, 0.0, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(0.85, 0.88, 1.0, vAlpha);
  }
`;

interface Label {
  el: HTMLElement;
  pos: THREE.Vector3;
  clusters: number[];
  kind: "project" | "role" | "ai" | "tech" | "cluster";
}

export class LatentScene {
  readonly cam: CameraRig;
  /** `intro` collapses the field on load, `collapse` pulls it into the contact core. */
  readonly state = { intro: 0, collapse: 0, labels: 1 };

  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
  private lookAt = new THREE.Vector3();
  private pointMaterial: THREE.ShaderMaterial;
  private lineMaterial: THREE.ShaderMaterial;
  private geometries: THREE.BufferGeometry[] = [];
  private labels: Label[] = [];
  private focus = new Float32Array(CLUSTER_COUNT);
  private focusTarget = new Float32Array(CLUSTER_COUNT);
  private any = 0;
  private anyTarget = 0;
  private pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  private time = 0;
  private last = 0;
  private raf = 0;
  private width = 1;
  private height = 1;
  private projected = new THREE.Vector3();
  private introTarget: THREE.Vector3;
  private contactTarget = new THREE.Vector3(0, 2.4, 0);
  focused: ClusterId | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    private labelLayer: HTMLElement,
    private opts: { reduced: boolean; mobile: boolean; start: CameraRig },
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 2));
    this.renderer.setClearColor(0x000000, 0);
    this.cam = { ...opts.start };
    this.introTarget = new THREE.Vector3(opts.start.tx, opts.start.ty, opts.start.tz);

    const focusUniform = { value: this.focus };
    this.pointMaterial = new THREE.ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uFocus: focusUniform,
        uTime: { value: 0 },
        uAny: { value: 0 },
        uCollapse: { value: 0 },
        uCollapseTarget: { value: new THREE.Vector3() },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
        uScale: { value: 24 },
      },
    });
    this.lineMaterial = new THREE.ShaderMaterial({
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uFocus: focusUniform, uAny: { value: 0 }, uCollapse: { value: 0 } },
    });

    this.buildPoints();
    this.buildLinks();
    this.buildLabels();
    this.resize();

    window.addEventListener("resize", this.resize);
    if (!opts.reduced) window.addEventListener("pointermove", this.onPointer);
    this.raf = requestAnimationFrame(this.tick);
  }

  setFocus(id: ClusterId | null) {
    this.focused = id;
    this.focusTarget.fill(0);
    if (id) this.focusTarget[clusterIndex(id)] = 1;
    this.anyTarget = id ? 1 : 0;
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("pointermove", this.onPointer);
    this.labels.forEach((label) => label.el.remove());
    this.geometries.forEach((g) => g.dispose());
    this.pointMaterial.dispose();
    this.lineMaterial.dispose();
    this.renderer.dispose();
  }

  /* ---------------------------------------------------------------- build */

  private buildPoints() {
    const rand = mulberry32(7);
    const white = new THREE.Color("#ffffff");
    const pos: number[] = [];
    const col: number[] = [];
    const size: number[] = [];
    const c1: number[] = [];
    const c2: number[] = [];
    const drift: number[] = [];
    const kind: number[] = [];
    const seed: number[] = [];
    const push = (
      p: [number, number, number],
      color: THREE.Color,
      s: number,
      a: number,
      b: number,
      d: number,
      k: number,
    ) => {
      pos.push(...p);
      col.push(color.r, color.g, color.b);
      size.push(s);
      c1.push(a);
      c2.push(b);
      drift.push(d);
      kind.push(k);
      seed.push(rand());
    };

    const perCluster = this.opts.mobile ? 140 : 340;
    CLUSTER_ORDER.forEach((id, ci) => {
      const { center, spread, color } = CLUSTERS[id];
      const base = new THREE.Color(color);
      const n = Math.round(id === "foundations" ? perCluster * 1.3 : perCluster);
      for (let i = 0; i < n; i++) {
        push(
          [
            center[0] + gaussian(rand) * spread,
            center[1] + gaussian(rand) * spread * 0.85,
            center[2] + gaussian(rand) * spread,
          ],
          base.clone().lerp(white, rand() * 0.3),
          1.4 + rand() * 2.4,
          ci,
          -1,
          1,
          0,
        );
      }
    });

    const dust = new THREE.Color("#7d86a0");
    const dustCount = this.opts.mobile ? 280 : 650;
    for (let i = 0; i < dustCount; i++) {
      const r = 6 + rand() * 13;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      push(
        [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta) * 0.7, r * Math.cos(phi)],
        dust,
        0.9 + rand() * 1.3,
        -1,
        -1,
        1,
        0,
      );
    }

    ITEMS.forEach((item) => {
      const color = new THREE.Color(CLUSTERS[item.clusters[0]].color).lerp(white, 0.45);
      const major = item.kind !== "tech";
      push(
        item.position,
        color,
        major ? 11 : 7,
        clusterIndex(item.clusters[0]),
        item.clusters[1] ? clusterIndex(item.clusters[1]) : -1,
        0,
        item.kind === "project" || item.kind === "role" ? 2 : 1,
      );
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geometry.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
    geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(size, 1));
    geometry.setAttribute("aCluster1", new THREE.Float32BufferAttribute(c1, 1));
    geometry.setAttribute("aCluster2", new THREE.Float32BufferAttribute(c2, 1));
    geometry.setAttribute("aDrift", new THREE.Float32BufferAttribute(drift, 1));
    geometry.setAttribute("aKind", new THREE.Float32BufferAttribute(kind, 1));
    geometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
    this.geometries.push(geometry);
    const points = new THREE.Points(geometry, this.pointMaterial);
    points.frustumCulled = false;
    this.scene.add(points);
  }

  /** Each item links to its two nearest items, which draws the "nearest neighbour" web. */
  private buildLinks() {
    const vecs = ITEMS.map((item) => new THREE.Vector3(...item.position));
    const seen = new Set<string>();
    const pos: number[] = [];
    const c1: number[] = [];
    const c2: number[] = [];
    ITEMS.forEach((item, i) => {
      const nearest = vecs
        .map((v, j) => ({ j, d: v.distanceToSquared(vecs[i]) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j } of nearest) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const a = clusterIndex(item.clusters[0]);
        const b = clusterIndex(ITEMS[j].clusters[0]);
        for (const v of [vecs[i], vecs[j]]) {
          pos.push(v.x, v.y, v.z);
          c1.push(a);
          c2.push(b);
        }
      }
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geometry.setAttribute("aCluster1", new THREE.Float32BufferAttribute(c1, 1));
    geometry.setAttribute("aCluster2", new THREE.Float32BufferAttribute(c2, 1));
    this.geometries.push(geometry);
    const lines = new THREE.LineSegments(geometry, this.lineMaterial);
    lines.frustumCulled = false;
    this.scene.add(lines);
  }

  private buildLabels() {
    const add = (text: string, kind: Label["kind"], pos: THREE.Vector3, clusters: number[], color?: string) => {
      const el = document.createElement("div");
      el.className = "latent-label";
      el.dataset.kind = kind;
      const span = document.createElement("span");
      span.textContent = text;
      if (color) span.style.color = color;
      el.appendChild(span);
      this.labelLayer.appendChild(el);
      this.labels.push({ el, pos, clusters, kind });
    };

    CLUSTER_ORDER.forEach((id, ci) => {
      const { name, center, spread, color, label } = CLUSTERS[id];
      if (label === null) return;
      const dy = label ?? Math.min(spread, 1.3) * 1.7;
      add(name, "cluster", new THREE.Vector3(center[0], center[1] + dy, center[2]), [ci], color);
    });
    ITEMS.forEach((item) => {
      const color = item.kind === "ai" ? CLUSTERS[item.clusters[0]].color : undefined;
      add(item.label, item.kind, new THREE.Vector3(...item.position), item.clusters.map(clusterIndex), color);
    });
  }

  /* ---------------------------------------------------------------- loop */

  private onPointer = (e: PointerEvent) => {
    this.pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    this.pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.pointMaterial.uniforms.uPixelRatio.value = this.renderer.getPixelRatio();
  };

  private tick = (now: number) => {
    this.raf = requestAnimationFrame(this.tick);
    const dt = this.last ? Math.min((now - this.last) / 1000, 0.05) : 1 / 60;
    this.last = now;
    const { reduced } = this.opts;
    if (!reduced) this.time += dt;

    const k = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
    for (let i = 0; i < CLUSTER_COUNT; i++) this.focus[i] += (this.focusTarget[i] - this.focus[i]) * k;
    this.any += (this.anyTarget - this.any) * k;

    const pk = 1 - Math.exp(-dt * 2.2);
    this.pointer.x += (this.pointer.tx - this.pointer.x) * pk;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * pk;

    const calm = 1 - this.any * 0.75;
    const driftX = reduced ? 0 : Math.sin(this.time * 0.11) * 0.9 * calm;
    const driftY = reduced ? 0 : Math.cos(this.time * 0.09) * 0.45 * calm;
    this.camera.position.set(
      this.cam.px + driftX + this.pointer.x * 0.9,
      this.cam.py + driftY + this.pointer.y * 0.55,
      this.cam.pz,
    );
    this.lookAt.set(this.cam.tx, this.cam.ty, this.cam.tz);
    this.camera.lookAt(this.lookAt);

    const { intro, collapse } = this.state;
    const u = this.pointMaterial.uniforms;
    u.uTime.value = this.time;
    u.uAny.value = this.any;
    u.uCollapse.value = Math.max(intro, collapse);
    (u.uCollapseTarget.value as THREE.Vector3).copy(intro > collapse ? this.introTarget : this.contactTarget);
    this.lineMaterial.uniforms.uAny.value = this.any;
    this.lineMaterial.uniforms.uCollapse.value = Math.max(intro, collapse);

    this.renderer.render(this.scene, this.camera);
    this.updateLabels();
  };

  private updateLabels() {
    const hidden = Math.max(this.state.intro, this.state.collapse);
    const visible = (1 - Math.min(1, hidden * 4)) * this.state.labels;
    const showMinor = !this.opts.mobile || this.any > 0.5;

    for (const label of this.labels) {
      if (visible <= 0.01) {
        label.el.style.opacity = "0";
        continue;
      }
      const v = this.projected.copy(label.pos).project(this.camera);
      if (v.z > 1 || v.z < -1) {
        label.el.style.opacity = "0";
        continue;
      }
      let w = 0;
      for (const ci of label.clusters) w = Math.max(w, this.focus[ci]);

      let base: number;
      if (label.kind === "cluster") base = 0.85 * (1 - this.any);
      else if (label.kind === "ai") base = 0.8 * (1 - this.any) + 0.06 * this.any;
      else base = 0;

      const lit = label.kind === "cluster" ? 0 : label.kind === "tech" && !showMinor ? 0 : w * this.any;
      const dist = this.camera.position.distanceTo(label.pos);
      const depth = Math.min(1, Math.max(0.2, (32 - dist) / 18));
      const opacity = Math.max(base, lit) * depth * visible;

      const x = (v.x * 0.5 + 0.5) * this.width;
      const y = (-v.y * 0.5 + 0.5) * this.height;
      // Keep the nav bar clear.
      const underNav = y < 90 ? 0 : 1;
      label.el.style.opacity = (opacity * underNav).toFixed(3);
      label.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    }
  }
}
