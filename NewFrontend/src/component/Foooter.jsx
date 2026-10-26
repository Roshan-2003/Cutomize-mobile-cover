
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thanks for subscribing to designo.case!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-white text-[#505050]">
      {/* Newsletter section */}
      <section className="px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Stay in the Loop
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
            Be the first to know about new drops, exclusive offers,
            limited-edition designs, and members-only deals.
            Join the designo.case community and never miss what's next.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-7 flex bg-[#f2f2f2]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Newsletter email address"
              required
              className="min-w-0 flex-1 bg-transparent px-5 py-5 text-sm outline-none focus:ring-2 focus:ring-inset focus:ring-[#747bc9]"
            />

            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="px-5 text-gray-900 transition hover:text-[#ff641f]"
            >
              <ArrowRight size={23} />
            </button>
          </form>

          {message && (
            <p role="status" className="mt-3 text-sm">
              {message}
            </p>
          )}
        </div>
      </section>

      {/* Footer links */}
      <section className="bg-[#747bc9] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <div>
              <a
                href="/"
                className="inline-block text-5xl font-black tracking-tighter sm:text-6xl"
              >
                designo.case
              </a>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/85">
                Dress your phone in style. Discover unique designs
                made to express your personality.
              </p>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-5 text-2xl font-black uppercase sm:text-3xl">
                Support
              </h3>

              <div className="space-y-4 text-sm leading-6 text-white/95">
                <p>
                  Calling support hours are 9:45 AM to 5:30 PM.
                </p>
                <p>
                  Email support is available for your queries.
                </p>
                <a
                  href="mailto:support@designo.case"
                  className="block break-words hover:underline"
                >
                  Contact our support team
                </a>
              </div>
            </div>

            {/* Main menu */}
            <div>
              <h3 className="mb-5 text-2xl font-black uppercase sm:text-3xl">
                Main Menu
              </h3>

              <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/collections/all" className="hover:underline">Shop</a></li>
                <li><a href="/collections/new-arrivals" className="hover:underline">New Arrivals</a></li>
                <li><a href="/pages/refund-policy" className="hover:underline">Refund & Exchange Policy</a></li>
                <li><a href="/pages/shipping-policy" className="hover:underline">Shipping Information</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-5 text-2xl font-black uppercase sm:text-3xl">
                Company
              </h3>

              <ul className="space-y-3 text-sm">
                <li><a href="/pages/our-story" className="hover:underline">Our Story</a></li>
                <li><a href="/pages/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/pages/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/pages/terms-of-service" className="hover:underline">Terms of Services</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom newsletter form */}
        
        </div>
      </section>
    </footer>
  );
}
