export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className="rounded-2xl border border-dashed border-black/[0.08] bg-white p-8 md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9ca3af]">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#111827]">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7a828e]">{description}</p>
    </section>
  );
}
