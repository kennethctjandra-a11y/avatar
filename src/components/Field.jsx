const base =
  'w-full rounded-xl border border-edge bg-surface px-4 py-3 text-black ' +
  'placeholder:text-stone-500 outline-none transition ' +
  'focus:border-accent focus:ring-2 focus:ring-accent/25';

export default function Field({ field, value, onChange, autoFocus }) {
  const id = `field-${field.key}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-stone-600">
        {field.label}
      </label>
      {field.type === 'text' ? (
        <input
          id={id}
          type="text"
          className={base}
          value={value}
          placeholder={field.placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      ) : (
        <textarea
          id={id}
          className={`${base} resize-none leading-relaxed`}
          rows={field.rows || 4}
          value={value}
          placeholder={field.placeholder}
          autoFocus={autoFocus}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      )}
    </div>
  );
}
