import { useState } from 'react';
import { buildDocument, toPlainText } from '../utils/document';
import { exportPDF } from '../utils/pdfExport';
import Credit from '../components/Credit';
import { PROGRAM } from '../brand';

export default function ExportView({ answers, owner, onBack, onStartOver }) {
  const [copied, setCopied] = useState(false);
  const [pdfState, setPdfState] = useState('idle'); // idle | working | error
  const doc = buildDocument(answers);
  const handle = owner.instagram?.replace(/^@/, '');

  async function download() {
    setPdfState('working');
    try {
      await exportPDF(doc, owner);
      setPdfState('idle');
    } catch {
      setPdfState('error');
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(toPlainText(doc, owner));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 py-10">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-[0.2em] text-accent-ink uppercase">
          {PROGRAM} <span className="text-stone-400">·</span> Avatar
        </span>
        <h2 className="text-3xl leading-tight font-bold sm:text-4xl">{doc.name}</h2>
        <p className="text-sm text-stone-600">
          Built by {owner.name || 'you'}
          {handle && ` · @${handle}`}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={download}
          disabled={pdfState === 'working'}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black
                     transition hover:bg-amber-400 disabled:opacity-60"
        >
          {pdfState === 'working' ? 'Building your PDF…' : '↓ Download PDF'}
        </button>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-edge bg-surface px-6 py-3 text-sm font-medium
                     text-stone-700 transition hover:border-stone-400"
        >
          {copied ? '✓ Copied' : 'Copy as text'}
        </button>
        {pdfState === 'error' && (
          <p className="text-sm text-red-700">
            The PDF didn&rsquo;t build. Try &ldquo;Copy as text&rdquo; instead.
          </p>
        )}
      </div>

      <article className="flex flex-col gap-10 rounded-2xl border border-edge bg-surface p-5 sm:p-8">
        {doc.sections.map((section) => (
          <section key={section.id} className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className="h-0.5 w-10 rounded-full bg-accent" />
              <h3 className="text-xl font-bold">{section.heading}</h3>
            </div>

            <dl className="flex flex-col gap-5">
              {section.lines.map(({ label, text }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <dt className="text-xs font-semibold tracking-wide text-stone-600 uppercase">
                    {label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed whitespace-pre-wrap text-black">
                    {text}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </article>

      <div className="flex items-center justify-between gap-4 border-t border-edge pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-4 py-2.5 text-sm text-stone-600 transition hover:text-black"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="rounded-full px-4 py-2.5 text-sm text-stone-500 transition hover:text-red-700"
        >
          Start a new avatar
        </button>
      </div>

      <Credit />
    </div>
  );
}
