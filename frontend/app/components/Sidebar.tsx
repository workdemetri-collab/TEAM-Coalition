import Link from 'next/link'

import {sectionFor} from '@/lib/nav'

const norm = (p: string) => (p.split('?')[0].replace(/\/+$/, '') || '/').toLowerCase()

/** Compact section menu: the same groups as the main menu, collapsed unless they contain the current page. */
export default function Sidebar({path}: {path: string}) {
  const section = sectionFor(path)
  if (!section) return null
  const here = norm(path)
  return (
    <aside className="side" aria-label={`${section.title} menu`}>
      <h3>
        <Link href={section.href}>{section.title}</Link>
      </h3>
      {section.groups.map((g) => (
        <details key={g.title} open={g.links.some((l) => norm(l.href) === here)}>
          <summary>{g.title}</summary>
          <ul>
            {g.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={norm(l.href) === here ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </aside>
  )
}
