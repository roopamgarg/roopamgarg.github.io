interface TechStackProps {
  items: string[];
}

export function TechStack({ items }: TechStackProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-text">Tech Stack</h3>
        <p className="text-sm text-muted">Tools and technologies I work with.</p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="pill">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
