import { Link } from 'react-router-dom'

const stackNotes = [
  { tool: 'React + Vite', note: 'Core app shell and routing via react-router-dom.' },
  { tool: 'Framer Motion', note: 'Entrance stagger animations, magnetic button physics, and the command palette transitions.' },
  { tool: 'GSAP + ScrollTrigger', note: 'Scroll-linked reveal animations per section, and the case study architecture diagrams.' },
  { tool: 'Lenis', note: 'Smooth inertial scrolling across the whole site.' },
  { tool: 'React Three Fiber + Three.js', note: 'The reactive shader background — a custom plasma field shader, a cursor-reactive particle river, and a starfield, all driven by a shared mouse/scroll input tracker.' },
  { tool: 'Custom cursor', note: 'A dot + ring cursor replacing the native pointer, hidden on touch devices.' },
  { tool: 'Command palette', note: 'A ⌘K-triggered fuzzy command list for jumping to sections or running actions like copying my email.' },
  { tool: 'Interactive terminal', note: 'A fake shell in the Contact section — try typing help.' },
]

export default function Meta() {
  return (
    <section id="meta" className="case-study">
      <div className="container">
        <Link to="/" className="btn ghost dash-back">← Back to portfolio</Link>

        <div className="sec-label">— Meta</div>
        <h1 className="sec-title">How I built this site</h1>
        <p className="hero-tagline" style={{ maxWidth: '700px' }}>
          A breakdown of the stack and decisions behind this portfolio, for anyone curious enough to dig this deep.
        </p>

        <div className="glass case-block" style={{ marginTop: '2rem' }}>
          <h3>Stack &amp; tools</h3>
          <ul className="case-list">
            {stackNotes.map((s) => (
              <li key={s.tool}>
                <strong style={{ color: 'var(--ink)' }}>{s.tool}</strong> — {s.note}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass case-block" style={{ marginTop: '1.5rem' }}>
          <h3>A few deliberate choices</h3>
          <ul className="case-list">
            <li>The background shader tracks cursor position via a window-level listener rather than canvas pointer events, since the canvas has pointer-events disabled so it never blocks clicks.</li>
            <li>Scroll velocity feeds into the background shader's glitch intensity — scroll fast, and the plasma field briefly distorts.</li>
            <li>Every section reveal uses GSAP ScrollTrigger with staggered timing so content builds in rather than popping in all at once.</li>
          </ul>
        </div>

        <p className="hero-tagline" style={{ marginTop: '2rem' }}>
          Found this by exploring — nice. Try the command palette (⌘K), or see if you know the Konami code.
        </p>
      </div>
    </section>
  )
}