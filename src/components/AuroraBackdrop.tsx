import { useTheme } from '../contexts/ThemeContext';

/**
 * Hero backdrop. Replaces the old three.js shader (~600 kB) with three blurred
 * gradient blobs and a static grid. The blobs animate on `transform` only, so
 * the browser promotes them to compositor layers and the main thread stays free.
 * Cost: a few kB of CSS, no JS in the frame loop.
 */
export default function AuroraBackdrop() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  const blob = (color: string, size: string): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    background: color,
    filter: `blur(${dark ? 90 : 70}px)`,
    willChange: 'transform',
    pointerEvents: 'none',
  });

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <div
        className="aurora-blob aurora-a"
        style={{ ...blob(dark ? 'rgba(45,106,101,0.55)' : 'rgba(45,106,101,0.28)', '46vw'), top: '-10%', insetInlineStart: '-6%' }}
      />
      <div
        className="aurora-blob aurora-b"
        style={{ ...blob(dark ? 'rgba(90,170,164,0.32)' : 'rgba(150,175,170,0.34)', '38vw'), top: '18%', insetInlineStart: '38%' }}
      />
      <div
        className="aurora-blob aurora-c"
        style={{ ...blob(dark ? 'rgba(120,110,90,0.28)' : 'rgba(200,180,150,0.42)', '42vw'), top: '38%', insetInlineStart: '62%' }}
      />

      {/* Fine engineering grid — static, so it costs one paint and nothing after */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, var(--border-light) 1px, transparent 1px), linear-gradient(to bottom, var(--border-light) 1px, transparent 1px)',
          backgroundSize: 'clamp(48px, 6vw, 96px) clamp(48px, 6vw, 96px)',
          opacity: dark ? 0.32 : 0.5,
          maskImage: 'radial-gradient(ellipse 80% 60% at 30% 40%, #000 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 30% 40%, #000 20%, transparent 78%)',
        }}
      />

      {/* Scrim so type stays legible over whatever the blobs are doing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--bg-warm-white) 30%, transparent) 0%, color-mix(in srgb, var(--bg-warm-white) 62%, transparent) 58%, var(--bg-warm-white) 100%)',
        }}
      />
    </div>
  );
}
