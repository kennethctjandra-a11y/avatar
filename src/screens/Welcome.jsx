import Credit from '../components/Credit';
import { PROGRAM } from '../brand';

export default function Welcome({ owner, setOwner, onStart, hasProgress, onResume }) {
  const ready = owner.name.trim().length > 0;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center gap-8 px-5 py-14">
      <div className="flex flex-col gap-5">
        <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
          {PROGRAM} <span className="text-stone-400">·</span> Avatar
        </span>
        <h1 className="text-4xl leading-[1.1] font-bold text-balance sm:text-5xl">
          Your ICP isn&rsquo;t a persona.
          <br />
          <span className="text-accent-ink">It&rsquo;s a mirror.</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-stone-600">
          Fill this out like you&rsquo;re writing about your past self. Twenty questions, about
          fifteen minutes. You&rsquo;ll walk out with a clean one-pager of your ideal client.
        </p>
      </div>

      {hasProgress && (
        <button
          type="button"
          onClick={onResume}
          className="self-start rounded-full border border-accent-ink/25 bg-accent/15 px-5 py-2.5
                     text-sm font-medium text-accent-ink transition hover:bg-accent/25"
        >
          Pick up where you left off →
        </button>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border border-edge bg-surface p-5">
        <p className="text-sm text-stone-600">
          No account, no password. This is just so your name lands on the PDF.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={owner.name}
            onChange={(e) => setOwner({ ...owner, name: e.target.value })}
            placeholder="Your name"
            aria-label="Your name"
            autoComplete="name"
            className="flex-1 rounded-xl border border-edge bg-paper px-4 py-3 text-black
                       outline-none placeholder:text-stone-500 focus:border-accent
                       focus:ring-2 focus:ring-accent/25"
          />
          <div className="flex flex-1 items-center rounded-xl border border-edge bg-paper px-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
            <span className="text-stone-500">@</span>
            <input
              type="text"
              value={owner.instagram}
              onChange={(e) =>
                setOwner({ ...owner, instagram: e.target.value.replace(/^@/, '').trim() })
              }
              placeholder="instagram"
              aria-label="Your Instagram handle"
              autoCapitalize="none"
              autoComplete="off"
              className="w-full bg-transparent py-3 pl-1 text-black outline-none
                         placeholder:text-stone-500"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        disabled={!ready}
        className="rounded-full bg-accent px-6 py-4 text-base font-semibold text-black transition
                   hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Start Building My Avatar
      </button>

      <Credit className="pt-2" />
    </div>
  );
}
