import Link from 'next/link'

import DateComponent from '@/app/components/Date'
import {sanityFetch} from '@/sanity/lib/live'
import {latestPostsQuery} from '@/sanity/lib/queries'
import {media} from '@/lib/media'

const MEMBERS = [
  ['/wp-content/uploads/2010/05/New-ABF-on-white-website-e1766150161803.png', 'Anheuser-Busch'],
  ['/wp-content/uploads/2014/09/logo-aramark-e1447454765747.jpg', 'Aramark'],
  ['/wp-content/uploads/2014/09/bilogo1-e1447454967864.jpg', 'Beer Institute'],
  ['/wp-content/uploads/2014/09/BrownFormanLogo-e1447454238746.jpg', 'Brown-Forman'],
  ['/wp-content/uploads/2015/11/ConstellationBrands150x150.jpg', 'Constellation Brands'],
  ['/wp-content/uploads/2015/05/HeinekenUSA-e1447455613695.jpg', 'Heineken USA'],
  ['/wp-content/uploads/2016/08/IAVM2016.jpg', 'IAVM'],
  ['/wp-content/uploads/2010/11/LegendsGlobal-e1766150070700.webp', 'Legends'],
  ['/wp-content/uploads/2017/02/LiveNation2017-e1553200660141.jpg', 'Live Nation'],
  ['/wp-content/uploads/2011/08/MLS-e1447455510720.jpg', 'MLS'],
  ['/wp-content/uploads/2016/12/nascar2017-300x300-e1553200725836.jpg', 'NASCAR'],
  ['/wp-content/uploads/2014/09/nba-e1447455328469.jpg', 'NBA'],
  ['/wp-content/uploads/2009/12/NBWA.png', 'NBWA'],
  ['/wp-content/uploads/2011/03/NewNCAA21.png', 'NCAA'],
  ['/wp-content/uploads/2014/09/logo-nfl-e1447455209181.jpg', 'NFL'],
  ['/wp-content/uploads/2014/09/logo-nhl-e1447455104201.jpg', 'NHL'],
  ['/wp-content/uploads/2010/10/2025-ovg-logo-e1766150119586.png', 'OVG'],
  ['/wp-content/uploads/2014/09/SMALogo-e1447453217114.jpg', 'SMA'],
]

const LEAGUES = [
  ['NFL', '/sweepstakes/nfl'],
  ['NBA', '/sweepstakes/nba'],
  ['NHL', '/sweepstakes/nhl'],
  ['MLB', '/sweepstakes/baseball'],
  ['MLS', '/sweepstakes/mls'],
  ['NASCAR', '/sweepstakes/nascar'],
  ['NCAA', '/sweepstakes/ncaa'],
  ['Live Nation', '/sweepstakes/live-nation'],
]

type LatestPost = {_id: string; title: string; slug: string; excerpt?: string | null; date?: string | null}

