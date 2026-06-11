export const metadata = {
  title: 'Privacy Policy — Kingdom Sites',
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold text-[#f5f5f7]">Privacy Policy</h1>
      <p className="mb-10 text-sm text-[#86868b]">Last updated: March 9, 2026</p>

      <section className="space-y-8 text-sm leading-relaxed text-[#86868b]">
        <div>
          <h2 className="mb-2 font-semibold text-[#f5f5f7]">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and payment
            details when you purchase products or contact us. Payments are processed securely
            through Wise.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#f5f5f7]">How We Use Information</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Process purchases</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
            <li>Communicate updates related to our products</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#f5f5f7]">Third-Party Services</h2>
          <p>
            We use third-party services including Wise for payment processing and
            hosting providers for website infrastructure. These providers may collect information
            necessary to perform their services.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#f5f5f7]">Data Security</h2>
          <p>We take reasonable measures to protect your personal information.</p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#f5f5f7]">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal information by
            contacting us.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#f5f5f7]">Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact Thomas Klein at{' '}
            <a
              href="mailto:thomas@kleinsonline.org"
              className="underline underline-offset-2 hover:text-[#f5f5f7]"
            >
              thomas@kleinsonline.org
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
