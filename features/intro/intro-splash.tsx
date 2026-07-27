const INTRO_PHRASES = [
  "比拉勒·阿西夫",
  "बिलाल आसिफ़",
  "ビラル・アシフ",
  "Билал Асиф",
  "بلال آصف"
] as const;

export function IntroSplash() {
  return (
    <div
      data-intro-splash="true"
      className="intro-splash"
      aria-hidden="true"
    >
      {INTRO_PHRASES.map((phrase, index) => (
        <span
          key={phrase}
          className="intro-splash-phrase"
          style={{ "--intro-index": index } as React.CSSProperties}
        >
          {phrase}
        </span>
      ))}
    </div>
  );
}
