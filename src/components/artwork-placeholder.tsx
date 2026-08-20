import { cn } from "@/lib/utils";

const TONES = {
  ember: { a: "#3a2a22", b: "#c1622e", c: "#1a120e" },
  slate: { a: "#20343a", b: "#5c7a82", c: "#101a1d" },
  ink: { a: "#232c33", b: "#3a454c", c: "#12181d" },
} as const;

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function ArtworkPlaceholder({
  title,
  tone = "ink",
  className,
}: {
  title: string;
  tone?: "ember" | "slate" | "ink";
  className?: string;
}) {
  const palette = TONES[tone];
  const seed = hash(title);
  const angle = 40 + (seed % 70);
  const cx = 20 + (seed % 60);
  const cy = 20 + ((seed >> 4) % 60);
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const gradId = `g-${seed}`;

  return (
    <div className={cn("placeholder-shimmer relative w-full h-full overflow-hidden", className)}>
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Placeholder image for ${title}`}
      >
        <defs>
          <linearGradient id={gradId} gradientTransform={`rotate(${angle})`}>
            <stop offset="0%" stopColor={palette.c} />
            <stop offset="55%" stopColor={palette.a} />
            <stop offset="100%" stopColor={palette.c} />
          </linearGradient>
          <radialGradient id={`${gradId}-r`} cx={`${cx}%`} cy={`${cy}%`} r="65%">
            <stop offset="0%" stopColor={palette.b} stopOpacity="0.55" />
            <stop offset="100%" stopColor={palette.b} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${gradId})`} />
        <rect width="400" height="500" fill={`url(#${gradId}-r)`} />
        <line
          x1={cx * 4 - 60}
          y1="0"
          x2={cx * 3 - 40}
          y2="500"
          stroke={palette.b}
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
        <span className="font-display text-3xl text-paper/25">{initials}</span>
        <span className="font-ui text-[10px] tracking-[0.18em] uppercase text-paper/30">
          Image forthcoming
        </span>
      </div>
    </div>
  );
}
