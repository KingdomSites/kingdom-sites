import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Articles — Kingdom Sites',
  description: 'Thoughts on faith, fear, and living fully for Christ.',
}

export default function Articles() {
  return (
    <div className="overflow-x-hidden w-full">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20">

        {/* Page header */}
        <div className="mb-14">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/10 px-3 py-1 text-xs font-medium text-[#1d1d1f]/80 dark:text-[#e8eef7]/75">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            Articles
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Writing
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/65 dark:text-[#e8eef7]/60">
            Thoughts on faith, fear, and living fully for Christ.
          </p>
        </div>

        {/* Article */}
        <article className="glass rounded-3xl p-8 sm:p-10">

          {/* Article meta */}
          <div className="mb-8 border-b border-black/8 dark:border-white/10 pb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#0071e3]">Personal</p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              The End of Practical Atheism: A Call to Stop Faking and Start Living
            </h2>
            <p className="mt-1.5 text-sm italic text-[#1d1d1f]/55 dark:text-[#e8eef7]/50">
              a letter to my self
            </p>
            <p className="mt-4 text-xs text-[#1d1d1f]/45 dark:text-[#e8eef7]/40">
              March 12, 2026 · Thomas Klein
            </p>
          </div>

          {/* Article body */}
          <div className="prose-article space-y-5 text-[15px] leading-[1.75] text-[#1d1d1f]/80 dark:text-[#e8eef7]/75">

            <p>
              We often think of atheism as an intellectual stance—a denial of God&apos;s existence. But there is a more dangerous version that many of us practice every day: <strong className="font-semibold text-[#1d1d1f] dark:text-[#e8eef7]">Practical Atheism.</strong>
            </p>

            <p>
              Practical atheism is the moment you let fear dictate your decisions. It&apos;s the voice that whispers, &ldquo;You might get hurt,&rdquo; &ldquo;People will think poorly of you,&rdquo; or &ldquo;You might fail.&rdquo; When we live by that fear, we aren&apos;t just being &ldquo;cautious.&rdquo; We are looking at the Creator of the universe and saying, &ldquo;I have this problem, and You are not strong enough to lead me through it.&rdquo;
            </p>

            <p>
              We don&apos;t often tell lies with our mouths, but we frequently live them with our lives. We all say &ldquo;I believe&rdquo; but then the second there is a small trial we fret, stress about it, and try to fix it in our own strength.
            </p>

            {/* Section */}
            <h3 className="pt-4 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-[#e8eef7]">
              The Triple-Mesh of Cowardice
            </h3>

            <p>
              For the past few years, I realized my life was being filtered through three questions that had nothing to do with God:
            </p>

            <ul className="ml-5 space-y-1.5 list-none">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
                Will my parents approve?
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
                Will people be impressed?
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
                How can I mitigate the most risk? (especially the risk of <em>what if I am not happy?</em>)
              </li>
            </ul>

            <p>
              I was living for the approval of a crowd that won&apos;t be there when I give my final account. This hit me the night I met Monisha. My mind and body screamed, &ldquo;FEAR! This will be hard. What if it doesn&apos;t work out? What if my parents don&apos;t agree?&rdquo;
            </p>

            <p>
              But then I pictured myself standing before the God who spoke 100 trillion stars into existence. If He asked me, &ldquo;Why didn&apos;t you pursue her?&rdquo; and my answer was, &ldquo;I was scared of the unknown,&rdquo; the pettiness of my fear would be exposed. Would the God who conquered the grave suddenly abandon me because a relationship was &ldquo;hard&rdquo;? I was scared people would think I am infatuated with her — but who cares if they thought that? God knew my heart.
            </p>

            {/* Section */}
            <h3 className="pt-4 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-[#e8eef7]">
              The Audience of One
            </h3>

            <p>
              There is a secret that frees us from the &ldquo;approval trap&rdquo;: <strong className="font-semibold text-[#1d1d1f] dark:text-[#e8eef7]">There is only one Person on the stage.</strong>
            </p>

            <p>
              In less than 100 years, every single one of the eight billion people on this earth will be in either Paradise or Hell. Two billion of those people have likely never even had a clear Gospel conversation. In light of eternity, how much of a waste is it to spend your life complaining about &ldquo;what they will think&rdquo; when you should be obsessed with &ldquo;what is God thinking?&rdquo;
            </p>

            {/* Section */}
            <h3 className="pt-4 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-[#e8eef7]">
              Stop Treating Life Like a Puzzle
            </h3>

            <p>
              Jesus was nailed to a tree. It wasn&apos;t easy. He rose from the dead to give us life. Yet, we still live as if we aren&apos;t sure He can provide bread for tomorrow.
            </p>

            <p>
              We need to stop trying to &ldquo;figure out&rdquo; exactly what to do and start doing what we want—so long as we do it the way Jesus would. I&apos;ve caught myself (even in things like missions or suffering) that I am doing it just to impress people I now almost never see, and do things only because someone else said &ldquo;you should do this!&rdquo; You have one life to live, will soon be past — only what&apos;s done for Christ will last.
            </p>

            <ul className="ml-5 space-y-2.5 list-none">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
                <span>
                  <strong className="font-semibold text-[#1d1d1f] dark:text-[#e8eef7]">Jesus is the Way:</strong> When Thomas asked for the way, Jesus didn&apos;t give him a map; He gave him a Person.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
                <span>
                  <strong className="font-semibold text-[#1d1d1f] dark:text-[#e8eef7]">The Command is Clear:</strong> Rejoice always. Pray continually. Love God. Love your neighbor. Honor your parents. Don&apos;t lust. Ecclesiastes says don&apos;t be overly wise or otherwise — why ruin yourself?
                </span>
              </li>
            </ul>

            <p>
              If you are focused on those things, you can&apos;t mess up. You have nothing left to prove to anyone. You already proved to God that you were worthy of damnation, yet He saved you anyway. What else is there to prove?
            </p>

            <p>
              Stop worrying about the specifics and start honoring the Savior.
            </p>

            {/* Closing call */}
            <div className="mt-8 rounded-2xl bg-[#0071e3]/8 dark:bg-[#0071e3]/12 border border-[#0071e3]/15 px-6 py-5 text-center">
              <p className="text-2xl font-bold tracking-tight text-[#0071e3]">LIVE!</p>
            </div>

          </div>
        </article>

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#1d1d1f]/55 dark:text-[#e8eef7]/50 transition hover:text-[#0071e3] dark:hover:text-[#0071e3]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to home
          </Link>
        </div>

      </div>
    </div>
  )
}
