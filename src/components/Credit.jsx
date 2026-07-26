import { PROGRAM, AUTHOR } from '../brand';

// Subtle, persistent attribution. Shown on every screen so the tool carries its
// origin no matter where a screenshot ends up.
export default function Credit({ className = '' }) {
  return (
    <p className={`text-center text-[11px] tracking-wide text-stone-500 ${className}`}>
      <span className="font-semibold text-accent-ink">{PROGRAM}</span>
      <span aria-hidden> · </span>
      <span>by {AUTHOR}</span>
    </p>
  );
}
