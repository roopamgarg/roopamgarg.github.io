interface CodeWindowProps {
  code: string;
  title?: string;
}

const KEYWORDS = new Set(["const", "return", "let", "var", "function"]);

function tokenize(line: string): Array<{ type: string; value: string }> {
  const tokens: Array<{ type: string; value: string }> = [];
  const regex =
    /(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b[A-Za-z_$][\w$]*\b)|(\s+)|([(){}\[\];,.=+\-*/<>!?:&|])/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    const [raw, comment, str, ident, space, punct] = match;
    if (comment) tokens.push({ type: "comment", value: raw });
    else if (str) tokens.push({ type: "string", value: raw });
    else if (ident) {
      if (KEYWORDS.has(ident)) tokens.push({ type: "keyword", value: raw });
      else if (/^[A-Z]/.test(ident))
        tokens.push({ type: "type", value: raw });
      else tokens.push({ type: "ident", value: raw });
    } else if (space) tokens.push({ type: "space", value: raw });
    else if (punct) tokens.push({ type: "punct", value: raw });
    else tokens.push({ type: "other", value: raw });
  }
  return tokens;
}

function classFor(type: string): string {
  switch (type) {
    case "keyword":
      return "text-[color:rgb(244,114,182)]";
    case "string":
      return "text-[color:rgb(134,239,172)]";
    case "comment":
      return "text-muted italic";
    case "type":
      return "text-[color:rgb(125,211,252)]";
    case "ident":
      return "text-text";
    case "punct":
      return "text-muted";
    default:
      return "";
  }
}

export function CodeWindow({ code, title = "system.ts" }: CodeWindowProps) {
  const lines = code.split("\n");

  return (
    <figure className="overflow-hidden rounded-xl border border-border/10 bg-surface-2/80">
      <header className="flex items-center gap-2 border-b border-border/10 px-3 py-2">
        <span
          className="h-2.5 w-2.5 rounded-full bg-[color:rgb(239,68,68)]"
          aria-hidden="true"
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-[color:rgb(234,179,8)]"
          aria-hidden="true"
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-[color:rgb(34,197,94)]"
          aria-hidden="true"
        />
        <span className="ml-2 text-xs text-muted">{title}</span>
      </header>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-4">
              <span
                className="select-none text-right text-muted/60"
                style={{ minWidth: "1.5rem" }}
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              <span>
                {tokenize(line).map((t, i) => (
                  <span key={i} className={classFor(t.type)}>
                    {t.value}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </figure>
  );
}
