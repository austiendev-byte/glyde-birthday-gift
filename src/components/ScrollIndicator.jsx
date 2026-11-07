export default function ScrollIndicator({ label, target }) {
  return (
    <a
      href={target}
      className="group flex flex-col items-center gap-2 rounded-full px-3 py-2 text-dusty/80 transition-colors hover:text-dusty"
    >
      <span className="type-small">{label}</span>
      <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-rose/80 pt-1.5">
        <span className="scroll-dot block h-1.5 w-1.5 rounded-full bg-dusty/70" />
      </span>
    </a>
  )
}
