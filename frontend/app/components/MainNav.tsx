'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

import {NAV, UTILITY} from '@/lib/nav'
import {media} from '@/lib/media'

const LOGO = '/wp-content/uploads/2021/06/4-TEAM-Logo-Organizational-Full-Color-White-Border-Low-Res.jpg'

function NavLink({href, external, children}: {href: string; external?: boolean; children: React.ReactNode}) {
  return external ? (
    <a href={href} rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  )
}

export default function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState<number | null>(null)

  // Close the mobile menu after navigating
  useEffect(() => {
    setOpen(false)
    setSub(null)
  }, [pathname])

  return (
    <header className="site">
      <div className="util">
        <div className="wrap">
          {UTILITY.map((u) => (
            <NavLink key={u.href} href={u.href} external={u.external}>
              {u.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="bar wrap">
        <Link className="logo" href="/" aria-label="TEAM Coalition home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media(LOGO)} alt="TEAM Coalition" height={60} />
          <span className="tag">Techniques for Effective Alcohol Management</span>
        </Link>
        <nav className={`main${open ? ' open' : ''}`} id="nav" aria-label="Main">
          <ul>
            {NAV.map((s, i) => (
              <li key={s.href} className={`top${sub === i ? ' open' : ''}`}>
                <Link className="tl" href={s.href}>
                  {s.title}
                </Link>
                <button
                  className="chev"
                  aria-label={`Toggle ${s.title} menu`}
                  aria-expanded={sub === i}
                  onClick={() => setSub(sub === i ? null : i)}
                />
                <div className="panel">
                  <div className="inner">
                    {s.groups.map((g) => (
                      <div className="col" key={g.title}>
                        <h3>{g.title}</h3>
                        <ul>
                          {g.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href}>{l.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link className="all" href={s.href}>
                      All {s.title} →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
            <li className="top mobonly">
              <Link className="tl" href="/contact">
                Contact
              </Link>
            </li>
            <li className="top mobonly">
              <a className="tl" href="https://trainingdatabase.teamcoalition.org/" rel="noopener">
                Trainer Login
              </a>
            </li>
            <li className="top mobonly">
              <Link className="tl" href="/search">
                Search
              </Link>
            </li>
          </ul>
        </nav>
        <Link className="btn gold hide-s" href="/training/instructor-development-program/workshops">
          Find a Workshop
        </Link>
        <button className="burger" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          Menu
        </button>
      </div>
    </header>
  )
}
