'use client';

export default function ContactPage() {
  return (
    <div className="p-8 text-white bg-gradient-to-b from-blue-800 to-emerald-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-4">
        Got questions, feedback, or just want to say hi? We&apos;d love to hear from you!
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">General Inquiries</h2>
        <p>
          Email:{' '}
          <a href="mailto:support@beatboxx.app" className="underline text-blue-300">
            support@beatboxx.app
          </a>
        </p>
        <p>Phone: +1 (800) 123-4567</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Connect with us on Social Media</h2>
        <ul className="list-disc ml-5">
          <li>
            Instagram:{' '}
            <a href="https://instagram.com" className="underline text-blue-300">
              @beatboxx_app
            </a>
          </li>
          <li>
            Twitter:{' '}
            <a href="https://twitter.com" className="underline text-blue-300">
              @beatboxx_app
            </a>
          </li>
          <li>
            Facebook:{' '}
            <a href="https://facebook.com" className="underline text-blue-300">
              BeatBoxx
            </a>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Office Hours</h2>
        <p>Monday – Friday: 9:00 AM to 6:00 PM (IST)</p>
        <p>Saturday &amp; Sunday: Closed</p>
      </div>

      {/* 📨 Contact Form */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
        <form className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1 text-white" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-white" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-white" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
