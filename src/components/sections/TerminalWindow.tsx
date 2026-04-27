interface TerminalWindowProps {
  lines: string[];
  title?: string;
}

export function TerminalWindow({ lines, title = "bash" }: TerminalWindowProps) {
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
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-text">
        <code>
          {lines.map((line, idx) => {
            const isPrompt = line.startsWith("roopam@dev:~$");
            return (
              <div
                key={idx}
                className={isPrompt ? "text-accent" : "text-muted"}
              >
                {line || "\u00A0"}
              </div>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
