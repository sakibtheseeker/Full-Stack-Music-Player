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
        <p>Email: <a href="mailto:support@beatboxx.app" className="underline text-blue-300">support@beatboxx.app</a></p>
        <p>Phone: +1 (800) 123-4567</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Connect with us on Social Media</h2>
        <ul className="list-disc ml-5">
          <li>Instagram: <a href="https://instagram.com" className="underline text-blue-300">@beatboxx_app</a></li>
          <li>Twitter: <a href="https://twitter.com" className="underline text-blue-300">@beatboxx_app</a></li>
          <li>Facebook: <a href="https://facebook.com" className="underline text-blue-300">BeatBoxx</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Office Hours</h2>
        <p>Monday – Friday: 9:00 AM to 6:00 PM (IST)</p>
        <p>Saturday & Sunday: Closed</p>
      </div>
    </div>
  );
}
