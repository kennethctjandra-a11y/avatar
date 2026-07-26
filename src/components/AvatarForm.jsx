import { SECTIONS } from '../questions';
import Field from './Field';
import Credit from './Credit';

// Renders one step of the guided flow. One question on screen at a time.
export default function AvatarForm({
  step,
  stepIndex,
  totalSteps,
  answers,
  onChange,
  onBack,
  onNext,
}) {
  const section = SECTIONS.find((s) => s.id === step.section);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10">
      <header className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm text-stone-600">
          <span aria-hidden>{section?.emoji}</span>
          <span>{section?.heading}</span>
        </p>
        <h2 className="text-2xl leading-snug font-bold text-balance sm:text-3xl">
          {step.headline}
        </h2>
        {step.help && <p className="text-[15px] leading-relaxed text-stone-600">{step.help}</p>}
      </header>

      <div className="flex flex-col gap-6">
        {step.fields.map((field, i) => (
          <Field
            key={field.key}
            field={field}
            value={answers[field.key] || ''}
            onChange={onChange}
            autoFocus={i === 0}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-edge pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-4 py-2.5 text-sm text-stone-600 transition hover:text-black"
        >
          ← Back
        </button>
        <span className="text-xs text-stone-600 tabular-nums">
          {stepIndex + 1} of {totalSteps}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black
                     transition hover:bg-amber-400"
        >
          {stepIndex + 1 === totalSteps ? 'Finish' : 'Next'}
        </button>
      </div>

      <p className="text-center text-xs text-stone-500">
        Saved on this device as you type. You can close this and come back.
      </p>

      <Credit />
    </div>
  );
}
