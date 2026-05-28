import { useMemo } from "react";

interface SkillsMarqueeProps {
  items?: string[];
}

const DEFAULT_SKILLS = [
  "System Architecture",
  "User Interface",
  "Product Design",
  "Web Application",
  "Frontend Engineering",
  "Fullstack Development",
];

export function SkillsMarquee({ items = DEFAULT_SKILLS }: SkillsMarqueeProps) {
  // Duplicate list to achieve seamless infinite scroll marquee
  const itemsDouble = useMemo(() => [...items, ...items, ...items, ...items], [items]);

  return (
    <div className="relative w-full overflow-hidden bg-bg py-5 border-y border-border/5 select-none my-6">
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {itemsDouble.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex items-center gap-6 font-black text-xs sm:text-sm tracking-[0.25em] normal-case lg:uppercase text-accent/80 transition-colors hover:text-accent duration-300"
          >
            <span>{skill}</span>
            <span className="text-[10px] text-accent/40 font-normal">
              {index % 3 === 0 ? "▶" : index % 3 === 1 ? "▲" : "◆"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
