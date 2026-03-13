import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Articles — Kingdom Sites',
  description: 'Thoughts on faith, fear, and living fully for Christ.',
}

export default function Articles() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20">

      <div className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0071e3]">Articles</p>
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
          Writing
        </h1>
        <p className="mt-3 text-base text-black dark:text-white">
          Thoughts on faith, fear, and living fully for Christ.
        </p>
      </div>

      <article className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 sm:p-10">

        <div className="mb-8 border-b border-black/10 dark:border-white/10 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0071e3]">Personal</p>
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
            The End of Practical Atheism: A Call to Stop Faking and Start Living
          </h2>
          <p className="mt-2 text-sm italic text-black/60 dark:text-white/60">a letter to my self</p>
          <p className="mt-2 text-xs text-black/50 dark:text-white/50">March 12, 2026 · Thomas Klein</p>
        </div>

        <div className="space-y-5 text-[15px] leading-relaxed text-black dark:text-white">

          <p>We often think of atheism as an intellectual stance—a denial of God&apos;s existence. But there is a more dangerous version that many of us practice every day: <strong>Practical Atheism.</strong></p>

          <p>Practical atheism is the moment you let fear dictate your decisions. It&apos;s the voice that whispers, &ldquo;You might get hurt,&rdquo; &ldquo;People will think poorly of you,&rdquo; or &ldquo;You might fail.&rdquo; When we live by that fear, we aren&apos;t just being &ldquo;cautious.&rdquo; We are looking at the Creator of the universe and saying, &ldquo;I have this problem, and You are not strong enough to lead me through it.&rdquo;</p>

          <p>We don&apos;t often tell lies with our mouths, but we frequently live them with our lives. We all say &ldquo;I believe&rdquo; but then the second there is a small trial we fret, stress about it, and try to fix it in our own strength.</p>

          <h3 className="pt-4 text-lg font-semibold text-black dark:text-white">The Triple-Mesh of Cowardice</h3>

          <p>For the past few years, I realized my life was being filtered through three questions that had nothing to do with God:</p>

          <ul className="space-y-2 pl-5">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              Will my parents approve?
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              Will people be impressed?
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              How can I mitigate the most risk? (especially the risk of <em>what if I am not happy?</em>)
            </li>
          </ul>

          <p>I was living for the approval of a crowd that won&apos;t be there when I give my final account. This hit me the night I met Monisha. My mind and body screamed, &ldquo;FEAR! This will be hard. What if it doesn&apos;t work out? What if my parents don&apos;t agree?&rdquo;</p>

          <p>But then I pictured myself standing before the God who spoke 100 trillion stars into existence. If He asked me, &ldquo;Why didn&apos;t you pursue her?&rdquo; and my answer was, &ldquo;I was scared of the unknown,&rdquo; the pettiness of my fear would be exposed. Would the God who conquered the grave suddenly abandon me because a relationship was &ldquo;hard&rdquo;? I was scared people would think I am infatuated with her — but who cares if they thought that? God knew my heart.</p>

          <h3 className="pt-4 text-lg font-semibold text-black dark:text-white">The Audience of One</h3>

          <p>There is a secret that frees us from the &ldquo;approval trap&rdquo;: <strong>There is only one Person on the stage.</strong></p>

          <p>In less than 100 years, every single one of the eight billion people on this earth will be in either Paradise or Hell. Two billion of those people have likely never even had a clear Gospel conversation. In light of eternity, how much of a waste is it to spend your life complaining about &ldquo;what they will think&rdquo; when you should be obsessed with &ldquo;what is God thinking?&rdquo;</p>

          <h3 className="pt-4 text-lg font-semibold text-black dark:text-white">Stop Treating Life Like a Puzzle</h3>

          <p>Jesus was nailed to a tree. It wasn&apos;t easy. He rose from the dead to give us life. Yet, we still live as if we aren&apos;t sure He can provide bread for tomorrow.</p>

          <p>We need to stop trying to &ldquo;figure out&rdquo; exactly what to do and start doing what we want—so long as we do it the way Jesus would. I&apos;ve caught myself (even in things like missions or suffering) that I am doing it just to impress people I now almost never see, and do things only because someone else said &ldquo;you should do this!&rdquo; You have one life to live, will soon be past — only what&apos;s done for Christ will last.</p>

          <ul className="space-y-3 pl-5">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              <span><strong>Jesus is the Way:</strong> When Thomas asked for the way, Jesus didn&apos;t give him a map; He gave him a Person.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              <span><strong>The Command is Clear:</strong> Rejoice always. Pray continually. Love God. Love your neighbor. Honor your parents. Don&apos;t lust. Ecclesiastes says don&apos;t be overly wise or otherwise — why ruin yourself?</span>
            </li>
          </ul>

          <p>If you are focused on those things, you can&apos;t mess up. You have nothing left to prove to anyone. You already proved to God that you were worthy of damnation, yet He saved you anyway. What else is there to prove?</p>

          <p>Stop worrying about the specifics and start honoring the Savior.</p>

          <div className="mt-8 rounded-2xl border border-[#0071e3]/30 bg-[#0071e3]/10 px-6 py-5 text-center">
            <p className="text-2xl font-bold text-[#0071e3]">LIVE!</p>
          </div>

        </div>
      </article>

      <div className="mt-10">
        <Link href="/" className="text-sm text-black/50 dark:text-white/50 transition hover:text-[#0071e3]">
          ← Back to home
        </Link>
      </div>

    </div>
  )
}
