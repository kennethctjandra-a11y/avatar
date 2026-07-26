import { SECTIONS } from '../questions';

export default function ProgressBar({ sectionId, stepIndex, totalSteps }) {
  const pct = totalSteps > 0 ? Math.round(((stepIndex + 1) / totalSteps) * 100) : 0;
  const activeIndex = SECTIONS.findIndex((s) => s.id === sectionId);

  return (
    <div className="sticky top-0 z-20 border-b border-edge bg-paper/90 backdrop-blur">
      <div className="mx-auto w-full max-w-2xl px-5 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <ol className="flex min-w-0 flex-1 items-center gap-1.5">
            {SECTIONS.map((section, i) => {
              const done = i < activeIndex;
              const active = i === activeIndex;
              return (
                <li key={section.id} className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span
                    className={`h-1 rounded-full transition-colors ${
                      done ? 'bg-accent/60' : active ? 'bg-accent' : 'bg-edge'
                    }`}
                  />
                  <span
                    className={`truncate text-[10px] font-medium tracking-wide uppercase ${
                      active ? 'text-accent-ink' : 'text-stone-500'
                    }`}
                  >
                    {section.title}
                  </span>
                </li>
              );
            })}
          </ol>
          <span
            className="shrink-0 text-[11px] font-semibold text-stone-600 tabular-nums"
            aria-live="polite"
          >
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
