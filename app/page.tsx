"use client";

import { useEffect, useMemo, useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

type AudienceType = "franchise" | "independent";

const compLogos = [
  { src: "https://logo.clearbit.com/mcdonalds.com", alt: "McDonald's" },
  { src: "https://logo.clearbit.com/starbucks.com", alt: "Starbucks" },
  { src: "https://logo.clearbit.com/cvs.com", alt: "CVS" },
  { src: "https://logo.clearbit.com/walmart.com", alt: "Walmart" },
  { src: "https://logo.clearbit.com/subway.com", alt: "Subway" },
];

const franchiseLogos = [
  { src: "https://logo.clearbit.com/krispykrunchy.com", alt: "Krispy Krunchy" },
  { src: "https://logo.clearbit.com/subwayrestaurants.com", alt: "Subway" },
  { src: "https://logo.clearbit.com/cinnabon.com", alt: "Cinnabon" },
];

const localOps = [
  { text: "Norwich\nPharmacy" },
  { text: "Spice\n& Slice" },
  { text: "Taza\n2Go" },
  { text: "Local\nOperator" },
];

const faqItems = [
  {
    q: "Who is this built for?",
    a: "Franchise operators (single or multi-location), independent local business owners, and regional brands. Whether you're running a Krispy Krunchy franchise, a local pharmacy, or launching a new location — if local customers matter to your revenue, this is built for you.",
  },
  {
    q: "What does the 60-Day Growth Promise mean?",
    a: "Before we start, we agree on specific measurable targets — foot traffic, visibility, repeat customers. If we don't hit them in 60 days, we keep running your program at no extra charge until we do. It's the commitment we make to every client before day one.",
  },
  {
    q: 'What does "done for you" actually mean?',
    a: "You don't touch any of it. We handle your Google setup, run your ad campaigns, create your content, build your loyalty system, and send a plain-English report weekly. You run your business. We grow your customer base.",
  },
  {
    q: "How is it customized to my business?",
    a: "Our system uses your business type, location, revenue stage, and biggest problem to build a custom growth plan. A franchise operator in Norwich gets a completely different setup than a pharmacy in Mystic. Same framework — built specifically for your market.",
  },
  {
    q: "Can I cancel after 60 days?",
    a: "Yes. The minimum is 60 days — that's what it takes to build real momentum. After that, month-to-month with no penalties. Most clients stay once they see the results compound.",
  },
  {
    q: "Why only 3 new clients per month?",
    a: "Every client gets a properly built system — not a rushed template. Capping intake means your setup gets full attention from day one. If we're at capacity, we'll put you on the waitlist and reach out when a spot opens.",
  },
];

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function Home() {
  const [audience, setAudience] = useState<AudienceType>("franchise");
  const [showPopup, setShowPopup] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [showMoreCases, setShowMoreCases] = useState(false);
  const [caseTabs, setCaseTabs] = useState<Record<number, "b" | "a">>({
    0: "a",
    1: "a",
  });
  const [wideCaseTab, setWideCaseTab] = useState<"b" | "a">("b");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePain, setActivePain] = useState<string | null>(null);
  const [submittedPain, setSubmittedPain] = useState<Record<string, boolean>>({});
  const [selectedPlan, setSelectedPlan] = useState<Record<string, string>>({});

  useEffect(() => {
    let saved: AudienceType | null = null;
    try {
      const stored = localStorage.getItem("lb_audience");
      if (stored === "franchise" || stored === "independent") {
        saved = stored;
      }
    } catch {}

    if (saved) {
      setAudience(saved);
      setShowPopup(false);
      return;
    }

    const timer = setTimeout(() => setShowPopup(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAudience = (type: AudienceType) => {
    setAudience(type);
    setShowPopup(false);
    try {
      localStorage.setItem("lb_audience", type);
    } catch {}
  };

  const handlePainSelect = (key: string) => {
    setActivePain(key);
    setTimeout(() => {
      const el = document.getElementById(`pa-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handlePainSubmit = (key: string) => {
    setSubmittedPain((prev) => ({ ...prev, [key]: true }));
  };

  const handleChoosePlan = (key: string, plan: string) => {
    setSelectedPlan((prev) => ({ ...prev, [key]: plan }));
  };

  const audienceGuarantee =
    audience === "franchise"
      ? "For Your Franchise Operation*"
      : "For Your Local Business*";

  const heroAudience = useMemo(() => audience, [audience]);

  return (
    <div className={cx(montserrat.className, "bg-white text-[#0F0908]")}>
      {showPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(10,8,18,0.85)] px-6 backdrop-blur-[8px] animate-[fadeOverlay_.3s_ease]">
          <div className="w-full max-w-[480px] rounded-[20px] border border-white/10 bg-[#160A08] px-9 py-11 text-center shadow-[0_32px_80px_rgba(0,0,0,0.6)] animate-[slideUp_.35s_ease]">
            <div className="mb-7 text-[18px] font-black tracking-[-0.03em] text-white">
              Local<span className="text-[#FF4D40]">Big</span>
            </div>
            <div className="mb-2 text-[clamp(22px,5vw,30px)] font-black leading-[1.1] tracking-[-0.025em] text-white">
              Are you a…
            </div>
            <div className="mb-8 text-[14px] leading-[1.5] text-white/40">
              We'll personalise your page based on your business type.
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="flex w-full items-center gap-3 rounded-[14px] border border-white/10 bg-white/5 px-6 py-[18px] text-left text-[15px] font-extrabold tracking-[-0.01em] text-white transition-all hover:border-[rgba(209,26,16,0.4)] hover:bg-[rgba(209,26,16,0.15)]"
                onClick={() => handleAudience("franchise")}
                type="button"
              >
                <span className="text-[28px]">🏢</span>
                <span>
                  <span className="block text-[15px] font-black">Franchise Operator</span>
                  <span className="mt-0.5 block text-[12px] font-semibold text-white/60">
                    I operate 1 or more franchise locations
                  </span>
                </span>
                <span className="ml-auto text-[18px] opacity-40">→</span>
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-[14px] border border-white/10 bg-white/5 px-6 py-[18px] text-left text-[15px] font-extrabold tracking-[-0.01em] text-white transition-all hover:border-[rgba(209,26,16,0.4)] hover:bg-[rgba(209,26,16,0.15)]"
                onClick={() => handleAudience("independent")}
                type="button"
              >
                <span className="text-[28px]">🏪</span>
                <span>
                  <span className="block text-[15px] font-black">Independent Business</span>
                  <span className="mt-0.5 block text-[12px] font-semibold text-white/60">
                    I run my own standalone local business
                  </span>
                </span>
                <span className="ml-auto text-[18px] opacity-40">→</span>
              </button>
            </div>
            <button
              className="mt-5 text-[11px] font-medium text-white/20 underline underline-offset-[3px] transition-colors hover:text-white/50"
              onClick={() => handleAudience("franchise")}
              type="button"
            >
              Skip — show me everything
            </button>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-[99] border-b border-white/10 bg-[rgba(10,8,18,0.95)] px-7 backdrop-blur-[16px]">
        <div className="mx-auto flex h-[62px] max-w-[700px] items-center justify-between">
          <div className="text-[20px] font-black tracking-[-0.03em] text-white">
            Local<span className="text-[#FF4D40]">Big</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+1"
              className="rounded-full bg-[#E8271A] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.07em] text-white transition-all hover:scale-[1.02] hover:bg-[#D11A10]"
            >
              ☎️ Book A Call
            </a>
            <button
              aria-label="Menu"
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[8px] bg-white/10 p-1 transition-colors hover:bg-white/20"
              onClick={() => setNavOpen((prev) => !prev)}
              type="button"
            >
              <span
                className={cx(
                  "h-[2.5px] w-5 rounded-[2px] bg-[#FF4D40] transition-all",
                  navOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cx(
                  "h-[2.5px] w-5 rounded-[2px] bg-[#FF4D40] transition-all",
                  navOpen && "opacity-0"
                )}
              />
              <span
                className={cx(
                  "h-[2.5px] w-5 rounded-[2px] bg-[#FF4D40] transition-all",
                  navOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cx(
          "fixed inset-0 z-[199] hidden bg-black/50 backdrop-blur-[3px]",
          navOpen && "block"
        )}
        onClick={() => setNavOpen(false)}
      />
      <div
        className={cx(
          "fixed right-[-280px] top-0 z-[200] h-full w-[260px] border-l border-white/10 bg-[#160A08] px-6 pb-6 pt-20 transition-[right] duration-300",
          navOpen && "right-0"
        )}
      >
        <div className="flex flex-col gap-1">
          <a
            href="#problems"
            onClick={() => setNavOpen(false)}
            className="rounded-[10px] px-4 py-3 text-[15px] font-bold text-white/55 transition-all hover:bg-white/10 hover:text-white"
          >
            Pain Points
          </a>
          <a
            href="#cases"
            onClick={() => setNavOpen(false)}
            className="rounded-[10px] px-4 py-3 text-[15px] font-bold text-white/55 transition-all hover:bg-white/10 hover:text-white"
          >
            Case Studies
          </a>
          <a
            href="#reviews"
            onClick={() => setNavOpen(false)}
            className="rounded-[10px] px-4 py-3 text-[15px] font-bold text-white/55 transition-all hover:bg-white/10 hover:text-white"
          >
            Reviews
          </a>
          <a
            href="#system"
            onClick={() => setNavOpen(false)}
            className="rounded-[10px] px-4 py-3 text-[15px] font-bold text-white/55 transition-all hover:bg-white/10 hover:text-white"
          >
            The System
          </a>
          <a
            href="#join"
            onClick={() => setNavOpen(false)}
            className="rounded-[10px] px-4 py-3 text-[15px] font-bold text-white/55 transition-all hover:bg-white/10 hover:text-white"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setNavOpen(false)}
            className="rounded-[10px] px-4 py-3 text-[15px] font-bold text-white/55 transition-all hover:bg-white/10 hover:text-white"
          >
            FAQ
          </a>
          <a
            href="#join"
            onClick={() => setNavOpen(false)}
            className="mt-3 rounded-[10px] bg-[#E8271A] px-4 py-3 text-center text-[13px] font-black uppercase tracking-[0.05em] text-white"
          >
            Get Your 60-Day Growth Plan →
          </a>
        </div>
      </div>

      <div className="sticky top-[62px] z-[98] border-b border-white/10 bg-[#0F0908] px-7">
        <div className="mx-auto flex h-11 max-w-[700px] items-center gap-4">
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
            I am a:
          </span>
          <div className="flex gap-1">
            <button
              className={cx(
                "rounded-full border border-transparent px-4 py-1.5 text-[12px] font-extrabold tracking-[0.04em] text-white/40 transition-all",
                audience === "independent" && "border-[#E8271A] bg-[#E8271A] text-white"
              )}
              onClick={() => handleAudience("independent")}
              type="button"
            >
              🏪 Local Business
            </button>
            <button
              className={cx(
                "rounded-full border border-transparent px-4 py-1.5 text-[12px] font-extrabold tracking-[0.04em] text-white/40 transition-all",
                audience === "franchise" && "border-[#E8271A] bg-[#E8271A] text-white"
              )}
              onClick={() => handleAudience("franchise")}
              type="button"
            >
              🏢 Franchise Owner
            </button>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#160A08] px-7 pb-[88px] pt-[80px] text-center text-white" id="hero">
        <div
          className="pointer-events-none absolute left-1/2 top-[-180px] h-[700px] w-[700px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(209,26,16,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[620px]" id="heroInner">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-[18px] py-[7px] text-[11px] font-bold uppercase tracking-[0.06em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[#FF4D40] animate-[blink_1.4s_ease_infinite]" />
            Limited Seats Available
          </div>

          <div className={cx(heroAudience === "franchise" ? "block" : "hidden")}>
            <h1 className="mb-8 text-[clamp(36px,10vw,78px)] font-black leading-[0.9] tracking-[-0.035em]">
              <span className="text-[#FF4D40]">National Ads</span> Build The Brand.
              <br />
              <em className="inline">
                <span className="rounded-[7px] bg-[#E8271A] px-4 py-[3px] italic text-white">
                  We Fill Your Store.
                </span>
              </em>
            </h1>
            <p className="mb-7 text-[clamp(18px,4.5vw,28px)] font-bold leading-[1.3] text-white/65">
              Same Brand. Same Ads.
              <br />
              <span className="rounded-[5px] bg-[#E8271A] px-2 py-[2px] text-white">
                Why Is Their Store Busier?
              </span>
            </p>
          </div>

          <div className={cx(heroAudience === "independent" ? "block" : "hidden")}>
            <h1 className="mb-11 text-[clamp(40px,11vw,82px)] font-black leading-[0.9] tracking-[-0.035em]">
              <span className="text-[#FF4D40]">Stop Losing</span>
              <br />
              Your Local Customers
              <br />
              <em>
                <span className="rounded-[7px] bg-[#E8271A] px-4 py-[3px] italic text-white">
                  To Big-Chains.
                </span>
              </em>
            </h1>
            <p className="mb-4 text-[clamp(17px,4vw,27px)] font-black leading-[1.2] tracking-[-0.02em] text-white">
              <span className="rounded-[5px] bg-[#E8271A] px-[10px] py-[2px] text-white">
                Get New Customers
              </span>{" "}
              in 60-Days,{" "}
              <span className="font-semibold text-white/35">{audienceGuarantee}</span>
            </p>
          </div>

          <div className="my-6 text-center">
            <span className="mb-3 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
              The competition you're up against
            </span>
            <div className="flex flex-wrap items-center justify-center gap-[7px]">
              {compLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] border border-white/10 bg-white/5 p-[7px] opacity-30 transition-all hover:opacity-65"
                >
                  <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-11 flex flex-col items-center gap-3">
            <a
              href="#join"
              className={cx(
                "inline-flex items-center gap-2 rounded-full px-7 py-[14px] text-[13px] font-black uppercase tracking-[0.05em] shadow-[0_6px_32px_rgba(209,26,16,0.25)] transition-all",
                heroAudience === "franchise"
                  ? "bg-white text-[#D11A10] hover:bg-[#FFF8F8]"
                  : "bg-[#E8271A] text-white hover:bg-[#D11A10]"
              )}
            >
              {heroAudience === "franchise"
                ? "Dominate Your Local Market in 60-Days →"
                : "Get Your 60-Day Growth Plan →"}
            </a>
            <p className="text-[12px] font-semibold text-white/35">
              <a
                href="#faq"
                className="text-white/55 underline decoration-dashed underline-offset-[3px]"
              >
                *See how our 60-Day Growth Promise works
              </a>
            </p>
          </div>

          <div className="overflow-hidden rounded-[16px] bg-[#1F100C] shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-[10px]">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 rounded-[6px] bg-white/5 px-[14px] py-[5px] text-center text-[11px] font-semibold tracking-[0.02em] text-white/20">
                localbig.com — Real Case Study
              </div>
            </div>
            <div
              className="relative flex aspect-square cursor-pointer items-center justify-center"
              style={{
                background: "linear-gradient(155deg,#1a0800,#2a1000,#0a0812)",
              }}
            >
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    "radial-gradient(circle, rgba(209,26,16,0.15), transparent 70%)",
                }}
              />
              <div className="pointer-events-none absolute text-[clamp(100px,28vw,220px)] font-black italic tracking-[-0.05em] text-white/[0.018]">
                🍗
              </div>
              <div className="z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#E8271A] shadow-[0_8px_36px_rgba(209,26,16,0.6)] transition-all hover:scale-[1.08] hover:shadow-[0_14px_48px_rgba(209,26,16,0.75)]">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M6 3.5l11 6.5-11 6.5V3.5z" fill="white" />
                </svg>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-6 pb-[22px] pt-14"
                style={{
                  background: "linear-gradient(to top, rgba(10,8,18,0.95), transparent)",
                }}
              >
                <div>
                  <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/30">
                    Real Case Study · Krispy Krunchy Chicken
                  </div>
                  <div className="text-[clamp(20px,5vw,32px)] font-black leading-[1.05] tracking-[-0.02em] text-white">
                    How We Got Krispy's Willimantic
                    <br />
                    Store to <span className="text-[#FF4D40]">#1</span>
                  </div>
                </div>
                <div className="whitespace-nowrap rounded-full bg-[#E8271A] px-[18px] py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white">
                  Watch
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-white/10 bg-[#0F0908] px-7 py-[18px]">
        <div className="mx-auto flex max-w-[700px] flex-wrap items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-1 text-[13px] font-bold text-white/70">
            <span className="text-[#FF4D40]">★★★★★</span> 4.9/5 Rating
          </div>
          <div className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2 px-4 py-1 text-[13px] font-bold text-white/70">
            Franchise & Local Operators
          </div>
          <div className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2 px-4 py-1 text-[13px] font-bold text-white/70">
            Results in 60 Days
          </div>
          <div className="hidden h-5 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2 px-4 py-1 text-[13px] font-bold text-white/70">
            100% Done For You
          </div>
        </div>
      </div>

      <section className="bg-[#FFF8F8] px-7 py-[80px]" id="problems">
        <div className="mx-auto max-w-[700px]">
          <span className="mb-2 block text-[clamp(14px,3.5vw,22px)] font-black uppercase tracking-[0.08em] text-[#FF4D40]">
            Sound Like Your Business?
          </span>
          <h2 className="mb-8 text-[clamp(38px,10vw,72px)] font-black leading-[0.92] tracking-[-0.03em]">
            Where Do You Feel
            <br />
            <em className="italic text-[#E8271A]">The Most Pain?</em>
          </h2>

          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#160A08]">
            <div className="px-6 pt-5 text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/30">
              I am...
            </div>
            <div className="grid grid-cols-1 gap-0 p-3 sm:grid-cols-2">
              {[
                { key: "launch", icon: "🚀", label: "Launching a\nNew Location" },
                { key: "foottraffic", icon: "🚶", label: "Getting No\nFoot Traffic" },
                { key: "views", icon: "🎬", label: "Getting Views,\nBut No Walk-Ins" },
                { key: "ads", icon: "💸", label: "Losing Money\non Ads" },
                { key: "churn", icon: "😤", label: "Losing\nCustomers" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handlePainSelect(item.key)}
                  type="button"
                  className={cx(
                    "m-1 flex flex-col items-center rounded-[14px] border border-white/10 bg-white/5 px-4 py-5 text-center text-white transition-all",
                    activePain === item.key && "border-[#E8271A] bg-[#E8271A]"
                  )}
                >
                  <span className="mb-3 text-[48px] leading-none">{item.icon}</span>
                  <span className="mb-2 text-[clamp(14px,3.2vw,18px)] font-black leading-[1.2] tracking-[-0.01em]">
                    {item.label.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                  <span
                    className={cx(
                      "text-[16px] text-white/30 transition-colors",
                      activePain === item.key && "text-white/80"
                    )}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>

            <div
              id="pa-launch"
              className={cx(
                "border-t border-white/10 bg-white/5 px-6 py-7",
                activePain === "launch" ? "block" : "hidden"
              )}
            >
              <div className="mb-2 text-center text-[40px]">🚀</div>
              <div className="mb-2 text-center text-[20px] font-black text-white">Launching a New Location</div>
              <p className="mb-0 text-center text-[14px] leading-[1.65] text-white/50">
                We launched 2 Taza2Go locations simultaneously — zero to foot traffic in 30 days. Tell us about your launch and we'll build your custom plan.
              </p>
              {!submittedPain.launch && (
                <div className="mt-5">
                  <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Your name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Email address" type="email" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Phone number" type="tel" />
                  </div>
                  <input className="mb-2 w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business address / city" />
                  <select
                    className="w-full appearance-none rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white/60 focus:border-[#E8271A]/60 focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Estimated launch budget
                    </option>
                    <option>Under $2,000/mo</option>
                    <option>$2,000 – $5,000/mo</option>
                    <option>$5,000 – $10,000/mo</option>
                    <option>$10,000+/mo</option>
                  </select>
                  <button
                    className="mt-3 w-full rounded-full bg-[#E8271A] px-5 py-[15px] text-[14px] font-black uppercase tracking-[0.06em] text-white transition-all hover:bg-[#D11A10]"
                    onClick={() => handlePainSubmit("launch")}
                    type="button"
                  >
                    Get My Launch Plan →
                  </button>
                  <p className="mt-2 text-center text-[10px] text-white/20">We review every application within 24 hours.</p>
                </div>
              )}
              {submittedPain.launch && (
                <div className="mt-5">
                  <div className="mb-4 text-center text-[14px] font-extrabold text-white/70">
                    Based on your launch, here's what we recommend:
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      className={cx(
                        "relative rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.launch === "60day" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("launch", "60day")}
                      type="button"
                    >
                      <span className="absolute -top-[1px] right-[-1px] rounded-bl-[10px] rounded-tr-[14px] bg-[#E8271A] px-[10px] py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
                        Recommended
                      </span>
                      <div className="mb-2 text-[28px]">📍</div>
                      <div className="mb-1 text-[15px] font-black text-white">60-Day Growth Plan</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $1,500<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Full launch playbook — Google, ads, content, loyalty. Results in 60 days.
                      </div>
                    </button>
                    <button
                      className={cx(
                        "rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.launch === "kickoff" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("launch", "kickoff")}
                      type="button"
                    >
                      <div className="mb-2 text-[28px]">🔥</div>
                      <div className="mb-1 text-[15px] font-black text-white">Kickoff Campaign</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $5,000<span className="text-[13px] font-semibold text-white/40"> one-time</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        One-time full launch blast — brand setup, Google, Meta ads, social. Done in 30 days.
                      </div>
                    </button>
                  </div>
                  <a
                    href="#join"
                    className="mt-4 flex items-center justify-center rounded-full bg-white px-5 py-[14px] text-[13px] font-black uppercase tracking-[0.06em] text-[#D11A10] shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01]"
                  >
                    Apply for Your Chosen Plan →
                  </a>
                </div>
              )}
            </div>

            <div
              id="pa-foottraffic"
              className={cx(
                "border-t border-white/10 bg-white/5 px-6 py-7",
                activePain === "foottraffic" ? "block" : "hidden"
              )}
            >
              <div className="mb-2 text-center text-[40px]">🚶</div>
              <div className="mb-2 text-center text-[20px] font-black text-white">Getting No Foot Traffic</div>
              <p className="mb-0 text-center text-[14px] leading-[1.65] text-white/50">
                Krispy Krunchy went from invisible to #1 in 60 days. Tell us about your location and we'll map your fastest path to customers walking in.
              </p>
              {!submittedPain.foottraffic && (
                <div className="mt-5">
                  <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Your name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Email address" type="email" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Phone number" type="tel" />
                  </div>
                  <input className="mb-2 w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business address / city" />
                  <button
                    className="mt-3 w-full rounded-full bg-[#E8271A] px-5 py-[15px] text-[14px] font-black uppercase tracking-[0.06em] text-white transition-all hover:bg-[#D11A10]"
                    onClick={() => handlePainSubmit("foottraffic")}
                    type="button"
                  >
                    Get My Foot Traffic Plan →
                  </button>
                  <p className="mt-2 text-center text-[10px] text-white/20">We review every application within 24 hours.</p>
                </div>
              )}
              {submittedPain.foottraffic && (
                <div className="mt-5">
                  <div className="mb-4 text-center text-[14px] font-extrabold text-white/70">
                    Here's what we recommend for your foot traffic problem:
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      className={cx(
                        "relative rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.foottraffic === "60day" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("foottraffic", "60day")}
                      type="button"
                    >
                      <span className="absolute -top-[1px] right-[-1px] rounded-bl-[10px] rounded-tr-[14px] bg-[#E8271A] px-[10px] py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
                        Start Here
                      </span>
                      <div className="mb-2 text-[28px]">🚀</div>
                      <div className="mb-1 text-[15px] font-black text-white">60-Day Local Growth Program</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $1,500<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Audit → Google → Ads → Results. Measurable foot traffic in 60 days or we keep working free.
                      </div>
                    </button>
                    <button
                      className={cx(
                        "rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.foottraffic === "domination" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("foottraffic", "domination")}
                      type="button"
                    >
                      <div className="mb-2 text-[28px]">📍</div>
                      <div className="mb-1 text-[15px] font-black text-white">Local Domination</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $2,750<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Full market takeover — 16 posts/mo, geo-fencing, full Meta + Google, loyalty system.
                      </div>
                    </button>
                  </div>
                  <a
                    href="#join"
                    className="mt-4 flex items-center justify-center rounded-full bg-white px-5 py-[14px] text-[13px] font-black uppercase tracking-[0.06em] text-[#D11A10] shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01]"
                  >
                    Apply for Your Chosen Plan →
                  </a>
                </div>
              )}
            </div>

            <div
              id="pa-views"
              className={cx(
                "border-t border-white/10 bg-white/5 px-6 py-7",
                activePain === "views" ? "block" : "hidden"
              )}
            >
              <div className="mb-2 text-center text-[40px]">🎬</div>
              <div className="mb-2 text-center text-[20px] font-black text-white">Getting Views But No Walk-Ins</div>
              <p className="mb-0 text-center text-[14px] leading-[1.65] text-white/50">
                Views that don't convert are just noise. The StoryAds framework turns digital attention into real foot traffic. Tell us about your business.
              </p>
              {!submittedPain.views && (
                <div className="mt-5">
                  <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Your name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Email address" type="email" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Phone number" type="tel" />
                  </div>
                  <input className="mb-2 w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business address / city" />
                  <button
                    className="mt-3 w-full rounded-full bg-[#E8271A] px-5 py-[15px] text-[14px] font-black uppercase tracking-[0.06em] text-white transition-all hover:bg-[#D11A10]"
                    onClick={() => handlePainSubmit("views")}
                    type="button"
                  >
                    Get My Growth Plan →
                  </button>
                  <p className="mt-2 text-center text-[10px] text-white/20">We review every application within 24 hours.</p>
                </div>
              )}
              {submittedPain.views && (
                <div className="mt-5">
                  <div className="mb-4 text-center text-[14px] font-extrabold text-white/70">
                    Based on your situation, we recommend:
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      className={cx(
                        "relative rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.views === "domination" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("views", "domination")}
                      type="button"
                    >
                      <span className="absolute -top-[1px] right-[-1px] rounded-bl-[10px] rounded-tr-[14px] bg-[#E8271A] px-[10px] py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
                        Recommended
                      </span>
                      <div className="mb-2 text-[28px]">📍</div>
                      <div className="mb-1 text-[15px] font-black text-white">Local Domination</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $2,750<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Full StoryAds + geo-fencing + Meta + loyalty — turning views into a walk-in machine.
                      </div>
                    </button>
                    <button
                      className={cx(
                        "rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.views === "year" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("views", "year")}
                      type="button"
                    >
                      <div className="mb-2 text-[28px]">🏆</div>
                      <div className="mb-1 text-[15px] font-black text-white">1-Year Plan</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $5,000<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Multi-location growth. Full regional playbook. Compound results over 12 months.
                      </div>
                    </button>
                  </div>
                  <a
                    href="#join"
                    className="mt-4 flex items-center justify-center rounded-full bg-white px-5 py-[14px] text-[13px] font-black uppercase tracking-[0.06em] text-[#D11A10] shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01]"
                  >
                    Apply for Your Chosen Plan →
                  </a>
                </div>
              )}
            </div>

            <div
              id="pa-ads"
              className={cx(
                "border-t border-white/10 bg-white/5 px-6 py-7",
                activePain === "ads" ? "block" : "hidden"
              )}
            >
              <div className="mb-2 text-center text-[40px]">💸</div>
              <div className="mb-2 text-center text-[20px] font-black text-white">Losing Money on Ads</div>
              <p className="mb-0 text-center text-[14px] leading-[1.65] text-white/50">
                Bad ad targeting is expensive. Our hyperlocal campaigns target buyers within miles of your door — not the wrong zip code. Let's audit yours.
              </p>
              {!submittedPain.ads && (
                <div className="mt-5">
                  <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Your name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Email address" type="email" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Phone number" type="tel" />
                  </div>
                  <input className="mb-2 w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business address / city" />
                  <button
                    className="mt-3 w-full rounded-full bg-[#E8271A] px-5 py-[15px] text-[14px] font-black uppercase tracking-[0.06em] text-white transition-all hover:bg-[#D11A10]"
                    onClick={() => handlePainSubmit("ads")}
                    type="button"
                  >
                    Fix My Ad Spend →
                  </button>
                  <p className="mt-2 text-center text-[10px] text-white/20">We review every application within 24 hours.</p>
                </div>
              )}
              {submittedPain.ads && (
                <div className="mt-5">
                  <div className="mb-4 text-center text-[14px] font-extrabold text-white/70">
                    Based on your situation, we recommend:
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      className={cx(
                        "relative rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.ads === "domination" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("ads", "domination")}
                      type="button"
                    >
                      <span className="absolute -top-[1px] right-[-1px] rounded-bl-[10px] rounded-tr-[14px] bg-[#E8271A] px-[10px] py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
                        Recommended
                      </span>
                      <div className="mb-2 text-[28px]">📍</div>
                      <div className="mb-1 text-[15px] font-black text-white">Local Domination</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $2,750<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        We rebuild your campaigns from scratch — hyperlocal targeting that actually drives foot traffic.
                      </div>
                    </button>
                    <button
                      className={cx(
                        "rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.ads === "year" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("ads", "year")}
                      type="button"
                    >
                      <div className="mb-2 text-[28px]">🏆</div>
                      <div className="mb-1 text-[15px] font-black text-white">1-Year Plan</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $5,000<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Multi-location ad management + full regional growth system across all your markets.
                      </div>
                    </button>
                  </div>
                  <a
                    href="#join"
                    className="mt-4 flex items-center justify-center rounded-full bg-white px-5 py-[14px] text-[13px] font-black uppercase tracking-[0.06em] text-[#D11A10] shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01]"
                  >
                    Apply for Your Chosen Plan →
                  </a>
                </div>
              )}
            </div>

            <div
              id="pa-churn"
              className={cx(
                "border-t border-white/10 bg-white/5 px-6 py-7",
                activePain === "churn" ? "block" : "hidden"
              )}
            >
              <div className="mb-2 text-center text-[40px]">😤</div>
              <div className="mb-2 text-center text-[20px] font-black text-white">Losing Customers</div>
              <p className="mb-0 text-center text-[14px] leading-[1.65] text-white/50">
                Norwich Pharmacy stopped bleeding regulars with a loyalty system we built in 60 days. Tell us about your retention problem.
              </p>
              {!submittedPain.churn && (
                <div className="mt-5">
                  <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Your name" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Email address" type="email" />
                    <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Phone number" type="tel" />
                  </div>
                  <input className="mb-2 w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[13px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business address / city" />
                  <button
                    className="mt-3 w-full rounded-full bg-[#E8271A] px-5 py-[15px] text-[14px] font-black uppercase tracking-[0.06em] text-white transition-all hover:bg-[#D11A10]"
                    onClick={() => handlePainSubmit("churn")}
                    type="button"
                  >
                    Fix My Retention →
                  </button>
                  <p className="mt-2 text-center text-[10px] text-white/20">We review every application within 24 hours.</p>
                </div>
              )}
              {submittedPain.churn && (
                <div className="mt-5">
                  <div className="mb-4 text-center text-[14px] font-extrabold text-white/70">
                    Based on your situation, we recommend:
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      className={cx(
                        "relative rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.churn === "domination" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("churn", "domination")}
                      type="button"
                    >
                      <span className="absolute -top-[1px] right-[-1px] rounded-bl-[10px] rounded-tr-[14px] bg-[#E8271A] px-[10px] py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
                        Recommended
                      </span>
                      <div className="mb-2 text-[28px]">📍</div>
                      <div className="mb-1 text-[15px] font-black text-white">Local Domination</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $2,750<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Full loyalty system + automated win-back campaigns + Meta retargeting. Stop the bleed.
                      </div>
                    </button>
                    <button
                      className={cx(
                        "rounded-[14px] border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-[#E8271A]/40 hover:bg-[#E8271A]/10",
                        selectedPlan.churn === "year" && "border-[#E8271A] bg-[#E8271A]"
                      )}
                      onClick={() => handleChoosePlan("churn", "year")}
                      type="button"
                    >
                      <div className="mb-2 text-[28px]">🏆</div>
                      <div className="mb-1 text-[15px] font-black text-white">1-Year Plan</div>
                      <div className="mb-2 text-[22px] font-black text-[#FF4D40]">
                        $5,000<span className="text-[13px] font-semibold text-white/40">/mo</span>
                      </div>
                      <div className="text-[12px] leading-[1.55] text-white/40">
                        Centralized loyalty across all locations + multi-market retention strategy.
                      </div>
                    </button>
                  </div>
                  <a
                    href="#join"
                    className="mt-4 flex items-center justify-center rounded-full bg-white px-5 py-[14px] text-[13px] font-black uppercase tracking-[0.06em] text-[#D11A10] shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01]"
                  >
                    Apply for Your Chosen Plan →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-7 py-[88px]" id="cases">
        <div className="mx-auto max-w-[700px]">
          <span className="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FF4D40]">
            📍 Real Businesses · Real Markets · Real Results
          </span>
          <h2 className="mb-11 text-[clamp(38px,10vw,72px)] font-black leading-[0.92] tracking-[-0.03em]">
            Grow Your Location.
            <br />
            <em className="italic text-[#E8271A]">Own Your Market.</em>
          </h2>

          <div className="grid grid-cols-1 overflow-hidden rounded-[16px] border border-[#F0E4E4] sm:grid-cols-2">
            <div className="min-w-0 border-b border-[#F0E4E4] sm:border-b-0 sm:border-r">
              <div className="px-5 pt-5">
                <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CA3AF]">
                  Taza2Go · Multi-Location Franchise Launch
                </div>
                <div className="mb-2 inline-block rounded-[5px] bg-[#E8271A] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.07em] text-white">
                  New Location Launch · New Media Presence
                </div>
                <div className="mb-4 text-[clamp(20px,5vw,32px)] font-black leading-none tracking-[-0.02em] text-[#E8271A]">
                  Zero to Launch:
                  <br />
                  2 Markets in 30 Days
                </div>
              </div>
              <div className="border-t border-[#F0E4E4]">
                <div className="flex">
                  <button
                    className={cx(
                      "flex-1 border-r border-[#F0E4E4] px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all",
                      caseTabs[0] === "b"
                        ? "bg-[#FFF8F8] text-[#0F0908]"
                        : "text-[#9CA3AF]"
                    )}
                    onClick={() => setCaseTabs((prev) => ({ ...prev, 0: "b" }))}
                    type="button"
                  >
                    <span
                      className={cx(
                        "mr-2 inline-block h-[6px] w-[6px] rounded-full",
                        caseTabs[0] === "b" ? "bg-[#9CA3AF]" : "bg-[#F0E4E4]"
                      )}
                    />
                    Before
                  </button>
                  <button
                    className={cx(
                      "flex-1 px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all",
                      caseTabs[0] === "a"
                        ? "bg-[#E8271A] text-white"
                        : "text-[#9CA3AF]"
                    )}
                    onClick={() => setCaseTabs((prev) => ({ ...prev, 0: "a" }))}
                    type="button"
                  >
                    <span
                      className={cx(
                        "mr-2 inline-block h-[6px] w-[6px] rounded-full",
                        caseTabs[0] === "a" ? "bg-white/60" : "bg-[#F0E4E4]"
                      )}
                    />
                    After 30 Days
                  </button>
                </div>
                <div className={cx("relative aspect-[9/16]", caseTabs[0] === "b" ? "block" : "hidden")}>
                  <div className="flex h-full flex-col bg-[#0F0B1A] p-3">
                    <div className="mb-2 flex items-center gap-1 rounded-[4px] bg-white/5 px-2 py-1">
                      <div className="flex gap-[3px]">
                        <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                        <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                        <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                      </div>
                      <div className="ml-1 h-[9px] flex-1 rounded-[3px] bg-white/5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex flex-col gap-1 animate-[scroll_9s_linear_infinite]">
                        <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                          Zero Google Presence
                        </div>
                        <div className="mb-1 rounded-[4px] bg-white/5 p-2">
                          <div className="mb-1 flex items-center gap-1">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[30%] rounded-[2px] bg-white/10" />
                          </div>
                          <div className="flex items-center gap-1 opacity-20">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[20%] rounded-[2px] bg-white/10" />
                          </div>
                        </div>
                        <div className="h-[7px] w-[38%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[46%] rounded-[2px] bg-[rgba(209,26,16,0.2)]" />
                        <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                          No Social Presence
                        </div>
                        <div className="h-[36px] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[38%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[58%] rounded-[2px] bg-white/5" />
                        <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                          Zero Brand Awareness
                        </div>
                        <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[46%] rounded-[2px] bg-[rgba(209,26,16,0.2)]" />
                        <div className="h-[7px] w-[38%] rounded-[2px] bg-white/5" />
                        <div className="rounded-[4px] bg-white/5 p-2">
                          <div className="flex items-center gap-1 opacity-15">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[25%] rounded-[2px] bg-white/10" />
                          </div>
                        </div>
                        <div className="h-[7px] w-[58%] rounded-[2px] bg-white/5" />
                        <div className="h-[36px] rounded-[2px] bg-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("relative aspect-[9/16]", caseTabs[0] === "a" ? "block" : "hidden")}>
                  <div
                    className="relative flex h-full items-center justify-center"
                    style={{ background: "linear-gradient(145deg,#0a0f18,#0d1a12)" }}
                  >
                    <div className="pointer-events-none absolute text-[clamp(70px,20vw,150px)] font-black italic tracking-[-0.05em] text-white/[0.03]">
                      30d
                    </div>
                    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#E8271A] shadow-[0_4px_24px_rgba(209,26,16,0.55)] transition-all hover:scale-[1.07]">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M6 4l12 6-12 6V4z" fill="white" />
                      </svg>
                    </div>
                    <div
                      className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-9"
                      style={{
                        background: "linear-gradient(to top, rgba(10,8,18,0.92), transparent)",
                      }}
                    >
                      <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#FF4D40]">
                        ↑ Foot Traffic · Both Locations Live
                      </div>
                      <div className="text-[clamp(16px,4vw,24px)] font-black leading-none text-white">
                        Watch the Full Launch →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex border-t border-[#F0E4E4]">
                <div className="flex-1 px-3 py-4 text-center">
                  <div className="text-[28px] font-black tracking-[-0.02em] text-[#E8271A]">2</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                    Markets Launched
                  </div>
                </div>
                <div className="flex-1 border-l border-[#F0E4E4] px-3 py-4 text-center">
                  <div className="text-[28px] font-black tracking-[-0.02em] text-[#E8271A]">30d</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                    To Foot Traffic
                  </div>
                </div>
                <div className="flex-1 border-l border-[#F0E4E4] px-3 py-4 text-center">
                  <div className="text-[28px] font-black tracking-[-0.02em] text-[#E8271A]">0→∞</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                    Digital Presence
                  </div>
                </div>
              </div>
              <div className="border-t border-[#F0E4E4] px-6 py-5">
                <p className="text-[13.5px] leading-[1.72] text-[#9CA3AF]">
                  A new halal restaurant concept entering two competitive CT markets simultaneously — zero brand recognition, zero digital presence, zero social following.{" "}
                  <strong className="font-bold text-[#0F0908]">
                    We built their complete local digital infrastructure, launched full Google + Meta campaigns, and drove measurable foot traffic to both locations within 30 days of opening.
                  </strong>{" "}
                  From invisible to known — before most restaurants find their footing.
                </p>
              </div>
              <div className="flex gap-2 border-t border-[#F0E4E4] px-6 py-3">
                <span className="text-[13px] font-bold text-[#0F0908]">📍 Mystic, CT</span>
                <span className="text-[13px] font-bold text-[#0F0908]">📍 Niantic, CT</span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="px-5 pt-5">
                <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CA3AF]">
                  Krispy Krunchy Chicken · Franchise Operator
                </div>
                <div className="mb-4 text-[clamp(20px,5vw,32px)] font-black leading-none tracking-[-0.02em] text-[#E8271A]">
                  From Zero Digital Presence
                  <br />
                  to #1 in Local Market
                </div>
              </div>
              <div className="border-t border-[#F0E4E4]">
                <div className="flex">
                  <button
                    className={cx(
                      "flex-1 border-r border-[#F0E4E4] px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all",
                      caseTabs[1] === "b"
                        ? "bg-[#FFF8F8] text-[#0F0908]"
                        : "text-[#9CA3AF]"
                    )}
                    onClick={() => setCaseTabs((prev) => ({ ...prev, 1: "b" }))}
                    type="button"
                  >
                    <span
                      className={cx(
                        "mr-2 inline-block h-[6px] w-[6px] rounded-full",
                        caseTabs[1] === "b" ? "bg-[#9CA3AF]" : "bg-[#F0E4E4]"
                      )}
                    />
                    Before
                  </button>
                  <button
                    className={cx(
                      "flex-1 px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all",
                      caseTabs[1] === "a"
                        ? "bg-[#E8271A] text-white"
                        : "text-[#9CA3AF]"
                    )}
                    onClick={() => setCaseTabs((prev) => ({ ...prev, 1: "a" }))}
                    type="button"
                  >
                    <span
                      className={cx(
                        "mr-2 inline-block h-[6px] w-[6px] rounded-full",
                        caseTabs[1] === "a" ? "bg-white/60" : "bg-[#F0E4E4]"
                      )}
                    />
                    After 60 Days
                  </button>
                </div>
                <div className={cx("relative aspect-[9/16]", caseTabs[1] === "b" ? "block" : "hidden")}>
                  <div className="flex h-full flex-col bg-[#0F0B1A] p-3">
                    <div className="mb-2 flex items-center gap-1 rounded-[4px] bg-white/5 px-2 py-1">
                      <div className="flex gap-[3px]">
                        <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                        <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                        <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                      </div>
                      <div className="ml-1 h-[9px] flex-1 rounded-[3px] bg-white/5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex flex-col gap-1 animate-[scroll_9s_linear_infinite]">
                        <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                          Ranked #9 · Google Maps
                        </div>
                        <div className="mb-1 rounded-[4px] bg-white/5 p-2">
                          <div className="mb-1 flex items-center gap-1">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[55%] rounded-[2px] bg-white/10" />
                          </div>
                          <div className="mb-1 flex items-center gap-1 opacity-40">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[68%] rounded-[2px] bg-white/10" />
                          </div>
                          <div className="flex items-center gap-1 opacity-20">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[40%] rounded-[2px] bg-white/10" />
                          </div>
                        </div>
                        <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[58%] rounded-[2px] bg-white/5" />
                        <div className="h-[36px] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[38%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[46%] rounded-[2px] bg-[rgba(209,26,16,0.2)]" />
                        <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                        <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                          No Loyalty System
                        </div>
                        <div className="h-[36px] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[58%] rounded-[2px] bg-white/5" />
                        <div className="rounded-[4px] bg-white/5 p-2">
                          <div className="mb-1 flex items-center gap-1">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[50%] rounded-[2px] bg-white/10" />
                          </div>
                          <div className="flex items-center gap-1 opacity-20">
                            <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                            <span className="h-[5px] w-[35%] rounded-[2px] bg-white/10" />
                          </div>
                        </div>
                        <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                        <div className="h-[7px] w-[46%] rounded-[2px] bg-[rgba(209,26,16,0.2)]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("relative aspect-[9/16]", caseTabs[1] === "a" ? "block" : "hidden")}>
                  <div
                    className="relative flex h-full items-center justify-center"
                    style={{ background: "linear-gradient(145deg,#110822,#1e0a3c)" }}
                  >
                    <div className="pointer-events-none absolute text-[clamp(70px,20vw,150px)] font-black italic tracking-[-0.05em] text-white/[0.03]">
                      10x
                    </div>
                    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#E8271A] shadow-[0_4px_24px_rgba(209,26,16,0.55)] transition-all hover:scale-[1.07]">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M6 4l12 6-12 6V4z" fill="white" />
                      </svg>
                    </div>
                    <div
                      className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-9"
                      style={{
                        background: "linear-gradient(to top, rgba(10,8,18,0.92), transparent)",
                      }}
                    >
                      <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#FF4D40]">
                        ↑ #1 Local Market · 3x Digital Sales
                      </div>
                      <div className="text-[clamp(16px,4vw,24px)] font-black leading-none text-white">
                        Watch the Full Result →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex border-t border-[#F0E4E4]">
                <div className="flex-1 px-3 py-4 text-center">
                  <div className="text-[28px] font-black tracking-[-0.02em] text-[#E8271A]">#1</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                    Local Market
                  </div>
                </div>
                <div className="flex-1 border-l border-[#F0E4E4] px-3 py-4 text-center">
                  <div className="text-[28px] font-black tracking-[-0.02em] text-[#E8271A]">3x</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                    Digital Sales
                  </div>
                </div>
                <div className="flex-1 border-l border-[#F0E4E4] px-3 py-4 text-center">
                  <div className="text-[28px] font-black tracking-[-0.02em] text-[#E8271A]">10x</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                    Local Reach
                  </div>
                </div>
              </div>
              <div className="border-t border-[#F0E4E4] px-6 py-5">
                <p className="text-[13.5px] leading-[1.72] text-[#9CA3AF]">
                  A franchise operator with two locations and zero digital presence — losing foot traffic to every nearby competitor.{" "}
                  <strong className="font-bold text-[#0F0908]">
                    We built their entire local digital footprint, launched hyperlocal StoryAds, and grew them to #1 in their local market in 60 days.
                  </strong>{" "}
                  Digital sales tripled. Both locations running at capacity.
                </p>
              </div>
              <div className="flex gap-2 border-t border-[#F0E4E4] px-6 py-3">
                <span className="text-[13px] font-bold text-[#0F0908]">📍 Norwich, CT</span>
                <span className="text-[13px] font-bold text-[#0F0908]">📍 Willimantic, CT</span>
              </div>
            </div>

            <button
              className="col-span-full flex w-full items-center justify-center gap-2 bg-[#E8271A] py-[14px] text-[12px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#D11A10]"
              onClick={() => setShowMoreCases((prev) => !prev)}
              type="button"
            >
              <span>{showMoreCases ? "Hide" : "See More Before & Afters"}</span>
              <span
                className={cx(
                  "transition-transform",
                  showMoreCases && "rotate-180"
                )}
              >
                ▾
              </span>
            </button>
          </div>

          <div
            className={cx(
              "transition-all",
              showMoreCases ? "mt-3 max-h-[1200px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
            )}
          >
            <div className="mt-3 rounded-[12px] border border-[#F0E4E4] p-5">
              <div className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#E8271A]">
                Case #3 · Norwich Pharmacy
              </div>
              <div className="mb-2 text-[18px] font-black tracking-[-0.02em]">
                Building a Loyal Customer Base
              </div>
              <div className="mb-2 text-[12px] font-bold text-[#9CA3AF]">📍 Norwich, CT</div>
              <p className="mb-2 text-[13px] leading-[1.6] text-[#9CA3AF]">
                A regional pharmacy with high churn and zero retention strategy. We launched Meta campaigns, built a branded loyalty system, and turned their personal service into a competitive advantage.{" "}
                <strong className="font-bold text-[#0F0908]">
                  Repeat visit rate improved significantly within 60 days.
                </strong>
              </p>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#E8271A]">
                ↑ Repeat Visits Up · Loyalty System Live
              </div>
            </div>
            <div className="mt-3 rounded-[12px] border border-[#F0E4E4] p-5">
              <div className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#E8271A]">
                Case #4 · Spice & Slice
              </div>
              <div className="mb-2 text-[18px] font-black tracking-[-0.02em]">
                Owning a Niche No Competitor Could Copy
              </div>
              <div className="mb-2 text-[12px] font-bold text-[#9CA3AF]">📍 Norwich, CT</div>
              <p className="mb-2 text-[13px] leading-[1.6] text-[#9CA3AF]">
                A halal grocery needing to own their niche. We built their brand, a cultural content series, and a <strong className="font-bold text-[#0F0908]">"SCAN TO VERIFY"</strong> QR campaign turning their standards into the #1 reason locals chose them.
              </p>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#E8271A]">
                ↑ 10x Local Reach · Cultural Market Owned
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[16px] border border-[#F0E4E4]">
            <div className="px-6 pt-5">
              <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9CA3AF]">
                Norwich Pharmacy · Independent Operator · Norwich, CT
              </div>
              <div className="mb-2 text-[clamp(22px,5vw,34px)] font-black leading-none tracking-[-0.02em] text-[#E8271A]">
                Building a Loyal
                <br />
                Customer Base
              </div>
              <div className="mb-4 text-[13px] leading-[1.5] text-[#9CA3AF]">
                Turned weekly customer churn into a measurable retention advantage — in 60 days.
              </div>
            </div>
            <div className="border-t border-[#F0E4E4]">
              <div className="flex">
                <button
                  className={cx(
                    "flex-1 border-r border-[#F0E4E4] px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all",
                    wideCaseTab === "b"
                      ? "bg-[#FFF8F8] text-[#0F0908]"
                      : "text-[#9CA3AF]"
                  )}
                  onClick={() => setWideCaseTab("b")}
                  type="button"
                >
                  <span
                    className={cx(
                      "mr-2 inline-block h-[6px] w-[6px] rounded-full",
                      wideCaseTab === "b" ? "bg-[#9CA3AF]" : "bg-[#F0E4E4]"
                    )}
                  />
                  Before
                </button>
                <button
                  className={cx(
                    "flex-1 px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.07em] transition-all",
                    wideCaseTab === "a"
                      ? "bg-[#E8271A] text-white"
                      : "text-[#9CA3AF]"
                  )}
                  onClick={() => setWideCaseTab("a")}
                  type="button"
                >
                  <span
                    className={cx(
                      "mr-2 inline-block h-[6px] w-[6px] rounded-full",
                      wideCaseTab === "a" ? "bg-white/60" : "bg-[#F0E4E4]"
                    )}
                  />
                  After 60 Days
                </button>
              </div>
              <div className={cx("relative aspect-[16/9]", wideCaseTab === "b" ? "block" : "hidden")}>
                <div className="flex h-full flex-col bg-[#0F0B1A] p-3">
                  <div className="mb-2 flex items-center gap-1 rounded-[4px] bg-white/5 px-2 py-1">
                    <div className="flex gap-[3px]">
                      <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                      <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                      <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                    </div>
                    <div className="ml-1 h-[9px] flex-1 rounded-[3px] bg-white/5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex flex-col gap-1 animate-[scroll_9s_linear_infinite]">
                      <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                        No Retention System · High Churn
                      </div>
                      <div className="h-[36px] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[58%] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[46%] rounded-[2px] bg-[rgba(209,26,16,0.2)]" />
                      <div className="rounded-[4px] bg-white/5 p-2">
                        <div className="mb-1 flex items-center gap-1">
                          <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                          <span className="h-[5px] w-[60%] rounded-[2px] bg-white/10" />
                        </div>
                        <div className="flex items-center gap-1 opacity-30">
                          <span className="h-[5px] w-[5px] rounded-full bg-white/10" />
                          <span className="h-[5px] w-[42%] rounded-[2px] bg-white/10" />
                        </div>
                      </div>
                      <div className="h-[7px] w-[38%] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                      <div className="mb-1 inline-block rounded-[3px] border border-white/10 px-[7px] py-[3px] text-[8px] font-extrabold uppercase tracking-[0.07em] text-white/15">
                        No Loyalty System
                      </div>
                      <div className="h-[36px] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[80%] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[58%] rounded-[2px] bg-white/5" />
                      <div className="h-[7px] w-[46%] rounded-[2px] bg-[rgba(209,26,16,0.2)]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("relative aspect-[16/9]", wideCaseTab === "a" ? "block" : "hidden")}>
                <div
                  className="relative flex h-full items-center justify-center"
                  style={{ background: "linear-gradient(145deg,#0a0812,#150a2a)" }}
                >
                  <div className="pointer-events-none absolute text-[clamp(70px,20vw,150px)] font-black italic tracking-[-0.05em] text-white/[0.03]">
                    60d
                  </div>
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#E8271A] shadow-[0_4px_24px_rgba(209,26,16,0.55)] transition-all hover:scale-[1.07]">
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                      <path d="M6 4l12 6-12 6V4z" fill="white" />
                    </svg>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-9"
                    style={{
                      background: "linear-gradient(to top, rgba(10,8,18,0.92), transparent)",
                    }}
                  >
                    <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#FF4D40]">
                      ↑ Repeat Visits Up · Loyalty Live · Meta Ads Running
                    </div>
                    <div className="text-[clamp(16px,4vw,24px)] font-black leading-none text-white">
                      Watch the Full Result →
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-t border-[#F0E4E4]">
              <div className="flex-1 border-r border-[#F0E4E4] px-3 py-4 text-center">
                <div className="text-[26px] font-black tracking-[-0.02em] text-[#E8271A]">↑↑</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                  Repeat Visits
                </div>
              </div>
              <div className="flex-1 border-r border-[#F0E4E4] px-3 py-4 text-center">
                <div className="text-[26px] font-black tracking-[-0.02em] text-[#E8271A]">Live</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                  Meta Ads
                </div>
              </div>
              <div className="flex-1 border-r border-[#F0E4E4] px-3 py-4 text-center">
                <div className="text-[26px] font-black tracking-[-0.02em] text-[#E8271A]">60d</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                  To Results
                </div>
              </div>
              <div className="flex-1 px-3 py-4 text-center">
                <div className="text-[26px] font-black tracking-[-0.02em] text-[#E8271A]">0→✓</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF]">
                  Loyalty System
                </div>
              </div>
            </div>
            <div className="border-t border-[#F0E4E4] px-6 py-5">
              <p className="text-[13.5px] leading-[1.72] text-[#9CA3AF]">
                A regional pharmacy with high churn and no retention strategy — first-time visitors weren't returning.{" "}
                <strong className="font-bold text-[#0F0908]">
                  We launched Meta campaigns, built a branded loyalty system, and turned their personal service into a measurable competitive advantage.
                </strong>{" "}
                Repeat visit rate improved significantly within 60 days. Customers who would have switched are now regulars.
              </p>
              <div className="mt-3 text-[13px] font-bold text-[#0F0908]">📍 Norwich, CT</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF8F8] px-7 py-16">
        <div className="mx-auto max-w-[700px]">
          <div className="mb-8">
            <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#9CA3AF]">
              The Franchises We Are Working With
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {franchiseLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex h-[68px] w-[68px] items-center justify-center rounded-[14px] border border-[#F0E4E4] bg-white p-2.5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                >
                  <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 border-t border-[#F0E4E4]" />
          <div>
            <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#9CA3AF]">
              The Local Operations We Are Working With
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {localOps.map((op) => (
                <div
                  key={op.text}
                  className="flex h-[68px] w-[68px] items-center justify-center rounded-[14px] border border-[#F0E4E4] bg-white p-2.5 text-center text-[10px] font-extrabold text-[#0F0908]"
                >
                  {op.text.split("\n").map((line) => (
                    <span key={line} className="block leading-[1.3]">
                      {line}
                    </span>
                  ))}
                </div>
              ))}
              <div className="text-[12px] font-extrabold tracking-[0.06em] text-[#9CA3AF]">+ Many More</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF8F8] px-7 pb-[88px] pt-[80px]" id="reviews">
        <div className="mx-auto max-w-[700px]">
          <span className="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FF4D40]">
            What our clients say
          </span>
          <h2 className="mb-11 text-[clamp(28px,6.5vw,48px)] font-black leading-[0.95] tracking-[-0.025em]">
            Real Results.
            <br />
            <em className="italic text-[#E8271A]">Real Businesses.</em>
          </h2>
          <div className="flex flex-col gap-4">
            <div className="rounded-[16px] bg-[#160A08] px-6 py-7">
              <p className="mb-4 text-[15px] font-medium italic leading-[1.75] text-white/75">
                "Biggie's team grew our local presence in Norwich & Willimantic by 10x, setting us up for 3x digital sales. We went from nobody knowing us to the #1 spot in our local market — in 60 days."
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF4D40]" />
                <span className="text-[12px] font-bold text-white/35">
                  Franchise Manager · Krispy Krunchy Chicken · Norwich & Willimantic, CT
                </span>
                <span className="ml-auto text-[13px] text-[#FF4D40]">★★★★★</span>
              </div>
            </div>
            <div className="rounded-[16px] bg-[#160A08] px-6 py-7">
              <p className="mb-4 text-[15px] font-medium italic leading-[1.75] text-white/75">
                "We went from losing repeat customers every week to a full loyalty system running and more people coming back consistently. The difference was clear within 60 days."
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF4D40]" />
                <span className="text-[12px] font-bold text-white/35">Owner · Norwich Pharmacy · Norwich, CT</span>
                <span className="ml-auto text-[13px] text-[#FF4D40]">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#160A08] px-7 py-[88px]" id="system">
        <div className="mx-auto max-w-[700px]">
          <span className="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FF4D40]">
            The System
          </span>
          <h2 className="mb-3 text-[clamp(32px,8vw,60px)] font-black leading-[0.93] tracking-[-0.03em] text-white">
            The 60-Day
            <br />
            <em className="italic text-[#FF4D40]">Local Growth Program</em>
          </h2>
          <p className="mb-11 max-w-[500px] text-[15px] leading-[1.7] text-white/45">
            Not an agency retainer. A <strong className="text-white">plug-and-play growth system</strong> — AI-customized for your business type, market, and biggest problem. Built for franchise operators and standalone local businesses. Year-long program. Results in 60 days.
          </p>
          <div className="mb-8 flex overflow-hidden rounded-[12px] border border-white/10">
            {[
              { n: "1", lbl: "Apply\nto Join", sub: "2 min form" },
              { n: "2", lbl: "We Build\nYour System", sub: "AI-scoped" },
              { n: "3", lbl: "Launch\n& Grow", sub: "Done for you" },
              { n: "4", lbl: "See Results\nor Free*", sub: "60-day min" },
            ].map((step, idx) => (
              <div
                key={step.n}
                className={cx(
                  "flex-1 border-white/10 px-3 py-6 text-center",
                  idx !== 3 && "border-r"
                )}
              >
                <div className="mx-auto mb-2 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#E8271A] text-[14px] font-black text-white">
                  {step.n}
                </div>
                <div className="text-[11px] font-bold leading-[1.4] text-white/60">
                  {step.lbl.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
                <div className="mt-1 text-[9px] font-semibold text-white/20">{step.sub}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {[
              {
                icon: "📍",
                title: "Local Market Domination",
                desc: "Google Business + Maps optimization and local SEO — so your location shows up first when someone searches nearby.",
              },
              {
                icon: "🎬",
                title: "StoryAds Content Engine",
                desc: "Weekly story-driven content that stops the scroll and converts views into walk-ins — not just impressions.",
              },
              {
                icon: "🎯",
                title: "Hyperlocal Ad Campaigns",
                desc: "Meta + Google ads targeting buyers within miles of your door — people who are nearby and ready to visit.",
              },
              {
                icon: "💳",
                title: "Loyalty & Retention System",
                desc: "Powered by FastnFresh — a branded app that turns one-time visitors into regulars, automatically.",
              },
              {
                icon: "📊",
                title: "Weekly Performance Reports",
                desc: "Plain-English reporting every week — what moved, what changed, what's next. No dashboards to decode.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex gap-4 rounded-[12px] border border-white/10 bg-white/5 px-5 py-5 text-white transition-all hover:border-[rgba(209,26,16,0.3)] hover:bg-[rgba(209,26,16,0.1)]"
              >
                <div className="text-[28px]">{card.icon}</div>
                <div>
                  <div className="mb-1 text-[16px] font-black text-white">{card.title}</div>
                  <div className="text-[13px] leading-[1.6] text-white/40">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#E8271A] bg-[#FFF0EF] px-7 py-[52px]">
        <div className="mx-auto flex max-w-[700px] flex-col gap-6 sm:flex-row">
          <div className="text-[56px]">🛡️</div>
          <div>
            <h3 className="mb-4 text-[clamp(36px,9vw,68px)] font-black leading-[0.93] tracking-[-0.03em] text-[#0F0908]">
              The 60-Day
              <br />
              <em className="italic text-[#E8271A]">Growth Promise</em>
            </h3>
            <p className="text-[15px] leading-[1.7] text-[#4B5563]">
              We agree on specific, measurable targets before day one. <strong className="text-[#0F0908]">If you don't see real growth within 60 days, we keep working at no extra charge until you do.</strong> Not a legal contract — a personal promise kept with every client.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF8F8] px-7 py-[88px]" id="join">
        <div className="mx-auto max-w-[700px]">
          <span className="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FF4D40]">
            Your Growth Journey
          </span>
          <h2 className="mb-5 text-[clamp(28px,6.5vw,48px)] font-black leading-[0.95] tracking-[-0.025em]">
            Choose
            <br />
            <em className="italic text-[#E8271A]">Your Phase</em>
          </h2>
          <p className="mb-8 text-[14px] leading-[1.65] text-[#9CA3AF]">
            Each phase builds on the last. Start with 60 days to see real results — then compound into local dominance over 6 months and a full year.
          </p>
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[16px] border border-[#F0E4E4] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(209,26,16,0.1)]">
              <div className="border-b border-[#F0E4E4] px-6 pb-4 pt-6">
                <div className="mb-3 inline-block rounded-full border border-[#E8271A]/30 px-5 py-2 text-[14px] font-black uppercase tracking-[0.12em] text-[#E8271A]">
                  Phase 1
                </div>
                <div className="mb-2 text-[clamp(30px,7vw,44px)] font-black leading-none tracking-[-0.025em]">
                  🚀 60-DAY GROWTH (Starter)
                </div>
                <div className="text-[13px] leading-[1.5] text-[#9CA3AF]">
                  For local operators ready to see real results fast. First 60 days — measurable growth or we keep working free.
                </div>
              </div>
              <div className="flex items-end gap-1 border-b border-[#F0E4E4] px-6 py-4">
                <span className="mt-1 text-[18px] font-black">$</span>
                <span className="text-[54px] font-black leading-none tracking-[-0.04em]">1,500</span>
                <span className="mb-1 text-[13px] font-semibold text-[#9CA3AF]">/mo</span>
                <span className="mb-1 ml-1 text-[13px] font-semibold text-[#9CA3AF]">· 60-day min</span>
              </div>
              <ul className="flex flex-col gap-2 border-b border-[#F0E4E4] px-6 py-4 text-[13.5px] font-semibold text-[#1F2937]">
                {[
                  "Local market audit + opportunity map",
                  "Google Business + Maps optimization",
                  "8 story-driven posts/month",
                  "1 hyperlocal ad campaign",
                  "Customer loyalty system setup",
                  "Weekly performance report",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF0EF]">
                      <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#E8271A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4">
                <a
                  href="#join"
                  className="mb-2 block rounded-full bg-white px-4 py-3 text-center text-[12px] font-black uppercase tracking-[0.07em] text-[#E8271A] transition-colors hover:bg-[#FFF8F8]"
                >
                  Get Your 60-Day Growth Plan →
                </a>
                <p className="text-center text-[11px] text-[#9CA3AF]">
                  We review every application & confirm fit.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-dashed border-[#F59E0B] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(245,158,11,0.12)]">
              <div className="border-b border-[#F0E4E4] px-6 pb-4 pt-6">
                <div className="mb-3 inline-block rounded-full border border-[#F59E0B]/30 px-5 py-2 text-[14px] font-black uppercase tracking-[0.12em] text-[#F59E0B]">
                  One-Time
                </div>
                <div className="mb-2 text-[clamp(30px,7vw,44px)] font-black leading-none tracking-[-0.025em]">
                  🔥 KICKOFF CAMPAIGN
                </div>
                <div className="text-[13px] leading-[1.5] text-[#9CA3AF]">
                  New location opening or need a fast launchpad? One-time full-blast campaign — no monthly commitment.
                </div>
              </div>
              <div className="flex items-end gap-1 border-b border-[#F0E4E4] px-6 py-4">
                <span className="mt-1 text-[18px] font-black">$</span>
                <span className="text-[54px] font-black leading-none tracking-[-0.04em]">5,000</span>
                <span className="mb-1 text-[15px] font-extrabold text-[#F59E0B]">one-time</span>
              </div>
              <ul className="flex flex-col gap-2 border-b border-[#F0E4E4] px-6 py-4 text-[13.5px] font-semibold text-[#1F2937]">
                {[
                  "Full local brand setup & Google presence",
                  "30-day Meta + Google launch campaign",
                  "Social media presence built from scratch",
                  "Opening week content package (10 posts)",
                  "Loyalty system setup & first campaign",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF0EF]">
                      <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#E8271A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4">
                <a
                  href="#join"
                  className="mb-2 block rounded-full bg-white px-4 py-3 text-center text-[12px] font-black uppercase tracking-[0.07em] text-[#E8271A] transition-colors hover:bg-[#FFF8F8]"
                >
                  Get the Kickoff Campaign →
                </a>
                <p className="text-center text-[11px] text-[#9CA3AF]">
                  No monthly commitment. Perfect for new location launches.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border-2 border-[#E8271A] bg-[#160A08] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(209,26,16,0.3)]">
              <div className="border-b border-white/10 px-6 pb-4 pt-6">
                <div className="mb-2 inline-block rounded-full bg-[#E8271A] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
                  ⭐ Most Popular
                </div>
                <div className="mb-3 inline-block rounded-full border border-[#FF4D40]/30 px-5 py-2 text-[14px] font-black uppercase tracking-[0.12em] text-[#FF4D40]">
                  Phase 2
                </div>
                <div className="mb-2 text-[clamp(30px,7vw,44px)] font-black leading-none tracking-[-0.025em] text-white">
                  📍 LOCAL DOMINATION
                </div>
                <div className="text-[13px] leading-[1.5] text-white/40">
                  6-month program. Own your local market — rank #1, fill your location, and make competitors irrelevant.
                </div>
              </div>
              <div className="flex items-end gap-1 border-b border-white/10 px-6 py-4">
                <span className="mt-1 text-[18px] font-black text-white">$</span>
                <span className="text-[54px] font-black leading-none tracking-[-0.04em] text-white">2,750</span>
                <span className="mb-1 text-[13px] font-semibold text-white/30">/mo</span>
                <span className="mb-1 ml-1 text-[13px] font-semibold text-white/30">· 6-month program</span>
              </div>
              <ul className="flex flex-col gap-2 border-b border-white/10 px-6 py-4 text-[13.5px] font-semibold text-white/75">
                {[
                  "Everything in Phase 1",
                  "16 posts + Reels/month",
                  "Full Meta + Google ad management",
                  "Geo-fencing + proximity marketing",
                  "Full loyalty + automated win-back",
                  "Bi-weekly strategy call",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D11A10]/35">
                      <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#FF4D40"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4">
                <a
                  href="#join"
                  className="mb-2 block rounded-full bg-white px-4 py-3 text-center text-[12px] font-black uppercase tracking-[0.07em] text-[#E8271A] transition-colors hover:bg-[#FFF8F8]"
                >
                  Get Your 60-Day Growth Plan →
                </a>
                <p className="text-center text-[11px] text-white/30">
                  Includes 60-Day Growth Promise · Limited spots/month
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-[#F0E4E4] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(209,26,16,0.1)]">
              <div className="border-b border-[#F0E4E4] px-6 pb-4 pt-6">
                <div className="mb-3 inline-block rounded-full border border-[#E8271A]/30 px-5 py-2 text-[14px] font-black uppercase tracking-[0.12em] text-[#E8271A]">
                  Phase 3
                </div>
                <div className="mb-2 text-[clamp(30px,7vw,44px)] font-black leading-none tracking-[-0.025em]">
                  🏆 1-YEAR PLAN
                </div>
                <div className="text-[13px] leading-[1.5] text-[#9CA3AF]">
                  Full-year program after 6 months. Multi-location growth, regional dominance, and a system that runs itself.
                </div>
              </div>
              <div className="flex items-end gap-1 border-b border-[#F0E4E4] px-6 py-4">
                <span className="mt-1 text-[18px] font-black">$</span>
                <span className="text-[54px] font-black leading-none tracking-[-0.04em]">5,000</span>
                <span className="mb-1 text-[13px] font-semibold text-[#9CA3AF]">/mo</span>
                <span className="mb-1 ml-1 text-[13px] font-semibold text-[#9CA3AF]">· after Phase 2</span>
              </div>
              <ul className="flex flex-col gap-2 border-b border-[#F0E4E4] px-6 py-4 text-[13.5px] font-semibold text-[#1F2937]">
                {[
                  "Everything in Phase 2",
                  "Up to 4 locations managed",
                  "Regional growth playbook",
                  "Centralized loyalty across all locations",
                  "Dedicated account manager + weekly call",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF0EF]">
                      <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#E8271A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4">
                <a
                  href="#join"
                  className="mb-2 block rounded-full bg-white px-4 py-3 text-center text-[12px] font-black uppercase tracking-[0.07em] text-[#E8271A] transition-colors hover:bg-[#FFF8F8]"
                >
                  Get Your 60-Day Growth Plan →
                </a>
                <p className="text-center text-[11px] text-[#9CA3AF]">Unlocked after completing Phase 2.</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#F0E4E4] bg-[#FFF8F8]">
              <div className="flex flex-wrap items-center gap-4 px-6 py-5">
                <div className="text-[28px]">🏢</div>
                <div>
                  <div className="mb-1 text-[17px] font-black tracking-[-0.01em] text-[#0F0908]">
                    Multi-Location or Franchises
                  </div>
                  <div className="max-w-[300px] text-[12px] leading-[1.5] text-[#9CA3AF]">
                    Running 2+ locations or a franchise network? We scope a custom plan around your number of locations, markets, and goals.
                  </div>
                </div>
                <a
                  href="#join"
                  className="ml-auto rounded-full bg-[#0F0908] px-5 py-[10px] text-[11px] font-black uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#E8271A]"
                >
                  Get Custom Pricing →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-7 py-[88px]" id="faq">
        <div className="mx-auto max-w-[700px]">
          <span className="mb-3 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FF4D40]">
            Questions
          </span>
          <h2 className="mb-8 text-[clamp(28px,6.5vw,48px)] font-black leading-[0.95] tracking-[-0.025em]">
            Everything you
            <br />
            <em className="italic text-[#E8271A]">need to know.</em>
          </h2>
          <div className="overflow-hidden rounded-[16px] border border-[#F0E4E4]">
            {faqItems.map((item, idx) => (
              <div key={item.q} className="border-b border-[#F0E4E4] last:border-b-0">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-[14px] font-bold text-[#0F0908] transition-colors hover:bg-[#FFF8F8]"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  type="button"
                >
                  {item.q}
                  <span
                    className={cx(
                      "ml-3 text-[20px] font-black text-[#E8271A] transition-transform",
                      openFaq === idx && "rotate-45"
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={cx(
                    "max-h-0 overflow-hidden transition-[max-height] duration-300",
                    openFaq === idx && "max-h-[300px]"
                  )}
                >
                  <div className="px-6 pb-4 text-[13.5px] leading-[1.75] text-[#9CA3AF]">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#160A08] px-7 py-[96px]">
        <div
          className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[600px] w-[800px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(209,26,16,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[560px] text-center">
          <span className="mb-4 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/35">
            Limited to 3 New Businesses Per Month
          </span>
          <h2 className="mb-4 text-[clamp(32px,9vw,64px)] font-black leading-[0.93] tracking-[-0.03em] text-white">
            Dominate Your Local Market,
            <br />
            <span className="rounded-[7px] bg-[#E8271A] px-[14px] py-[2px] italic text-white">Like The Big-Chains.</span>
          </h2>
          <p className="mb-9 text-[15px] leading-[1.65] text-white/45">
            Tell us about your business and your biggest problem. We'll build your custom plan and reach out within 24 hours.
          </p>
          <div className="rounded-[18px] border border-white/10 bg-white/5 px-7 py-8 text-left">
            <div className="mb-1 text-[17px] font-black text-white">Apply to Join the 60-Day Program</div>
            <div className="mb-6 text-[12px] leading-[1.5] text-white/35">
              Takes 2 minutes. We review every application personally.
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[14px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Your name" />
                <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[14px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Phone number" />
              </div>
              <input className="w-full rounded-[10px] border border-white/10 bg-white/10 px-4 py-[14px] text-[14px] font-semibold text-white placeholder:text-white/25 focus:border-[#E8271A]/60 focus:outline-none" placeholder="Business name & city" />
              <select
                className="w-full appearance-none rounded-[10px] border border-white/10 bg-white/10 px-4 py-[14px] text-[14px] font-semibold text-white/45 focus:border-[#E8271A]/60 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Business type
                </option>
                <option>Franchise Operator (1 location)</option>
                <option>Franchise Operator (2+ locations)</option>
                <option>Independent Local Business</option>
                <option>Restaurant / Food & Beverage</option>
                <option>Retail / Service</option>
                <option>Other</option>
              </select>
              <select
                className="w-full appearance-none rounded-[10px] border border-white/10 bg-white/10 px-4 py-[14px] text-[14px] font-semibold text-white/45 focus:border-[#E8271A]/60 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Current annual revenue
                </option>
                <option>$100K – $1M</option>
                <option>$1M – $5M</option>
                <option>$5M+</option>
                <option>Franchise (multiple locations)</option>
              </select>
              <select
                className="w-full appearance-none rounded-[10px] border border-white/10 bg-white/10 px-4 py-[14px] text-[14px] font-semibold text-white/45 focus:border-[#E8271A]/60 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Biggest problem right now
                </option>
                <option>Losing customers to nearby competitors</option>
                <option>Not showing up on Google / Maps</option>
                <option>Ads not driving local foot traffic</option>
                <option>Customers don't come back</option>
                <option>Low foot traffic</option>
                <option>Launching a new location</option>
                <option>Underperforming franchise location</option>
              </select>
              <button
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#E8271A] px-5 py-[17px] text-[14px] font-black uppercase tracking-[0.06em] text-white shadow-[0_6px_28px_rgba(209,26,16,0.25)] transition-all hover:bg-[#D11A10] hover:shadow-[0_10px_36px_rgba(209,26,16,0.45)]"
                type="button"
              >
                Get Your 60-Day Growth Plan →
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-white/20">
              <a
                href="#faq"
                className="text-[#E8271A]/80 underline decoration-dashed underline-offset-[3px]"
              >
                *See how the 60-Day Growth Promise works
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0F0908] px-7 pb-7 pt-11">
        <div className="mx-auto mb-7 flex max-w-[700px] flex-wrap justify-between gap-8">
          <div>
            <div className="mb-1 text-[18px] font-black tracking-[-0.03em] text-white">
              Local<span className="text-[#FF4D40]">Big</span>
            </div>
            <div className="max-w-[200px] text-[11px] leading-[1.5] text-white/25">
              The 60-Day Local Growth Program for Franchise Operators & Local Businesses.
            </div>
          </div>
          <div>
            <label className="mb-3 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/25">
              Quick Links
            </label>
            <div className="flex flex-col gap-2">
              <a className="text-[12px] font-semibold text-white/35 transition-colors hover:text-white/80" href="#">
                Case Studies
              </a>
              <a className="text-[12px] font-semibold text-white/35 transition-colors hover:text-white/80" href="#">
                Pricing
              </a>
              <a className="text-[12px] font-semibold text-white/35 transition-colors hover:text-white/80" href="#join">
                Join the Program
              </a>
            </div>
          </div>
          <div>
            <label className="mb-3 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/25">
              Contact
            </label>
            <div className="flex flex-col gap-2">
              <a className="text-[12px] font-semibold text-white/35 transition-colors hover:text-white/80" href="mailto:hello@localbig.com">
                hello@localbig.com
              </a>
              <a className="text-[12px] font-semibold text-white/35 transition-colors hover:text-white/80" href="#join">
                Apply Now
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[700px] flex-wrap justify-between gap-2 border-t border-white/10 pt-5">
          <span className="text-[11px] text-white/20">© 2025 LocalBig. All rights reserved.</span>
          <span className="text-[11px] text-white/20">Norwich · Willimantic · Mystic · Niantic, CT</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        #heroInner > * { animation: fadeUp 0.55s ease both; }
        #heroInner > *:nth-child(1) { animation-delay: 0s; }
        #heroInner > *:nth-child(2) { animation-delay: 0.07s; }
        #heroInner > *:nth-child(3) { animation-delay: 0.13s; }
        #heroInner > *:nth-child(4) { animation-delay: 0.18s; }
        #heroInner > *:nth-child(5) { animation-delay: 0.23s; }
        #heroInner > *:nth-child(6) { animation-delay: 0.28s; }
        #heroInner > *:nth-child(7) { animation-delay: 0.33s; }
      `}</style>
    </div>
  );
}
