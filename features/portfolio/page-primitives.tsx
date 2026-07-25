export function SectionLabel({
  children,
  tone = "light"
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`font-jetbrains text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs ${
        tone === "dark" ? "text-white/45" : "text-ink/45"
      }`}
    >
      ( {children} )
    </p>
  );
}
