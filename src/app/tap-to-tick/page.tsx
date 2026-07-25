'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import shotOverview from '../../../public/tap-to-tick/1-overview.jpg'
import shotLog from '../../../public/tap-to-tick/2-log-a-purchase.jpg'
import shotHistory from '../../../public/tap-to-tick/3-history.jpg'
import shotCategories from '../../../public/tap-to-tick/4-categories.jpg'

const SECTION_IDS = [
  'hero', 'lock', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'pricing', 'demo',
]

/** Highlights the dot for whichever section is currently filling the viewport. */
function useScrollSpy() {
  useEffect(() => {
    const dots = document.querySelectorAll<HTMLAnchorElement>('[data-dot]')
    const sections = [...document.querySelectorAll<HTMLElement>('.ttt section')]
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sections.indexOf(e.target as HTMLElement)
            dots.forEach((d, j) => d.classList.toggle('active', i === j))
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])
}

export default function TapToTick() {
  useScrollSpy()

  return (
    <>
      <div className="back-bar">
        <Link href="/my-work">&larr; Kingdom Sites</Link>
      </div>

      <nav className="dots" aria-label="Sections">
        {SECTION_IDS.map((id) => (
          <a key={id} href={`#${id}`} data-dot aria-label={id} />
        ))}
      </nav>

      <section className="hero" id="hero">
        <div className="blob" style={{ width: 420, height: 420, background: '#86efac', top: -80, left: -120 }} />
        <div className="blob" style={{ width: 360, height: 360, background: '#a7f3d0', bottom: -60, right: -100, animationDelay: '-9s' }} />
        <div className="blob" style={{ width: 220, height: 220, background: '#fde68a', top: '40%', right: '14%', animationDelay: '-4s', opacity: 0.35 }} />
        <div className="wrap">
          <div className="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="9.2" />
              <path d="M12 6.4v11.2M14.8 8.6c-.5-1-1.6-1.5-2.8-1.5-1.7 0-3 1-3 2.4 0 3.2 6 1.6 6 4.8 0 1.4-1.3 2.4-3 2.4-1.2 0-2.3-.5-2.8-1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="wordmark">Tap to Tick</div>
          <h1>Your money,<br /><span className="gradient-text">two seconds at a time.</span></h1>
          <p className="tag">A dead-simple budget that lives on your lock screen, your wrist, and your&nbsp;Apple&nbsp;Pay.</p>
          <div className="pill">Free to start · Advanced $4.99/month</div>
        </div>
        <div className="scroll-hint">▾</div>
      </section>

      <section className="feature" id="lock">
        <div className="wrap">
          <div>
            <div className="kicker">Before you even unlock</div>
            <h2>It lives under the clock.</h2>
            <p>
              The widget sits on the lock screen with your running total for today. Raise the phone, tap,
              log, pocket. No unlocking, no app hunting — spending money and recording it become the same motion.
            </p>
          </div>
          <div className="art lockscreen-art">
            <div className="lockphone">
              <div className="ls-carrier">Globe</div>
              <div className="ls-date">Wed Jul 15</div>
              <div className="ls-clock">10:59</div>
              <div className="ls-widget"><span className="ls-plus">+</span><span className="ls-amt">$0</span></div>
              <div className="ls-bottom">
                <div className="ls-circle">🔦</div>
                <div className="ls-circle">📷</div>
              </div>
              <div className="ls-homebar" />
            </div>
          </div>
        </div>
      </section>

      <section className="feature" id="f1">
        <div className="wrap">
          <div>
            <div className="kicker">01 — Lock screen</div>
            <h2>Log it before the receipt prints.</h2>
            <p>
              Tap the widget, punch in the amount, pick a category. Two seconds, done. No opening apps,
              no spreadsheets, no friction — which is why it actually sticks.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 200, height: 200, background: '#86efac', top: -40, right: -40 }} />
            <div className="widget-circle"><div><div className="plus">+</div><div className="amt">$47 today</div></div></div>
          </div>
        </div>
      </section>

      <section className="feature" id="f2">
        <div className="wrap">
          <div>
            <div className="kicker">02 — Tap to pay</div>
            <h2>Apple Pay logs itself.</h2>
            <p>
              Pay with your phone or watch and the purchase writes itself into your budget — exact amount,
              zero taps. Recategorize whenever you review. It&apos;s the closest thing to tracking that does itself.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 200, height: 200, background: '#a7f3d0', bottom: -50, left: -40 }} />
            <div className="paywave">
              <div className="card-chip" />
              <div className="waves"><span /><span /><span /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature" id="f3">
        <div className="wrap">
          <div>
            <div className="kicker">03 — Wrist &amp; voice</div>
            <h2>Or your watch. Or Siri.</h2>
            <p>
              Dial an amount with the crown and tap Log — it lands on your phone even from across the house.
              Hands full? Just ask Siri to log it, hands-free.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 180, height: 180, background: '#86efac', top: -30, left: -30 }} />
            <div className="watch"><div className="face">$4.50</div></div>
          </div>
        </div>
      </section>

      <section className="feature" id="f4">
        <div className="wrap">
          <div>
            <div className="kicker">04 — Real cash</div>
            <h2>Cash that actually adds up.</h2>
            <p>
              ATM withdrawals aren&apos;t spending — they fill your wallet. Mark a purchase &quot;paid with cash&quot;
              and it spends that wallet down. Your checking, savings, and pocket money all stay true.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 200, height: 200, background: '#fde68a', bottom: -60, right: -40, opacity: 0.4 }} />
            <div className="bills"><div className="bill">$20</div><div className="bill">$20</div><div className="bill">$20</div></div>
          </div>
        </div>
      </section>

      <section className="feature" id="f5">
        <div className="wrap">
          <div>
            <div className="kicker">05 — Recurring</div>
            <h2>Rent posts itself.</h2>
            <p>
              Set rent, paychecks, and subscriptions once. Every month they log themselves on the right day —
              editable like any entry, pausable any time, never typed twice.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 180, height: 180, background: '#a7f3d0', top: -40, right: -30 }} />
            <div className="repeat-ring"><div>🏠</div></div>
          </div>
        </div>
      </section>

      <section className="feature" id="f6">
        <div className="wrap">
          <div>
            <div className="kicker">06 — The picture</div>
            <h2>See exactly where it goes.</h2>
            <p>
              A ring of your month by category, budgets with progress bars, income vs. spending over time,
              and every account balance — checking, savings, taxes, wallet — on one screen.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 200, height: 200, background: '#86efac', bottom: -50, left: -50 }} />
            <div className="donut" />
          </div>
        </div>
      </section>

      <section className="feature" id="f7">
        <div className="wrap">
          <div>
            <div className="kicker">07 — Ask · Advanced</div>
            <h2>A money coach that reads your numbers.</h2>
            <p>
              Ask anything in plain English — &quot;where am I losing money?&quot;, &quot;how does this month compare
              to last?&quot; — and get a straight answer built from your own entries, budgets, and balances,
              not generic advice. It leads with the one thing worth changing.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 200, height: 200, background: '#a7f3d0', top: -40, left: -40 }} />
            <div className="chat">
              <div className="bubble me">Where am I losing money?</div>
              <div className="bubble ai">Dining is at 140% of your $300 budget — two fewer takeout orders puts you back under.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature" id="f8">
        <div className="wrap">
          <div>
            <div className="kicker">08 — Together · Advanced</div>
            <h2>One budget, two people.</h2>
            <p>
              Invite the person you share money with straight from the share sheet. You both log into the
              same ledger over iCloud, you both see the same totals, and every entry shows who logged it.
            </p>
          </div>
          <div className="art">
            <div className="blob" style={{ width: 180, height: 180, background: '#86efac', bottom: -40, right: -30 }} />
            <div className="share-pair">
              <div className="avatar">🙂</div>
              <div className="share-link" />
              <div className="avatar">🙃</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="blob" style={{ width: 340, height: 340, background: '#a7f3d0', top: '8%', right: -110 }} />
        <div className="wrap">
          <h2>Two ways to <span className="gradient-text">use it.</span></h2>
          <p className="sub">Start free. Add sharing and the AI coach whenever you want them.</p>

          <div className="plans">
            <div className="plan">
              <h3>Simple</h3>
              <div className="price">Free</div>
              <p className="plan-note">Everything you need to track your own money, on your own devices.</p>
              <ul>
                <li>Lock Screen widget logging</li>
                <li>Apple Watch and Siri logging</li>
                <li>Apple Pay purchases log themselves</li>
                <li>Cash, checking, savings and tax accounts</li>
                <li>Recurring rent, paychecks and subscriptions</li>
                <li>Category budgets, reports and CSV export</li>
                <li>iCloud sync across your own devices</li>
              </ul>
              <p className="footnote">No account to create. No ads. No analytics.</p>
            </div>

            <div className="plan featured">
              <div className="badge">Sharing + AI</div>
              <h3>Advanced</h3>
              <div className="price">$4.99 <span>/ month</span></div>
              <p className="plan-note">For households sharing a budget, and anyone who wants the numbers explained.</p>
              <ul>
                <li>Everything in Simple</li>
                <li>Share one budget with another person over iCloud</li>
                <li>See who logged every entry</li>
                <li>Ask: an AI coach that reads your own numbers</li>
                <li>Spending insights and month-to-month comparisons</li>
                <li>New Advanced features as they ship</li>
              </ul>
              <p className="footnote">
                Billed through your Apple ID. Cancel any time in App Store settings — your budget stays,
                sharing and Ask simply switch off.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo" id="demo">
        <div className="blob" style={{ width: 380, height: 380, background: '#a7f3d0', top: '10%', left: -120 }} />
        <div className="blob" style={{ width: 300, height: 300, background: '#86efac', bottom: '5%', right: -80, animationDelay: '-7s' }} />
        <div className="wrap">
          <h2>Watch it <span className="gradient-text">work.</span></h2>
          <p>See everything at a glance, log in seconds, keep it organized.</p>
          <div className="phone">
            <div className="shots">
              <Image src={shotOverview}   alt="Overview screen"   fill sizes="320px" style={{ objectFit: 'cover' }} priority />
              <Image src={shotLog}        alt="Log a purchase"    fill sizes="320px" style={{ objectFit: 'cover' }} />
              <Image src={shotHistory}    alt="History"           fill sizes="320px" style={{ objectFit: 'cover' }} />
              <Image src={shotCategories} alt="Categories"        fill sizes="320px" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <footer>
        No accounts. No ads. No analytics. Your ledger stays in your iCloud.<br />
        © {new Date().getFullYear()} Thomas Klein. All rights reserved. · Tap to Tick<br />
        <Link href="/tap-to-tick/privacy">Privacy</Link>
        {' · '}
        <a href="mailto:thomas@kingdom-sites.com">Support</a>
        {' · '}
        <Link href="/my-work">Kingdom Sites</Link>
      </footer>
    </>
  )
}
