import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap fgrid">
        <div>
          <strong>TEAM Coalition</strong>
          <p>
            Techniques for Effective Alcohol Management. A 501(c)(3) non-profit alliance of sports, entertainment and
            beer industry leaders.
          </p>
        </div>
        <div>
          <h4>Training</h4>
          <Link href="/training">Alcohol Management Training</Link>
          <Link href="/training/prices">Prices</Link>
          <Link href="/training/faq">FAQ</Link>
          <Link href="/training/state-laws">State laws</Link>
        </div>
        <div>
          <h4>Fan Programs</h4>
          <Link href="/fan-education-101">Fan programs</Link>
          <Link href="/sweepstakes">Sweepstakes</Link>
          <Link href="/about/membership-benefits">Membership</Link>
          <Link href="/about/members-and-partners">Members &amp; partners</Link>
        </div>
        <div>
          <h4>News &amp; About</h4>
          <Link href="/news">News</Link>
          <Link href="/media-mentions">Media mentions</Link>
          <Link href="/newsletters">Newsletter archive</Link>
          <Link href="/team-101">About TEAM</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:8772832626">877-2-TEAM-CO (877-283-2626)</a>
          <a href="tel:7036477430">703-647-7430</a>
          <span>
            1800 Diagonal Road, Suite 600, PMB #1084
            <br />
            Alexandria, VA 22314
          </span>
        </div>
        <div>
          <h4>Follow</h4>
          <a href="https://www.facebook.com/FansDontLetFansDriveDrunk" rel="noopener">Facebook</a>
          <a href="https://twitter.com/responsiblefans" rel="noopener">X / Twitter</a>
          <a href="https://www.youtube.com/teamcoalition" rel="noopener">YouTube</a>
          <a href="https://www.linkedin.com/company/team-coalition" rel="noopener">LinkedIn</a>
          <a href="https://www.rhir.org/" rel="noopener">Responsibility Has Its Rewards</a>
        </div>
      </div>
      <div className="wrap legal">
        &copy; TEAM Coalition · <Link href="/about/privacy">Privacy</Link> · <Link href="/contact">Contact</Link>
      </div>
    </footer>
  )
}
