import { frameworks } from "@/lib/site";

/**
 * Continuous rail of the regimes we build against. The list is duplicated
 * once so the -50% keyframe loops seamlessly.
 */
export default function FrameworkMarquee() {
  const items = [...frameworks, ...frameworks];

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track items-center">
        {items.map((f, i) => (
          <span key={`${f}-${i}`} className="flex items-center">
            <span className="px-7 text-[15px] whitespace-nowrap text-fog-400 transition-colors duration-500 hover:text-fog-100 sm:px-9 sm:text-[17px]">
              {f}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-white/15" />
          </span>
        ))}
      </div>
    </div>
  );
}