export default async function HomePage() {
  const {data} = await sanityFetch({query: latestPostsQuery, params: {limit: 3}})
  const posts = (data || []) as unknown as LatestPost[]

  return (
    <>
      <section className="hero ph hero-bg">
        <div className="wrap">
          <div className="eyebrow">Sports &amp; entertainment alcohol management</div>
          <h1>Responsible hospitality starts here.</h1>
          <p className="lead">We help venues train every employee and reward fans who make responsible choices.</p>
          <div className="paths">
            <Link className="path" href="/training">
              <b>I run a venue</b>
              <span>Training, certification and prices</span>
            </Link>
            <Link className="path" href="/fan-education-101">
              <b>I’m a fan</b>
              <span>Take the pledge and win big</span>
            </Link>
            <Link className="path" href="/about/membership-benefits">
              <b>I’m a partner</b>
              <span>Join the coalition</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="statsbar" aria-label="TEAM Coalition by the numbers">
        <div className="wrap">
          <div className="statsrow">
            <div>
              <b>250,000+</b>
              <span>fans pledged to be responsible in FY 2025</span>
            </div>
            <div>
              <b>39,967</b>
              <span>employees certified in FY 2025</span>
            </div>
            <div>
              <b>142</b>
              <span>venues in 36 states with TEAM-certified staff</span>
            </div>
            <div>
              <b>170</b>
              <span>new certified TEAM trainers in FY 2025</span>
            </div>
          </div>
          <p className="src">
            Source: <Link href="/news/annual-reports">TEAM Coalition FY 2025 Annual Report</Link>
          </p>
        </div>
      </section>

      <section className="band">
        <div className="wrap vgrid">
          <div>
            <div className="eyebrow" style={{color: 'var(--muted)'}}>
              TEAM Training Introduction Video 2026
            </div>
            <h2>See how TEAM Training works.</h2>
            <p>A short introduction to certifying your trainers and your event-day staff.</p>
            <Link className="btn" href="/training">
              Explore training
            </Link>
          </div>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/pZjrvk8PL60?si=IM4j9_MPVC9DJ8_d"
              title="TEAM Training Introduction Video 2026"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="split">
        <div className="ph venue" role="img" aria-label="Venue staff serving guests" />
        <div>
          <div className="eyebrow">Training</div>
          <h2>Every employee, trained and certified.</h2>
          <p>
            TEAM Training prepares managers to train servers and event-day staff. Independent third-party grading supports a
            “reasonable efforts” defense.
          </p>
          <Link className="btn" href="/training">
            Explore training
          </Link>
        </div>
      </section>

      <section className="split flip">
        <div className="ph fans" role="img" aria-label="Fans at a stadium" />
        <div>
          <div className="eyebrow">Fan programs</div>
          <h2>Make the pledge. Win the trip.</h2>
          <p>
            Fans who pledge to be responsible drinkers or designated drivers earn a chance to follow their team to a
            championship or all-star event.
          </p>
          <Link className="btn gold" href="/fan-education-101">
            See fan programs
          </Link>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>How training works</h2>
          <div className="cards steps">
            <div className="card">
              <h3>Managers become trainers</h3>
              <p>Attend a train-the-trainer Instructor Development Program.</p>
            </div>
            <div className="card">
              <h3>Trainers certify employees</h3>
              <p>Teach everyone working an event, in person or online.</p>
            </div>
            <div className="card">
              <h3>TEAM grades and tracks</h3>
              <p>Independent grading and reporting for every employee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pad">
        <h2>Latest news</h2>
        <div className="cards">
          {posts.map((p) => (
            <article className="card" key={p._id}>
              {p.date && (
                <div className="meta">
                  <DateComponent dateString={p.date} />
                </div>
              )}
              <h3>
                <Link href={`/posts/${p.slug}`}>{p.title}</Link>
              </h3>
              {p.excerpt && <p>{p.excerpt.slice(0, 130)}…</p>}
            </article>
          ))}
        </div>
        <p>
          <Link className="btn alt" href="/news">
            All news
          </Link>
        </p>
      </section>

      <section className="band">
        <div className="wrap center">
          <h2>Sweepstakes with your favorite leagues</h2>
          <div className="chips linkchips">
            {LEAGUES.map(([name, href]) => (
              <Link key={href} href={href}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pad">
        <h2>Our members and partners</h2>
        <p className="lead">Leagues, venues, concessionaires and the beer industry working together.</p>
        <div className="logos">
          {MEMBERS.map(([path, name]) => (
            <Link key={path} href="/about/members-and-partners" tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media(path)} alt={name} loading="lazy" />
            </Link>
          ))}
        </div>
        <p style={{marginTop: 24}}>
          <Link className="btn alt" href="/about/members-and-partners">
            See all members
          </Link>
        </p>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Bring TEAM to your venue.</h2>
          <p>Tell us about your team, league or facility.</p>
          <Link className="btn gold" href="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
