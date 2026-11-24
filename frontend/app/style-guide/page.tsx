import type {Metadata} from 'next'

export const metadata: Metadata = {title: 'Style guide', robots: {index: false, follow: false}}

const swatches = [
  {name: 'Main blue', hex: '#00267c', use: 'Buttons, links, header bar, call-to-action bands', text: '#fff'},
  {name: 'Secondary blue', hex: '#1c76ab', use: 'Accents, hover and focus states, gradients, statistics', text: '#fff'},
  {name: 'Accent (proposed)', hex: '#e8a33d', use: 'Primary call-to-action button only', text: '#2a1a00'},
  {name: 'Ink', hex: '#12263a', use: 'Body text', text: '#fff'},
  {name: 'Surface', hex: '#eef3f9', use: 'Alternating section backgrounds', text: '#12263a'},
]

export default function StyleGuide() {
  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <div className="meta">Internal reference</div>
          <h1>Style guide</h1>
          <p className="lead">The fonts, colors and components used across the TEAM Coalition website.</p>
        </div>
      </div>
      <div className="wrap pad">
        <h2>Colors</h2>
        <div className="swgrid">
          {swatches.map((s) => (
            <div className="sw" key={s.hex}>
              <div className="chip" style={{background: s.hex, color: s.text}}>
                {s.hex}
              </div>
              <b>{s.name}</b>
              <span>{s.use}</span>
            </div>
          ))}
        </div>
        <p>
          Both blues pass WCAG AA contrast on white (main blue about 13:1, secondary blue about 5:1). The amber accent is a
          proposed addition, not part of the brand spec.
        </p>
        <h2>Typography</h2>
        <div className="card">
          <div className="meta">Header font: Futura</div>
          <h1 style={{margin: 0}}>Responsible hospitality starts here.</h1>
          <h2>Section heading in Futura</h2>
          <h3>Card or group heading in Futura</h3>
        </div>
        <div className="card" style={{marginTop: 16}}>
          <div className="meta">Main text font: Century Gothic</div>
          <p>
            TEAM Training prepares managers to train servers and event-day staff. Independent third-party grading supports
            a “reasonable efforts” defense.
          </p>
          <div className="meta">Navigation font: Century Gothic Bold</div>
          <p style={{fontWeight: 700, margin: 0}}>Training &nbsp; Fan Programs &nbsp; Members &amp; Partners &nbsp; News &amp; Resources &nbsp; About</p>
        </div>
        <p>
          Visitors without Futura or Century Gothic installed see the free look-alikes Jost and Montserrat until web-font
          licenses are in place.
        </p>
        <h2>Buttons and links</h2>
        <p>
          <a className="btn" href="#">Primary button</a> <a className="btn alt" href="#">Outline button</a>{' '}
          <a className="btn gold" href="#">Accent button</a>
        </p>
      </div>
    </>
  )
}
