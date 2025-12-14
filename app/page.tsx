"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Countdown from "react-countdown";

export default function Home() {
  // Countdown target: 7 days from now
  const countdownDate = Date.now() + 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="font-sans text-gray-900">
      {/* STICKY NAV */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl text-purple-600">LocalBig</h1>
          <div className="space-x-6 hidden md:flex">
            <a href="#who" className="hover:text-purple-600 transition">Who We Work With</a>
            <a href="#offers" className="hover:text-purple-600 transition">Offers</a>
            <a href="#faq" className="hover:text-purple-600 transition">FAQ</a>
            <a href="#cta" className="hover:text-purple-600 transition">Start</a>
          </div>
        </div>
      </nav>

      {/* HERO VIDEO */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center text-white">
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
          src="/hero-video.mp4" // Replace with your video
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div className="z-10 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get More Local Customers in 30 Days</h1>
          <h2 className="text-xl md:text-2xl mb-6">For Brick-and-Mortar & Regional Businesses. No Long Contracts. Real Results.</h2>
          <p className="mb-8 max-w-xl mx-auto">
            LocalBig helps local businesses drive more calls, walk-ins, and bookings using local ads, Google Maps visibility, and short-form video.
            <br/>
            <strong>We don’t sell marketing. We sell customers.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#offers" className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
              Start My Local Growth Campaign
            </a>
            <a href="#calendar" className="bg-purple-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
              Book a Free Strategy Call
            </a>
          </div>
        </motion.div>
      </section>

      {/* WHO WE WORK WITH */}
      <motion.section id="who" className="py-20 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Who We Work With</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            We specialize in local businesses that depend on foot traffic or calls.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {["Restaurants & cafés", "Retail & storefronts", "Gyms & studios", "Clinics & dentists", "Real estate offices", "Contractors & home services"].map(item => (
              <motion.div key={item} className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold text-xl">{item}</h3>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 font-bold">If customers matter to your business - this works.</p>
        </div>
      </motion.section>

      {/* OFFERS WITH COUNTDOWN */}
      <motion.section id="offers" className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Choose the Right Local Growth Option</h2>
          <p className="mb-6 text-lg text-gray-600">We offer three clearly defined programs, based on where your business is right now.</p>

          {/* Countdown Timer */}
          <div className="mb-12 text-2xl font-semibold text-red-600">
            <p>⏰ Limited launch spots! Time left to join:</p>
            <Countdown date={countdownDate} />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <OfferCard
              color="purple"
              title="30-Day Local Growth Sprint"
              price="$2,500 – $5,000"
              features={[
                "Drive consistent local leads, calls, and visibility within 30 days",
                "Local Meta & Google Ads",
                "Google Maps optimization",
                "10–20 short-form ad creatives",
                "Offer & promotion strategy",
                "Lead & call tracking",
                "Full 30-day execution"
              ]}
              cta="Start My 30-Day Growth Sprint"
              popular
            />
            <OfferCard
              color="blue"
              title="Local Traffic Boost"
              price="$1,000 – $1,500"
              features={[
                "Increase foot traffic and local awareness this month",
                "Local Meta ads",
                "Google Maps promotion",
                "5–10 short-form creatives",
                "Simple local offer campaign",
                "14–30 day campaign duration"
              ]}
              cta="Book a Quick Strategy Call"
            />
            <OfferCard
              color="green"
              title="Grand Opening Boost"
              price="$500 – $750"
              features={[
                "Get people through the door fast and build early momentum",
                "Google Maps setup & optimization",
                "3–5 local ad creatives",
                "Grand Opening or limited-time promo",
                "7–14 day local push",
                "⚠️ Limited availability per month"
              ]}
              cta="Apply for Grand Opening Boost"
            />
          </div>
        </div>
      </motion.section>

      {/* GUARANTEE */}
      <motion.section className="py-20 bg-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Our 30-Day Guarantee</h2>
          <p className="text-xl mb-4 font-semibold">We fix it or you don’t pay.</p>
          <p className="text-lg">We don’t win unless you do.</p>
        </div>
      </motion.section>

      {/* CITY EXCLUSIVITY */}
      <motion.section className="py-20 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">City Exclusivity</h2>
          <p className="mb-4">
            To protect results:<br/>
            • We work with only 3–5 businesses per city<br/>
            • We do not work with direct competitors
          </p>
          <p className="font-bold">Once a city is full, it’s closed.</p>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section id="faq" className="py-20 bg-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <FAQItem question="Do you include ad spend?" answer="No. Ad spend is paid directly to Google or Meta so you control the budget. We manage strategy and execution." />
          <FAQItem question="How fast do results show?" answer="Most businesses see activity within 7–14 days and strong traction by 30 days." />
          <FAQItem question="Is this a monthly contract?" answer="No. All programs are one-time campaigns. Ongoing support is optional after results." />
          <FAQItem question="What businesses are not a good fit?" answer="We don’t work with online-only brands, businesses unwilling to answer leads, or businesses looking for cheap SEO." />
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section id="cta" className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get More Local Customers?</h2>
        <p className="mb-8 text-lg md:text-xl">You don’t need another agency. You need customers this month.</p>
        <a href="#offers" className="bg-white text-purple-600 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
          Start Your Local Growth Campaign
        </a>
      </motion.section>
    </div>
  );
}

// OfferCard Component
// OfferCard Component
interface OfferCardProps {
  color: "purple" | "blue" | "green"; // Only allow these values
  title: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

function OfferCard({ color, title, price, features, cta, popular = false }: OfferCardProps) {
  const colorMap = { purple: "border-purple-500", blue: "border-blue-500", green: "border-green-500" };
  return (
    <motion.div className={`border-2 ${colorMap[color]} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${popular?"scale-105":""}`}
      whileHover={{ scale: 1.05 }}
    >
      {popular && <span className="bg-purple-500 text-white px-3 py-1 rounded-full uppercase text-xs font-bold mb-4 inline-block">Popular</span>}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-xl font-semibold mb-4">{price}</p>
      <ul className="text-left mb-6 space-y-2">
        {features.map(f => <li key={f} className="before:content-['✓'] before:text-purple-600 before:mr-2">{f}</li>)}
      </ul>
      <button className={`w-full py-3 rounded-full font-semibold text-white ${color==="purple"?"bg-purple-600 hover:bg-purple-700":color==="blue"?"bg-blue-600 hover:bg-blue-700":"bg-green-600 hover:bg-green-700"} transition-all`}>
        {cta}
      </button>
    </motion.div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}
// FAQ Component
function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <motion.div className="mb-6 border-b pb-4" whileHover={{ scale: 1.01 }}>
      <h3 className="font-semibold text-xl mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </motion.div>
  );
}
