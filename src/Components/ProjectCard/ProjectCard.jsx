import React, { useEffect, useRef } from "react";
import gsap, { Power2, power1 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { useIntersection } from "react-use";

const ProjectCard = ({ index, image, name, points }) => {
  const intersectionRef = useRef(null);
  const container = useRef(null);
  const imageRef = useRef(null);

  // const intersection = useIntersection(intersectionRef, {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.2,
  // });
  // const imageReveal = CSSRulePlugin.getRule(`.project__image:after`);
  // const tl = new gsap.timeline();
  // const playAnimation = () => {
  //   tl.to(imageReveal, 1.4, { height: "0%", ease: Power2.easeInOut });

  // };
  return (
    <div
      ref={intersectionRef}
      id={`project-${index}`}
      className={`project ${index % 2 === 0 ? "left" : "right"}`}
    >
      <div ref={container} className="project__image">
        <img ref={imageRef} src={image} alt="poll" />
      </div>
      <div className="project__content">
        <div className="project__name">{name}</div>
        {points.map((point) => (
          <div className="project__point">{point}</div>
        ))}
      </div>
    </div>
  );
};
export default ProjectCard;
