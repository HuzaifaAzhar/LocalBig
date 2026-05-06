'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

// ─── Types ───────────────────────────────────────────────────────────────────
type Audience = 'franchise' | 'independent';
type PainKey = 'launch' | 'foottraffic' | 'views' | 'ads' | 'churn';

// ─── SVG Check Icon ───────────────────────────────────────────────────────────
function CheckIcon({ color = '#E8271A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 12 12" className="w-[10px] h-[10px]">
      <path d="M2 6l3 3 5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Blinking Dot ─────────────────────────────────────────────────────────────
function BlinkDot({ color = '#4ADE80', size = 8 }: { color?: string; size?: number }) {
  return (
    <span
      className="rounded-full flex-shrink-0 inline-block"
      style={{
        width: size,
        height: size,
        background: color,
        animation: 'blink 1.4s ease infinite',
      }}
    />
  );
}

// ─── Mock Browser Content (Before state) ─────────────────────────────────────
function MockBrowser({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-3.5 h-full" style={{ background: '#0F0B1A' }}>
      <div
        className="rounded flex items-center gap-1.5 p-1.5 mb-2 flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>
        <div
          className="flex-1 rounded h-[9px] ml-1.5"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <div
          className="flex flex-col gap-1.5"
          style={{ animation: 'scroll 9s linear infinite' }}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

function BMRow({ w = '80%', accent = false, img = false }: { w?: string; accent?: boolean; img?: boolean }) {
  if (img) return <div className="rounded h-9" style={{ background: 'rgba(255,255,255,0.04)' }} />;
  return (
    <div
      className="rounded h-1.5"
      style={{
        width: w,
        background: accent ? 'rgba(209,26,16,0.2)' : 'rgba(255,255,255,0.05)',
      }}
    />
  );
}

function BMBadge({ label }: { label: string }) {
  return (
    <span
      className="text-[8px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded inline-block mb-1"
      style={{
        color: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {label}
    </span>
  );
}

function BMMap({ pins }: { pins: number[] }) {
  return (
    <div className="rounded p-1.5 mb-1" style={{ background: 'rgba(255,255,255,0.03)' }}>
      {pins.map((opacity, i) => (
        <div key={i} className="flex items-center gap-1 mb-1">
          <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)', opacity }} />
          <div className="h-[5px] rounded flex-1" style={{ background: 'rgba(255,255,255,0.06)', opacity }} />
        </div>
      ))}
    </div>
  );
}

// ─── After Panel ──────────────────────────────────────────────────────────────
function AfterPanel({
  gradient,
  wm,
  label,
  title,
}: {
  gradient: string;
  wm: string;
  label: string;
  title: string;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center relative cursor-pointer overflow-hidden" style={{ background: gradient }}>
      <span
        className="absolute font-black italic select-none pointer-events-none"
        style={{ fontSize: 'clamp(70px,20vw,150px)', color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em' }}
      >
        {wm}
      </span>
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
        style={{ background: 'linear-gradient(to top, rgba(10,8,18,.92), transparent)' }}>
        <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: '#FF4D40' }}>{label}</div>
        <div className="font-black leading-none" style={{ fontSize: 'clamp(16px,4vw,24px)', color: '#fff' }}>{title}</div>
      </div>
    </div>
  );
}

function CaseStudyVideo({
  src,
  wm,
  label,
  title,
}: {
  src: string;
  wm: string;
  label: string;
  title: string;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <span
        className="absolute font-black italic select-none pointer-events-none"
        style={{ fontSize: 'clamp(70px,20vw,150px)', color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.05em' }}
      >
        {wm}
      </span>
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
        style={{ background: 'linear-gradient(to top, rgba(10,8,18,.9), rgba(10,8,18,.15), transparent)' }}
      >
        <div className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: '#FF4D40' }}>{label}</div>
        <div className="font-black leading-none" style={{ fontSize: 'clamp(16px,4vw,24px)', color: '#fff' }}>{title}</div>
      </div>
    </div>
  );
}

// ─── Plan Result Cards ────────────────────────────────────────────────────────
function PlanCard({
  icon, name, price, priceSuffix, desc, badge, selected, onClick,
}: {
  icon: string; name: string; price: string; priceSuffix: string; desc: string;
  badge?: string; selected: boolean; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-xl p-5 cursor-pointer transition-all duration-200 text-left"
      style={{
        background: selected ? '#E8271A' : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${selected ? '#E8271A' : 'rgba(255,255,255,0.1)'}`,
      }}
    >
      {badge && (
        <div
          className="absolute top-0 right-0 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1"
          style={{
            background: selected ? 'rgba(0,0,0,0.25)' : '#E8271A',
            borderRadius: '0 14px 0 10px',
          }}
        >
          {badge}
        </div>
      )}
      <div className="text-[28px] mb-2">{icon}</div>
      <div className="text-[15px] font-black text-white mb-1">{name}</div>
      <div className="font-black leading-none mb-2" style={{ fontSize: 22, color: '#FF4D40' }}>
        {price}<span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{priceSuffix}</span>
      </div>
      <div className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</div>
    </div>
  );
}

// ─── Pain Answer Block ────────────────────────────────────────────────────────
function PainAnswer({
  visible, icon, title, body, formId, btnLabel, plans,
}: {
  visible: boolean; icon: string; title: string; body: string;
  formId: PainKey; btnLabel: string;
  plans: { icon: string; name: string; price: string; priceSuffix: string; desc: string; badge?: string; planKey: string }[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <div
      className="border-t px-6 py-7"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderColor: 'rgba(255,255,255,0.07)',
        animation: 'fadeUp 0.3s ease',
      }}
    >
      <div className="text-[40px] text-center mb-2.5">{icon}</div>
      <div className="text-[20px] font-black text-white text-center mb-2 tracking-tight">{title}</div>
      <p className="text-[14px] text-center leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>{body}</p>

      {!submitted ? (
        <div>
          <div className="flex flex-col gap-2.5 mb-3">
            <div className="grid grid-cols-2 gap-2.5">
              <input className="pain-input" type="text" placeholder="Business name" />
              <input className="pain-input" type="text" placeholder="Your name" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <input className="pain-input" type="email" placeholder="Email address" />
              <input className="pain-input" type="tel" placeholder="Phone number" />
            </div>
            <input className="pain-input" type="text" placeholder="Business address / city" />
          </div>
          <button
            onClick={() => setSubmitted(true)}
            className="w-full flex items-center justify-center font-black text-[14px] tracking-widest uppercase text-white py-4 rounded-full transition-all duration-150"
            style={{ background: '#E8271A', letterSpacing: '0.06em' }}
          >
            {btnLabel}
          </button>
          <p className="text-[10px] text-center mt-2.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
            We review every application within 24 hours.
          </p>
        </div>
      ) : (
        <div style={{ animation: 'fadeUp 0.35s ease' }}>
          <div className="text-[14px] font-black text-center mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Based on your situation, we recommend:
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {plans.map((p) => (
              <PlanCard
                key={p.planKey}
                {...p}
                selected={selectedPlan === p.planKey}
                onClick={() => setSelectedPlan(p.planKey)}
              />
            ))}
          </div>
          <a
            href="#join"
            className="flex items-center justify-center font-black text-[13px] tracking-widest uppercase py-3.5 rounded-full transition-all duration-150"
            style={{ background: '#fff', color: '#D11A10' }}
          >
            Apply for Your Chosen Plan →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────
function PricingCard({
  dark = false, featured = false, dashed = false, children,
}: {
  dark?: boolean; featured?: boolean; dashed?: boolean; children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: featured
          ? '2px solid #E8271A'
          : dashed
          ? '1.5px dashed #F59E0B'
          : '1px solid #F0E4E4',
        background: dark ? '#160A08' : featured ? '#160A08' : '#fff',
      }}
    >
      {children}
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#F0E4E4' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-[22px] py-[18px] text-left flex justify-between items-center text-[14px] font-bold transition-all duration-150 hover:bg-[#FFF8F8]"
        style={{ color: '#0F0908' }}
      >
        {q}
        <span
          className="text-[20px] ml-3 flex-shrink-0 font-black transition-transform duration-200"
          style={{
            color: '#E8271A',
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
          }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '300px' : 0 }}
      >
        <div className="px-[22px] pb-[18px] text-[13.5px] leading-7" style={{ color: '#9CA3AF' }}>
          {a}
        </div>
      </div>
    </div>
  );
}

// ─── Before/After Toggle ──────────────────────────────────────────────────────
function BAToggle({
  beforeContent, afterContent, afterLabel = 'After 60 Days',
}: {
  beforeContent: React.ReactNode; afterContent: React.ReactNode; afterLabel?: string;
}) {
  const [panel, setPanel] = useState<'after'>('after');
  return (
    <div style={{ borderTop: '1px solid #F0E4E4' }}>
      <div className="flex">
        <button
          onClick={() => setPanel('before' as any)}
          className="flex-1 py-3 text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-150"
          style={{
            borderRight: '1px solid #F0E4E4',
            background: (panel as string) === 'before' ? '#FFF8F8' : 'transparent',
            color: (panel as string) === 'before' ? '#0F0908' : '#9CA3AF',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: (panel as string) === 'before' ? '#9CA3AF' : '#F0E4E4' }} />
          Before
        </button>
        <button
          onClick={() => setPanel('after' as any)}
          className="flex-1 py-3 text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-150"
          style={{
            background: (panel as string) === 'after' ? '#E8271A' : 'transparent',
            color: (panel as string) === 'after' ? '#fff' : '#9CA3AF',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: (panel as string) === 'after' ? 'rgba(255,255,255,0.6)' : '#F0E4E4' }} />
          {afterLabel}
        </button>
      </div>
      <div className="aspect-square overflow-hidden relative">
        {(panel as string) === 'before' ? beforeContent : afterContent}
      </div>
    </div>
  );
}

// ─── Wide Before/After Toggle ─────────────────────────────────────────────────
function CWToggle({ beforeContent, afterContent }: { beforeContent: React.ReactNode; afterContent: React.ReactNode }) {
  const [panel, setPanel] = useState<'before' | 'after'>('before');
  return (
    <div style={{ borderTop: '1px solid #F0E4E4' }}>
      <div className="flex">
        <button
          onClick={() => setPanel('before')}
          className="flex-1 py-3 text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-150"
          style={{
            borderRight: '1px solid #F0E4E4',
            background: panel === 'before' ? '#FFF8F8' : 'transparent',
            color: panel === 'before' ? '#0F0908' : '#9CA3AF',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: panel === 'before' ? '#9CA3AF' : '#F0E4E4' }} />
          Before
        </button>
        <button
          onClick={() => setPanel('after')}
          className="flex-1 py-3 text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-150"
          style={{
            background: panel === 'after' ? '#E8271A' : 'transparent',
            color: panel === 'after' ? '#fff' : '#9CA3AF',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: panel === 'after' ? 'rgba(255,255,255,0.6)' : '#F0E4E4' }} />
          After 60 Days
        </button>
      </div>
      <div className="aspect-square overflow-hidden relative">
        {panel === 'before' ? beforeContent : afterContent}
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function LocalBigPage() {
  const [audience, setAudienceState] = useState<Audience>('franchise');
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePain, setActivePain] = useState<PainKey | null>(null);
  const [showMoreCases, setShowMoreCases] = useState(false);
  const [adUnlocked, setAdUnlocked] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('lb_audience'); } catch {}
    if (saved) {
      setAudienceState(saved as Audience);
    } else {
      setTimeout(() => setShowPopup(true), 800);
    }
  }, []);

  function setAudience(type: Audience) {
    setAudienceState(type);
    setShowPopup(false);
    try { localStorage.setItem('lb_audience', type); } catch {}
  }

  const isFranchise = audience === 'franchise';

  // ── Pain widget data ───────────────────────────────────────────────────────
  const painPlans: Record<PainKey, { icon: string; name: string; price: string; priceSuffix: string; desc: string; badge?: string; planKey: string }[]> = {
    launch: [
      { icon: '📍', name: '60-Day Growth Plan', price: '$1,500', priceSuffix: '/mo', desc: 'Full launch playbook — Google, ads, content, loyalty. Results in 60 days.', badge: 'Recommended', planKey: '60day' },
      { icon: '🔥', name: 'Kickoff Campaign', price: '$5,000', priceSuffix: ' one-time', desc: 'One-time full launch blast — brand setup, Google, Meta ads, social. Done in 30 days.', planKey: 'kickoff' },
    ],
    foottraffic: [
      { icon: '🚀', name: '60-Day Local Growth Program', price: '$1,500', priceSuffix: '/mo', desc: 'Audit → Google → Ads → Results. Measurable foot traffic in 60 days or we keep working free.', badge: 'Start Here', planKey: '60day' },
      { icon: '📍', name: 'Local Domination', price: '$2,750', priceSuffix: '/mo', desc: 'Full market takeover — 16 posts/mo, geo-fencing, full Meta + Google, loyalty system.', planKey: 'domination' },
    ],
    views: [
      { icon: '📍', name: 'Local Domination', price: '$2,750', priceSuffix: '/mo', desc: 'Full StoryAds + geo-fencing + Meta + loyalty — turning views into a walk-in machine.', badge: 'Recommended', planKey: 'domination' },
      { icon: '🏆', name: '1-Year Plan', price: '$5,000', priceSuffix: '/mo', desc: 'Multi-location growth. Full regional playbook. Compound results over 12 months.', planKey: 'year' },
    ],
    ads: [
      { icon: '📍', name: 'Local Domination', price: '$2,750', priceSuffix: '/mo', desc: 'We rebuild your campaigns from scratch — hyperlocal targeting that actually drives foot traffic.', badge: 'Recommended', planKey: 'domination' },
      { icon: '🏆', name: '1-Year Plan', price: '$5,000', priceSuffix: '/mo', desc: 'Multi-location ad management + full regional growth system across all your markets.', planKey: 'year' },
    ],
    churn: [
      { icon: '📍', name: 'Local Domination', price: '$2,750', priceSuffix: '/mo', desc: 'Full loyalty system + automated win-back campaigns + Meta retargeting. Stop the bleed.', badge: 'Recommended', planKey: 'domination' },
      { icon: '🏆', name: '1-Year Plan', price: '$5,000', priceSuffix: '/mo', desc: 'Centralized loyalty across all locations + multi-market retention strategy.', planKey: 'year' },
    ],
  };

  const painAnswers: Record<PainKey, { icon: string; title: string; body: string; btnLabel: string }> = {
    launch: { icon: '🚀', title: 'Launching a New Location', body: 'We launched 2 Taza2Go locations simultaneously — zero to foot traffic in 30 days. Tell us about your launch and we\'ll build your custom plan.', btnLabel: 'Get My Launch Plan →' },
    foottraffic: { icon: '🚶', title: 'Getting No Foot Traffic', body: 'Krispy Krunchy went from invisible to #1 in 60 days. Tell us about your location and we\'ll map your fastest path to customers walking in.', btnLabel: 'Get My Foot Traffic Plan →' },
    views: { icon: '🎬', title: 'Getting Views But No Walk-Ins', body: "Views that don't convert are just noise. The StoryAds framework turns digital attention into real foot traffic. Tell us about your business.", btnLabel: 'Get My Growth Plan →' },
    ads: { icon: '💸', title: 'Losing Money on Ads', body: 'Bad ad targeting is expensive. Our hyperlocal campaigns target buyers within miles of your door — not the wrong zip code. Let\'s audit yours.', btnLabel: 'Fix My Ad Spend →' },
    churn: { icon: '😤', title: 'Losing Customers', body: 'Norwich Pharmacy stopped bleeding regulars with a loyalty system we built in 60 days. Tell us about your retention problem.', btnLabel: 'Fix My Retention →' },
  };

  // ── Competitor logos ───────────────────────────────────────────────────────
  const compLogos = [
    { src: 'https://logo.clearbit.com/mcdonalds.com', alt: "McDonald's" },
    { src: 'https://logo.clearbit.com/starbucks.com', alt: 'Starbucks' },
    { src: 'https://logo.clearbit.com/cvs.com', alt: 'CVS' },
    { src: 'https://logo.clearbit.com/walmart.com', alt: 'Walmart' },
    { src: 'https://logo.clearbit.com/subway.com', alt: 'Subway' },
  ];

  // ── Pricing features ───────────────────────────────────────────────────────
  const phase1Features = [
    'Local market audit + opportunity map',
    'Google Business + Maps optimization',
    '8 story-driven posts/month',
    '1 hyperlocal ad campaign',
    'Customer loyalty system setup',
    'Weekly performance report',
  ];
  const kickoffFeatures = [
    'Full local brand setup & Google presence',
    '30-day Meta + Google launch campaign',
    'Social media presence built from scratch',
    'Opening week content package (10 posts)',
    'Loyalty system setup & first campaign',
  ];
  const phase2Features = [
    'Everything in Phase 1',
    '16 posts + Reels/month',
    'Full Meta + Google ad management',
    'Geo-fencing + proximity marketing',
    'Full loyalty + automated win-back',
    'Bi-weekly strategy call',
  ];
  const phase3Features = [
    'Everything in Phase 2',
    'Up to 4 locations managed',
    'Regional growth playbook',
    'Centralized loyalty across all locations',
    'Dedicated account manager + weekly call',
  ];

  const faqItems = [
    { q: 'Who is this built for?', a: 'Franchise operators (single or multi-location), independent local business owners, and regional brands. Whether you\'re running a Krispy Krunchy franchise, a local pharmacy, or launching a new location — if local customers matter to your revenue, this is built for you.' },
    { q: 'What does the 60-Day Growth Promise mean?', a: "Before we start, we agree on specific measurable targets — foot traffic, visibility, repeat customers. If we don't hit them in 60 days, we keep running your program at no extra charge until we do. It's the commitment we make to every client before day one." },
    { q: 'What does "done for you" actually mean?', a: "You don't touch any of it. We handle your Google setup, run your ad campaigns, create your content, build your loyalty system, and send a plain-English report weekly. You run your business. We grow your customer base." },
    { q: 'How is it customized to my business?', a: 'Our system uses your business type, location, revenue stage, and biggest problem to build a custom growth plan. A franchise operator in Norwich gets a completely different setup than a pharmacy in Mystic. Same framework — built specifically for your market.' },
    { q: 'Can I cancel after 60 days?', a: 'Yes. The minimum is 60 days — that\'s what it takes to build real momentum. After that, month-to-month with no penalties. Most clients stay once they see the results compound.' },
    { q: 'Why only 3 new clients per month?', a: "Every client gets a properly built system — not a rushed template. Capping intake means your setup gets full attention from day one. If we're at capacity, we'll put you on the waitlist and reach out when a spot opens." },
  ];

  return (
    <>
      <Head>
        <title>LocalBig — #1 Local Growth Program for Franchise Owners & Local Businesses</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
          body{font-family:'Montserrat',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
          @keyframes blink{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(.7);}}
          @keyframes scroll{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
          @keyframes fadeOverlay{from{opacity:0;}to{opacity:1;}}
          @keyframes slideUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
          .pain-input{
            width:100%;
            background:rgba(255,255,255,0.07);
            border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;
            padding:13px 15px;
            color:#fff;
            font-size:14px;
            font-family:'Montserrat',sans-serif;
            font-weight:600;
            outline:none;
            transition:border-color .15s;
          }
          .pain-input::placeholder{color:rgba(255,255,255,0.25);}
          .pain-input:focus{border-color:rgba(209,26,16,0.55);}
          .lf-input{
            width:100%;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;
            padding:14px 16px;
            color:#fff;
            font-size:14px;
            font-family:'Montserrat',sans-serif;
            font-weight:600;
            outline:none;
            transition:border-color .15s;
          }
          .lf-input::placeholder{color:rgba(255,255,255,0.25);}
          .lf-input:focus{border-color:rgba(232,80,70,0.6);}
          .lf-select{
            width:100%;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.1);
            border-radius:10px;
            padding:14px 16px;
            color:rgba(255,255,255,0.45);
            font-size:14px;
            font-family:'Montserrat',sans-serif;
            font-weight:600;
            outline:none;
            appearance:none;
            cursor:pointer;
            transition:border-color .15s;
          }
          .lf-select option{background:#0F0B1A;color:#fff;}
          .hero-stagger > *{animation:fadeUp .55s ease both;}
          .hero-stagger > *:nth-child(1){animation-delay:.0s;}
          .hero-stagger > *:nth-child(2){animation-delay:.07s;}
          .hero-stagger > *:nth-child(3){animation-delay:.13s;}
          .hero-stagger > *:nth-child(4){animation-delay:.18s;}
          .hero-stagger > *:nth-child(5){animation-delay:.23s;}
          .hero-stagger > *:nth-child(6){animation-delay:.28s;}
          .hero-stagger > *:nth-child(7){animation-delay:.33s;}
          select option{background:#0F0B1A;color:#fff;}
        `}</style>
      </Head>

      <div style={{ fontFamily: "'Montserrat', sans-serif", color: '#0F0908', background: '#fff' }}>

        {/* ── AUDIENCE POPUP ───────────────────────────────────────────────── */}
        {showPopup && (
          <div
            className="fixed inset-0 flex items-center justify-center p-6 z-[1000]"
            style={{ background: 'rgba(10,8,18,.85)', backdropFilter: 'blur(8px)', animation: 'fadeOverlay .3s ease' }}
          >
            <div
              className="rounded-2xl p-11 max-w-[480px] w-full text-center"
              style={{
                background: '#160A08',
                border: '1px solid rgba(255,255,255,.1)',
                boxShadow: '0 32px 80px rgba(0,0,0,.6)',
                animation: 'slideUp .35s ease',
              }}
            >
              <div className="text-[18px] font-black tracking-tight text-white mb-7">
                Local<span style={{ color: '#FF4D40' }}>Big</span>
              </div>
              <div className="font-black text-white mb-2" style={{ fontSize: 'clamp(22px,5vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Are you a…
              </div>
              <div className="text-[14px] mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>
                We'll personalise your page based on your business type.
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { type: 'franchise' as Audience, icon: '🏢', title: 'Franchise Operator', sub: 'I operate 1 or more franchise locations' },
                  { type: 'independent' as Audience, icon: '🏪', title: 'Independent Business', sub: 'I run my own standalone local business' },
                ].map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => setAudience(opt.type)}
                    className="flex items-center gap-3.5 p-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      border: '1.5px solid rgba(255,255,255,.1)',
                      background: 'rgba(255,255,255,.04)',
                      color: '#fff',
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    <span className="text-[28px]">{opt.icon}</span>
                    <div>
                      <span className="text-[15px] font-black block">{opt.title}</span>
                      <span className="text-[12px] font-semibold block mt-0.5" style={{ opacity: 0.6 }}>{opt.sub}</span>
                    </div>
                    <span className="ml-auto text-[18px]" style={{ opacity: 0.4 }}>→</span>
                  </button>
                ))}
              </div>
              <span
                onClick={() => setAudience('franchise')}
                className="text-[11px] mt-5 cursor-pointer underline underline-offset-2 block transition-all duration-150 hover:opacity-50"
                style={{ color: 'rgba(255,255,255,.2)' }}
              >
                Skip — show me everything
              </span>
            </div>
          </div>
        )}

        {/* ── NAV ─────────────────────────────────────────────────────────── */}
        <nav
          className="sticky top-0 z-[99] px-7 border-b"
          style={{
            background: 'rgba(10,8,18,.95)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,.08)',
          }}
        >
          <div className="max-w-[700px] mx-auto h-[62px] flex items-center justify-between">
            <div className="text-[20px] font-black tracking-tight text-white" style={{ letterSpacing: '-0.03em' }}>
              Local<span style={{ color: '#FF4D40' }}>Big</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+1"
                className="text-white text-[11px] font-black tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-150"
                style={{ background: '#E8271A', letterSpacing: '0.07em' }}
              >
                ☎️ Book A Call
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col justify-center gap-[5px] w-9 h-9 p-1 rounded-lg transition-all duration-150"
                style={{ background: 'rgba(255,255,255,.07)' }}
                aria-label="Menu"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-[2.5px] rounded-sm transition-all duration-200"
                    style={{
                      background: '#FF4D40',
                      transform: menuOpen
                        ? i === 0 ? 'translateY(7px) rotate(45deg)'
                        : i === 1 ? 'scaleX(0)'
                        : 'translateY(-7px) rotate(-45deg)'
                        : 'none',
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
        </nav>

        {/* Nav Drawer */}
        <div
          className="fixed top-0 right-0 w-[260px] h-full z-[200] pt-20 px-6 pb-6 flex flex-col transition-all duration-300"
          style={{
            background: '#160A08',
            borderLeft: '1px solid rgba(255,255,255,.08)',
            right: menuOpen ? 0 : -280,
          }}
        >
          <div className="flex flex-col gap-1">
            {[
              { href: '#problems', label: 'Pain Points' },
              { href: '#cases', label: 'Case Studies' },
              { href: '#reviews', label: 'Reviews' },
              { href: '#system', label: 'The System' },
              { href: '#join', label: 'Pricing' },
              { href: '#faq', label: 'FAQ' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-bold px-4 py-3 rounded-xl transition-all duration-150"
                style={{ color: 'rgba(255,255,255,.55)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#join"
              onClick={() => setMenuOpen(false)}
              className="text-white text-[13px] font-black tracking-wider text-center mt-4 py-3 rounded-xl transition-all duration-150"
              style={{ background: '#E8271A' }}
            >
              Get Your 60-Day Growth Plan →
            </a>
          </div>
        </div>
        {menuOpen && (
          <div
            className="fixed inset-0 z-[199]"
            style={{ background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(3px)' }}
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* ── AUDIENCE SWITCHER BAR ────────────────────────────────────────── */}
        <div
          className="sticky px-7 border-b z-[98]"
          style={{ background: '#0F0908', borderColor: 'rgba(255,255,255,.08)', top: 62 }}
        >
          <div className="max-w-[700px] mx-auto flex items-center h-11 gap-0">
            <span
              className="text-[10px] font-bold tracking-widest uppercase mr-4 whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,.28)' }}
            >
              I am a:
            </span>
            <div className="flex gap-1">
              {[
                { type: 'independent' as Audience, label: '🏪 Local Business' },
                { type: 'franchise' as Audience, label: '🏢 Franchise Owner' },
              ].map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => setAudience(tab.type)}
                  className="px-4 py-1.5 rounded-full text-[12px] font-black tracking-wider whitespace-nowrap transition-all duration-150"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    background: audience === tab.type ? '#E8271A' : 'transparent',
                    color: audience === tab.type ? '#fff' : 'rgba(255,255,255,.4)',
                    border: `1px solid ${audience === tab.type ? '#E8271A' : 'transparent'}`,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section
          className="py-20 px-7 text-center relative overflow-hidden"
          style={{ background: '#160A08', color: '#fff' }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              top: -180, left: '50%', transform: 'translateX(-50%)',
              width: 700, height: 700,
              background: 'radial-gradient(circle,rgba(209,26,16,.18) 0%,transparent 70%)',
            }}
          />
          <div className="max-w-[620px] mx-auto relative hero-stagger">
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest mb-6"
              style={{
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)',
                color: 'rgba(255,255,255,.6)',
                letterSpacing: '0.06em',
              }}
            >
              <BlinkDot color="#FF4D40" />
              Limited Seats Available
            </div>

            {/* FRANCHISE HERO */}
            {isFranchise && (
              <>
                <h1
                  className="font-black text-white mb-11"
                  style={{ fontSize: 'clamp(36px,10vw,78px)', lineHeight: 0.9, letterSpacing: '-0.035em' }}
                >
                  Same Brand.<br />
                  <span style={{ color: '#FF4D40' }}>Same National Ads.</span><br />
                  Your Local Location{' '}
                  <em
                    className="not-italic"
                    style={{
                      background: '#E8271A', color: '#fff',
                      padding: '3px 14px 3px 8px', borderRadius: 7, fontStyle: 'italic', display: 'inline',
                    }}
                  >
                    Deserves Better.
                  </em>
                </h1>
                <p
                  className="font-bold mb-7"
                  style={{ fontSize: 'clamp(18px,4.5vw,28px)', color: 'rgba(255,255,255,.65)', lineHeight: 1.3 }}
                >
                  Localize Your Marketing.<br />
                  <strong style={{ color: '#fff', fontWeight: 900 }}>Own Your Market.</strong>
                </p>
              </>
            )}

            {/* INDEPENDENT HERO */}
            {!isFranchise && (
              <>
                <h1
                  className="font-black text-white mb-11"
                  style={{ fontSize: 'clamp(40px,11vw,82px)', lineHeight: 0.9, letterSpacing: '-0.035em' }}
                >
                  <span style={{ color: '#FF4D40' }}>Stop Losing</span><br />
                  Your Local Customers<br />
                  <em
                    style={{
                      background: '#E8271A', color: '#fff',
                      padding: '3px 14px 3px 8px', borderRadius: 7, fontStyle: 'italic', display: 'inline',
                    }}
                  >
                    To Big-Chains.
                  </em>
                </h1>
                <p
                  className="font-black mb-4"
                  style={{ fontSize: 'clamp(17px,4vw,27px)', lineHeight: 1.2, letterSpacing: '-0.02em', color: '#fff' }}
                >
                  <span
                    style={{
                      background: '#E8271A', color: '#fff',
                      padding: '2px 10px', borderRadius: 5, display: 'inline',
                    }}
                  >
                    Get New Customers
                  </span>{' '}
                  in 60-Days,{' '}
                  <span style={{ color: 'rgba(255,255,255,.35)', fontWeight: 600 }}>
                    For Your Local Business*
                  </span>
                </p>
              </>
            )}

            {/* Competitor logos */}
            <div className="mt-6 mb-7 text-center">
              <span
                className="text-[9px] font-bold tracking-[0.16em] uppercase block mb-3"
                style={{ color: 'rgba(255,255,255,.25)' }}
              >
                The competition you&apos;re up against
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {compLogos.map((logo) => (
                  <div
                    key={logo.alt}
                    className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,.06)',
                      border: '1px solid rgba(255,255,255,.07)',
                      filter: 'grayscale(100%) brightness(1.6)',
                      opacity: 0.3,
                    }}
                  >
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3 mb-11">
              <a
                href="#join"
                className="inline-flex items-center gap-2.5 text-[13px] font-black tracking-wider uppercase text-white px-7 py-3.5 rounded-full transition-all duration-150"
                style={{
                  background: isFranchise ? '#fff' : '#E8271A',
                  color: isFranchise ? '#D11A10' : '#fff',
                  boxShadow: '0 6px 32px rgba(209,26,16,.25)',
                  letterSpacing: '0.05em',
                }}
              >
                {isFranchise ? 'Dominate Your Local Market in 60-Days →' : 'Get Your 60-Day Growth Plan →'}
              </a>
              <p className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,.35)' }}>
                <a href="#faq" style={{ color: 'rgba(255,255,255,.55)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  *See how our 60-Day Growth Promise works
                </a>
              </p>
            </div>

            {/* 85 Customers Ads Section */}
            <div className="mt-11 text-center">
              <div
                className="inline-flex items-center gap-1.5 text-white text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
                style={{ background: '#E8271A', letterSpacing: '0.12em' }}
              >
                🔥 Latest Achievement
              </div>
              <div
                className="font-black leading-[0.95] mb-7"
                style={{ fontSize: 'clamp(26px,7vw,52px)', letterSpacing: '-0.03em', color: '#fff' }}
              >
                85 New Customers<br />
                In <em style={{ fontStyle: 'italic', color: '#FF4D40' }}>3 Days</em> With These 2 Ads
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Ad 1 — visible */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,.08)', background: '#1F100C' }}
                >
                  <div
                    className="aspect-square flex items-center justify-center relative"
                    style={{ background: 'linear-gradient(145deg,#1a0800,#2a1000,#0a0812)' }}
                  >
                    <img
                      src="/Data/Ad1.jpg"
                      alt="Ad #1 creative"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: '#E8271A', letterSpacing: '0.12em' }}>
                      Ad #1
                    </div>
                    <div
                      className="absolute bottom-3 left-3 text-[11px] font-black"
                      style={{ color: 'rgba(255,255,255,.85)', textShadow: '0 2px 12px rgba(0,0,0,.55)' }}
                    >
                      Krispy Krunchy Campaign Creative
                    </div>
                  </div>
                  <div className="px-3.5 py-3 flex items-baseline gap-1.5">
                    <div className="font-bold text-[13px]" style={{ color: 'rgba(255,255,255,.7)' }}>
                      <span className="text-[22px] font-black" style={{ color: '#FF4D40', letterSpacing: '-0.02em' }}>42</span> customers
                    </div>
                    <div className="text-[11px] font-semibold ml-auto" style={{ color: 'rgba(255,255,255,.3)' }}>from this ad</div>
                  </div>
                </div>

                {/* Ad 2 — locked */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,.08)', background: '#1F100C' }}
                >
                  <div
                    className="aspect-square flex items-center justify-center relative"
                    style={{ background: 'linear-gradient(145deg,#1a0800,#2a1000,#0a0812)' }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ filter: adUnlocked ? 'none' : 'blur(10px)', pointerEvents: adUnlocked ? 'auto' : 'none' }}
                    >
                      <img
                        src="/Data/Ad2.jpg"
                        alt="Ad #2 creative"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: '#E8271A', letterSpacing: '0.12em' }}>
                        Ad #2
                      </div>
                      <div
                        className="absolute bottom-3 left-3 text-[11px] font-black"
                        style={{ color: 'rgba(255,255,255,.85)', textShadow: '0 2px 12px rgba(0,0,0,.55)' }}
                      >
                        Krispy Krunchy Campaign Creative
                      </div>
                    </div>
                    {!adUnlocked && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
                        style={{ background: 'rgba(10,8,18,.4)', backdropFilter: 'blur(6px)' }}
                      >
                        <button
                          onClick={() => setAdUnlocked(true)}
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-150 z-20"
                          style={{ background: '#E8271A', boxShadow: '0 6px 28px rgba(209,26,16,.5)' }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </button>
                        <div className="text-[10px] font-black tracking-widest uppercase text-white z-20" style={{ letterSpacing: '0.12em' }}>
                          Unlock to View Ad Setup
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-3.5 py-3 flex items-baseline gap-1.5">
                    <div className="font-bold text-[13px]" style={{ color: 'rgba(255,255,255,.7)' }}>
                      <span className="text-[22px] font-black" style={{ color: '#FF4D40', letterSpacing: '-0.02em' }}>43</span> customers
                    </div>
                    <div className="text-[11px] font-semibold ml-auto" style={{ color: 'rgba(255,255,255,.3)' }}>from this ad</div>
                  </div>
                </div>
              </div>

              <a
                href="#join"
                onClick={(e) => { e.preventDefault(); setAdUnlocked(true); }}
                className="inline-flex items-center gap-2 text-[13px] font-black tracking-wider px-6 py-3.5 rounded-full transition-all duration-200"
                style={{
                  background: adUnlocked ? 'rgba(16,185,129,.15)' : 'rgba(255,255,255,.06)',
                  border: `1px solid ${adUnlocked ? 'rgba(16,185,129,.4)' : 'rgba(255,255,255,.12)'}`,
                  color: '#fff',
                  letterSpacing: '0.05em',
                }}
              >
                {adUnlocked ? '✓ Ad Setup Unlocked — Apply to See Full Campaign' : '🔓 View Ad Setup Behind This Campaign'}
              </a>
              <div
                className="text-[11px] font-semibold mt-3 tracking-wider"
                style={{ color: 'rgba(255,255,255,.25)', letterSpacing: '0.04em' }}
              >
                85 new customers · 3 days · $0 organic reach
              </div>
            </div>
          </div>
        </section>

        {/* ── PROOF BAR ───────────────────────────────────────────────────── */}
        <div
          className="px-7 border-b"
          style={{ background: '#0F0908', borderColor: 'rgba(255,255,255,.08)' }}
        >
          <div className="max-w-[700px] mx-auto flex items-center justify-center flex-wrap py-1">
            {[
              { icon: '★★★★★', text: '4.9/5 Rating', stars: true },
              null,
              { text: 'Franchise & Local Operators' },
              null,
              { text: 'Results in 60 Days' },
              null,
              { text: '100% Done For You' },
            ].map((item, i) =>
              item === null ? (
                <div key={i} className="w-px h-5 mx-0" style={{ background: 'rgba(255,255,255,.1)' }} />
              ) : (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-bold"
                  style={{ color: 'rgba(255,255,255,.7)' }}
                >
                  {item.stars && <span style={{ color: '#FF4D40', letterSpacing: 1 }}>{item.icon}</span>}
                  {item.text}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── PROBLEMS / PAIN WIDGET ───────────────────────────────────────── */}
        <section id="problems" className="px-7 py-20" style={{ background: '#FFF8F8' }}>
          <div className="max-w-[700px] mx-auto">
            <span
              className="text-[22px] font-black tracking-widest uppercase block mb-3"
              style={{ color: '#FF4D40', letterSpacing: '0.08em' }}
            >
              Sound Like Your Business?
            </span>
            <h2
              className="font-black mb-11"
              style={{ fontSize: 'clamp(38px,10vw,72px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}
            >
              Where Do You Feel<br />
              <em style={{ fontStyle: 'italic', color: '#E8271A' }}>The Most Pain?</em>
            </h2>

            <div className="rounded-2xl overflow-hidden" style={{ background: '#160A08', border: '1px solid rgba(255,255,255,.08)' }}>
              <div
                className="text-[11px] font-black tracking-[0.18em] uppercase text-center pt-5 pb-0 px-6"
                style={{ color: 'rgba(255,255,255,.3)' }}
              >
                I am...
              </div>
              <div className="grid grid-cols-2 gap-0 p-3">
                {([
                  { key: 'launch' as PainKey, icon: '🚀', label: 'Launching a\nNew Location' },
                  { key: 'foottraffic' as PainKey, icon: '🚶', label: 'Getting No\nFoot Traffic' },
                  { key: 'views' as PainKey, icon: '🎬', label: 'Getting Views,\nBut No Walk-Ins' },
                  { key: 'ads' as PainKey, icon: '💸', label: 'Losing Money\non Ads' },
                ] as { key: PainKey; icon: string; label: string }[]).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActivePain(activePain === item.key ? null : item.key)}
                    className="flex flex-col items-center text-center m-1.5 py-5 px-4 rounded-xl transition-all duration-200 text-white"
                    style={{
                      background: activePain === item.key ? '#E8271A' : 'rgba(255,255,255,.04)',
                      border: `1px solid ${activePain === item.key ? '#E8271A' : 'rgba(255,255,255,.07)'}`,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    <div className="text-[48px] leading-none mb-3">{item.icon}</div>
                    <div
                      className="font-black leading-snug mb-2.5"
                      style={{ fontSize: 'clamp(14px,3.2vw,18px)', letterSpacing: '-0.01em', whiteSpace: 'pre-line' }}
                    >
                      {item.label}
                    </div>
                    <div className="text-[16px]" style={{ color: activePain === item.key ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.3)' }}>→</div>
                  </button>
                ))}
                {/* 5th item — full width */}
                <button
                  onClick={() => setActivePain(activePain === 'churn' ? null : 'churn')}
                  className="flex flex-col items-center text-center m-1.5 py-5 px-4 rounded-xl transition-all duration-200 text-white col-span-2"
                  style={{
                    background: activePain === 'churn' ? '#E8271A' : 'rgba(255,255,255,.04)',
                    border: `1px solid ${activePain === 'churn' ? '#E8271A' : 'rgba(255,255,255,.07)'}`,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <div className="text-[48px] leading-none mb-3">😤</div>
                  <div
                    className="font-black leading-snug mb-2.5"
                    style={{ fontSize: 'clamp(14px,3.2vw,18px)', letterSpacing: '-0.01em' }}
                  >
                    Losing<br />Customers
                  </div>
                  <div className="text-[16px]" style={{ color: activePain === 'churn' ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.3)' }}>→</div>
                </button>
              </div>

              {/* Pain Answers */}
              {activePain && (
                <PainAnswer
                  key={activePain}
                  visible={true}
                  icon={painAnswers[activePain].icon}
                  title={painAnswers[activePain].title}
                  body={painAnswers[activePain].body}
                  formId={activePain}
                  btnLabel={painAnswers[activePain].btnLabel}
                  plans={painPlans[activePain]}
                />
              )}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ─────────────────────────────────────────────────── */}
        <section id="cases" className="px-7 py-[88px]">
          <div className="max-w-[700px] mx-auto">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase block mb-3" style={{ color: '#FF4D40' }}>
              📍 Real Businesses · Real Markets · Real Results
            </span>
            <h2
              className="font-black mb-11"
              style={{ fontSize: 'clamp(38px,10vw,72px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}
            >
              Grow Your Location.<br />
              <em style={{ fontStyle: 'italic', color: '#E8271A' }}>Own Your Market.</em>
            </h2>

            {/* Cases Grid */}
            <div
              className="rounded-2xl overflow-hidden grid"
              style={{
                border: '1px solid #F0E4E4',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {/* Case 0: Taza2Go */}
              <div className="min-w-0" style={{ borderRight: '1px solid #F0E4E4' }}>
                <div className="p-[22px] pb-0">
                  <div className="text-[10px] font-black tracking-[0.14em] uppercase mb-1.5" style={{ color: '#9CA3AF' }}>
                    Taza2Go · Multi-Location Franchise Launch
                  </div>
                  <div
                    className="inline-block text-[11px] font-black tracking-wider uppercase text-white px-3 py-1 rounded mb-2.5"
                    style={{ background: '#E8271A', letterSpacing: '0.07em' }}
                  >
                    New Location Launch · New Media Presence
                  </div>
                  <div
                    className="font-black leading-none mb-4"
                    style={{ fontSize: 'clamp(20px,5vw,32px)', color: '#E8271A', letterSpacing: '-0.02em' }}
                  >
                    Zero to Launch:<br />2 Markets in 30 Days
                  </div>
                </div>
                <BAToggle
                  afterLabel="After 30 Days"
                  beforeContent={
                    <MockBrowser>
                      <BMBadge label="Zero Google Presence" />
                      <BMMap pins={[1, 0.4, 0.18]} />
                      <BMRow w="38%" accent />
                      <BMBadge label="No Social Presence" />
                      <BMRow img />
                      <BMRow w="58%" />
                      <BMBadge label="Zero Brand Awareness" />
                      <BMRow w="80%" />
                      <BMRow w="46%" accent />
                      <BMRow w="38%" />
                    </MockBrowser>
                  }
                  afterContent={
                    <CaseStudyVideo
                      src="/Data/case-study-1-taza2go-web.mp4"
                      wm="30d"
                      label="↑ Foot Traffic · Both Locations Live"
                      title="Results Coming Soon →"
                    />
                  }
                />
                <div className="flex" style={{ borderTop: '1px solid #F0E4E4' }}>
                  {[['2', 'Markets Launched'], ['30d', 'To Foot Traffic'], ['0→∞', 'Digital Presence']].map(([n, l]) => (
                    <div key={l} className="flex-1 py-4 px-3.5 text-center" style={{ borderRight: '1px solid #F0E4E4' }}>
                      <div className="font-black leading-none tracking-tight mb-1" style={{ fontSize: 28, color: '#E8271A', letterSpacing: '-0.02em' }}>{n}</div>
                      <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#9CA3AF' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div className="p-[22px]" style={{ borderTop: '1px solid #F0E4E4' }}>
                  <p className="text-[13.5px] leading-[1.72]" style={{ color: '#9CA3AF' }}>
                    A new halal restaurant concept entering two competitive CT markets simultaneously — zero brand recognition, zero digital presence, zero social following.{' '}
                    <strong style={{ color: '#0F0908', fontWeight: 700 }}>We built their complete local digital infrastructure, launched full Google + Meta campaigns, and drove measurable foot traffic to both locations within 30 days of opening.</strong>{' '}
                    From invisible to known — before most restaurants find their footing.
                  </p>
                </div>
                <div className="flex gap-2.5 px-[22px] py-2.5" style={{ borderTop: '1px solid #F0E4E4' }}>
                  <span className="text-[13px] font-bold" style={{ color: '#0F0908' }}>📍 Mystic, CT</span>
                  <span className="text-[13px] font-bold" style={{ color: '#0F0908' }}>📍 Niantic, CT</span>
                </div>
              </div>

              {/* Case 1: Krispy Krunchy */}
              <div className="min-w-0">
                <div className="p-[22px] pb-0">
                  <div className="text-[10px] font-black tracking-[0.14em] uppercase mb-1.5" style={{ color: '#9CA3AF' }}>
                    Krispy Krunchy Chicken · Franchise Operator
                  </div>
                  <div
                    className="font-black leading-none mb-4"
                    style={{ fontSize: 'clamp(20px,5vw,32px)', color: '#E8271A', letterSpacing: '-0.02em' }}
                  >
                    From Zero Digital Presence<br />to #1 in Local Market
                  </div>
                </div>
                <BAToggle
                  beforeContent={
                    <MockBrowser>
                      <BMBadge label="Ranked #9 · Google Maps" />
                      <BMMap pins={[1, 0.4, 0.18]} />
                      <BMRow w="80%" />
                      <BMRow w="58%" />
                      <BMRow img />
                      <BMRow w="38%" />
                      <BMRow w="46%" accent />
                      <BMBadge label="No Loyalty System" />
                      <BMRow img />
                      <BMRow w="80%" />
                    </MockBrowser>
                  }
                  afterContent={
                    <CaseStudyVideo
                      src="/Data/case-study-2-krispy-web.mp4"
                      wm="10x"
                      label="↑ #1 Local Market · 3x Digital Sales"
                      title="Full Case Study Coming →"
                    />
                  }
                />
                <div className="flex" style={{ borderTop: '1px solid #F0E4E4' }}>
                  {[['#1', 'Local Market'], ['3x', 'Digital Sales'], ['10x', 'Local Reach']].map(([n, l]) => (
                    <div key={l} className="flex-1 py-4 px-3.5 text-center" style={{ borderRight: '1px solid #F0E4E4' }}>
                      <div className="font-black leading-none tracking-tight mb-1" style={{ fontSize: 28, color: '#E8271A', letterSpacing: '-0.02em' }}>{n}</div>
                      <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#9CA3AF' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div className="p-[22px]" style={{ borderTop: '1px solid #F0E4E4' }}>
                  <p className="text-[13.5px] leading-[1.72]" style={{ color: '#9CA3AF' }}>
                    A franchise operator with two locations and zero digital presence — losing foot traffic to every nearby competitor.{' '}
                    <strong style={{ color: '#0F0908', fontWeight: 700 }}>We built their entire local digital footprint, launched hyperlocal StoryAds, and grew them to #1 in their local market in 60 days.</strong>{' '}
                    Digital sales tripled. Both locations running at capacity.
                  </p>
                </div>
                <div className="flex gap-2.5 px-[22px] py-2.5" style={{ borderTop: '1px solid #F0E4E4' }}>
                  <span className="text-[13px] font-bold" style={{ color: '#0F0908' }}>📍 Norwich, CT</span>
                  <span className="text-[13px] font-bold" style={{ color: '#0F0908' }}>📍 Willimantic, CT</span>
                </div>
              </div>

              {/* See More Button */}
              <button
                onClick={() => setShowMoreCases(!showMoreCases)}
                className="col-span-2 flex items-center justify-center gap-1.5 w-full py-3.5 text-[12px] font-black tracking-wider uppercase text-white transition-all duration-150"
                style={{ background: showMoreCases ? '#D11A10' : '#E8271A', letterSpacing: '0.07em' }}
              >
                <span>{showMoreCases ? 'Hide' : 'See More Before & Afters'}</span>
                <span
                  className="transition-transform duration-300"
                  style={{ transform: showMoreCases ? 'rotate(180deg)' : 'rotate(0)' }}
                >
                  ▾
                </span>
              </button>
            </div>

            {/* Hidden cases */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: showMoreCases ? 1200 : 0, opacity: showMoreCases ? 1 : 0 }}
            >
              {[
                {
                  ey: 'Case #3 · Norwich Pharmacy',
                  h: 'Building a Loyal Customer Base',
                  loc: '📍 Norwich, CT',
                  body: 'A regional pharmacy with high churn and zero retention strategy. We launched Meta campaigns, built a branded loyalty system, and turned their personal service into a competitive advantage.',
                  strong: 'Repeat visit rate improved significantly within 60 days.',
                  result: '↑ Repeat Visits Up · Loyalty System Live',
                },
                {
                  ey: 'Case #4 · Spice & Slice',
                  h: 'Owning a Niche No Competitor Could Copy',
                  loc: '📍 Norwich, CT',
                  body: 'A halal grocery needing to own their niche. We built their brand, a cultural content series, and a "SCAN TO VERIFY" QR campaign turning their standards into the #1 reason locals chose them.',
                  strong: '',
                  result: '↑ 10x Local Reach · Cultural Market Owned',
                },
              ].map((c) => (
                <div
                  key={c.ey}
                  className="rounded-xl p-5 mt-3"
                  style={{ border: '1px solid #F0E4E4' }}
                >
                  <div className="text-[9px] font-black tracking-[0.14em] uppercase mb-1.5" style={{ color: '#E8271A' }}>{c.ey}</div>
                  <div className="text-[18px] font-black tracking-tight mb-1.5">{c.h}</div>
                  <div className="text-[12px] font-bold mb-1.5" style={{ color: '#9CA3AF' }}>{c.loc}</div>
                  <p className="text-[13px] leading-relaxed mb-1.5" style={{ color: '#9CA3AF' }}>
                    {c.body} {c.strong && <strong style={{ color: '#0F0908', fontWeight: 700 }}>{c.strong}</strong>}
                  </p>
                  <div className="text-[10px] font-black tracking-wider uppercase" style={{ color: '#E8271A' }}>{c.result}</div>
                </div>
              ))}
            </div>

            {/* Norwich Pharmacy Wide Case */}
            <div
              className="rounded-2xl overflow-hidden mt-4"
              style={{ border: '1px solid #F0E4E4' }}
            >
              <div className="p-[22px] pb-0">
                <div className="text-[10px] font-black tracking-[0.14em] uppercase mb-1.5" style={{ color: '#9CA3AF' }}>
                  Norwich Pharmacy · Independent Operator · Norwich, CT
                </div>
                <div
                  className="font-black leading-none mb-2"
                  style={{ fontSize: 'clamp(22px,5vw,34px)', color: '#E8271A', letterSpacing: '-0.02em' }}
                >
                  Building a Loyal<br />Customer Base
                </div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>
                  Turned weekly customer churn into a measurable retention advantage — in 60 days.
                </p>
              </div>
              <CWToggle
                beforeContent={
                  <MockBrowser>
                    <BMBadge label="No Retention System · High Churn" />
                    <BMRow img />
                    <BMRow w="80%" />
                    <BMRow w="58%" />
                    <BMRow w="46%" accent />
                    <BMMap pins={[1, 0.3]} />
                    <BMRow w="38%" />
                    <BMRow w="80%" />
                    <BMBadge label="No Loyalty System" />
                    <BMRow img />
                    <BMRow w="80%" />
                    <BMRow w="46%" accent />
                  </MockBrowser>
                }
                afterContent={
                  <CaseStudyVideo
                    src="/Data/case-study-3-norwich-pharmacy-web.mp4"
                    wm="60d"
                    label="↑ Repeat Visits Up · Loyalty Live · Meta Ads Running"
                    title="Full Case Study Coming →"
                  />
                }
              />
              <div className="flex" style={{ borderTop: '1px solid #F0E4E4' }}>
                {[['↑↑', 'Repeat Visits'], ['Live', 'Meta Ads'], ['60d', 'To Results'], ['0→✓', 'Loyalty System']].map(([n, l]) => (
                  <div
                    key={l}
                    className="flex-1 py-3.5 px-3 text-center"
                    style={{ borderRight: '1px solid #F0E4E4' }}
                  >
                    <div className="font-black leading-none tracking-tight mb-1" style={{ fontSize: 26, color: '#E8271A', letterSpacing: '-0.02em' }}>{n}</div>
                    <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#9CA3AF' }}>{l}</div>
                  </div>
                ))}
              </div>
              <div className="p-[22px]" style={{ borderTop: '1px solid #F0E4E4' }}>
                <p className="text-[13.5px] leading-[1.72]" style={{ color: '#9CA3AF' }}>
                  A regional pharmacy with high churn and no retention strategy — first-time visitors weren&apos;t returning.{' '}
                  <strong style={{ color: '#0F0908', fontWeight: 700 }}>We launched Meta campaigns, built a branded loyalty system, and turned their personal service into a measurable competitive advantage.</strong>{' '}
                  Repeat visit rate improved significantly within 60 days. Customers who would have switched are now regulars.
                </p>
                <div className="text-[13px] font-bold mt-3" style={{ color: '#0F0908' }}>📍 Norwich, CT</div>
              </div>
            </div>

            {/* Vertical Video Placeholders */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                {
                  wm: '🌶️',
                  videoSrc: '/Data/case-study-4-spice-and-slice-web.mp4',
                  label: 'Case Study · Spice & Slice',
                  title: 'Owning a Niche\nNo Competitor Could Copy',
                  loc: '📍 Norwich, CT · Full Video Coming Soon',
                },
                {
                  wm: '🌙',
                  videoSrc: '/Data/case-study-5-green-crescent-web.mp4',
                  label: 'Case Study · Green Crescent Clinic',
                  title: 'Building a Consistent\nPatient Base',
                  loc: '📍 Connecticut · Full Video Coming Soon',
                },
              ].map((v) => (
                <div
                  key={v.label}
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid #F0E4E4' }}
                >
                  <div
                    className="relative flex items-center justify-center overflow-hidden"
                    style={{ aspectRatio: '9/16', background: '#0F0B1A' }}
                  >
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={v.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <span
                      className="absolute select-none"
                      style={{ fontSize: 'clamp(60px,18vw,120px)', opacity: 0.04 }}
                    >
                      {v.wm}
                    </span>
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 py-4 pt-10"
                      style={{ background: 'linear-gradient(to top, rgba(10,8,18,.92), rgba(10,8,18,.2), transparent)' }}
                    >
                      <div className="text-[9px] font-black tracking-[0.14em] uppercase mb-1.5" style={{ color: '#FF4D40' }}>{v.label}</div>
                      <div
                        className="font-black leading-[1.05] text-white mb-2"
                        style={{ fontSize: 'clamp(14px,3.5vw,20px)', letterSpacing: '-0.015em', whiteSpace: 'pre-line' }}
                      >
                        {v.title}
                      </div>
                      <div className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,.3)' }}>{v.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE WORK WITH ─────────────────────────────────────────────── */}
        <section className="px-7 py-16" style={{ background: '#FFF8F8' }}>
          <div className="max-w-[700px] mx-auto">
            <div className="mb-8">
              <div className="text-[11px] font-black tracking-[0.16em] uppercase mb-4" style={{ color: '#9CA3AF' }}>
                The Franchises We Are Working With
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { src: 'https://logo.clearbit.com/krispykrunchy.com', alt: 'Krispy Krunchy' },
                  { src: 'https://logo.clearbit.com/subwayrestaurants.com', alt: 'Subway' },
                  { src: 'https://logo.clearbit.com/cinnabon.com', alt: 'Cinnabon' },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    className="w-[68px] h-[68px] rounded-xl flex items-center justify-center p-2.5 overflow-hidden transition-all duration-200"
                    style={{ background: '#fff', border: '1px solid #F0E4E4' }}
                  >
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" style={{ filter: 'grayscale(20%)' }} />
                  </div>
                ))}
              </div>
            </div>
            <hr style={{ borderColor: '#F0E4E4', marginBottom: 32 }} />
            <div>
              <div className="text-[11px] font-black tracking-[0.16em] uppercase mb-4" style={{ color: '#9CA3AF' }}>
                The Local Operations We Are Working With
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {['Norwich\nPharmacy', 'Spice\n& Slice', 'Taza\n2Go', 'Local\nOperator'].map((name) => (
                  <div
                    key={name}
                    className="w-[68px] h-[68px] rounded-xl flex items-center justify-center text-center overflow-hidden transition-all duration-200"
                    style={{
                      background: '#fff',
                      border: '1px solid #F0E4E4',
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#0F0908',
                      lineHeight: 1.3,
                      padding: 6,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {name}
                  </div>
                ))}
                <span className="text-[12px] font-black self-center" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>+ Many More</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
        <section id="reviews" className="px-7 py-20" style={{ background: '#FFF8F8' }}>
          <div className="max-w-[700px] mx-auto">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase block mb-3" style={{ color: '#FF4D40' }}>
              What our clients say
            </span>
            <h2
              className="font-black mb-11"
              style={{ fontSize: 'clamp(28px,6.5vw,48px)', lineHeight: 0.95, letterSpacing: '-0.025em' }}
            >
              Real Results.<br /><em style={{ fontStyle: 'italic', color: '#E8271A' }}>Real Businesses.</em>
            </h2>
            <div className="flex flex-col gap-3.5">
              {[
                {
                  text: '"Biggie\'s team grew our local presence in Norwich & Willimantic by 10x, setting us up for 3x digital sales. We went from nobody knowing us to the #1 spot in our local market — in 60 days."',
                  name: 'Franchise Manager · Krispy Krunchy Chicken · Norwich & Willimantic, CT',
                },
                {
                  text: '"We went from losing repeat customers every week to a full loyalty system running and more people coming back consistently. The difference was clear within 60 days."',
                  name: 'Owner · Norwich Pharmacy · Norwich, CT',
                },
              ].map((q) => (
                <div key={q.name} className="rounded-2xl p-7" style={{ background: '#160A08' }}>
                  <p
                    className="italic font-medium leading-[1.75] mb-4"
                    style={{ fontSize: 15, color: 'rgba(255,255,255,.75)' }}
                  >
                    {q.text}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FF4D40' }} />
                    <span className="text-[12px] font-bold" style={{ color: 'rgba(255,255,255,.35)' }}>{q.name}</span>
                    <div className="ml-auto text-[13px]" style={{ color: '#FF4D40', letterSpacing: 1 }}>★★★★★</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE SYSTEM ───────────────────────────────────────────────────── */}
        <section id="system" className="px-7 py-[88px]" style={{ background: '#160A08' }}>
          <div className="max-w-[700px] mx-auto">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase block mb-3" style={{ color: '#FF4D40' }}>
              The System
            </span>
            <h2
              className="font-black mb-3.5"
              style={{ fontSize: 'clamp(32px,8vw,60px)', lineHeight: 0.93, letterSpacing: '-0.03em', color: '#fff' }}
            >
              The 60-Day<br /><em style={{ fontStyle: 'italic', color: '#FF4D40' }}>Local Growth Program</em>
            </h2>
            <p className="text-[15px] leading-[1.7] mb-11 max-w-[500px]" style={{ color: 'rgba(255,255,255,.45)' }}>
              Not an agency retainer. A <strong style={{ color: 'rgba(255,255,255,.9)' }}>plug-and-play growth system</strong> — AI-customized for your business type, market, and biggest problem. Built for franchise operators and standalone local businesses. Year-long program. Results in 60 days.
            </p>

            {/* How Steps */}
            <div
              className="flex rounded-xl overflow-hidden mb-8"
              style={{ border: '1px solid rgba(255,255,255,.07)' }}
            >
              {[
                { n: '1', lbl: 'Apply\nto Join', sub: '2 min form' },
                { n: '2', lbl: "We Build\nYour System", sub: 'AI-scoped' },
                { n: '3', lbl: 'Launch\n& Grow', sub: 'Done for you' },
                { n: '4', lbl: 'See Results\nor Free*', sub: '60-day min' },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className="flex-1 text-center py-5 px-3"
                  style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,.07)' : 'none' }}
                >
                  <div
                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center mx-auto mb-2.5 text-[14px] font-black text-white"
                    style={{ background: '#E8271A' }}
                  >
                    {step.n}
                  </div>
                  <div
                    className="text-[11px] font-bold leading-snug"
                    style={{ color: 'rgba(255,255,255,.6)', whiteSpace: 'pre-line' }}
                  >
                    {step.lbl}
                  </div>
                  <div className="text-[9px] mt-1 font-semibold" style={{ color: 'rgba(255,255,255,.22)' }}>{step.sub}</div>
                </div>
              ))}
            </div>

            {/* Offer Cards */}
            <div className="flex flex-col gap-0.5 mb-10">
              {[
                { icon: '📍', title: 'Local Market Domination', desc: 'Google Business + Maps optimization and local SEO — so your location shows up first when someone searches nearby.' },
                { icon: '🎬', title: 'StoryAds Content Engine', desc: 'Weekly story-driven content that stops the scroll and converts views into walk-ins — not just impressions.' },
                { icon: '🎯', title: 'Hyperlocal Ad Campaigns', desc: 'Meta + Google ads targeting buyers within miles of your door — people who are nearby and ready to visit.' },
                { icon: '💳', title: 'Loyalty & Retention System', desc: 'Powered by FastnFresh — a branded app that turns one-time visitors into regulars, automatically.' },
                { icon: '📊', title: 'Weekly Performance Reports', desc: "Plain-English reporting every week — what moved, what changed, what's next. No dashboards to decode." },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex gap-4 items-start rounded-xl p-5 transition-all duration-150"
                  style={{
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid rgba(255,255,255,.06)',
                  }}
                >
                  <div className="text-[28px] flex-shrink-0 mt-0.5">{card.icon}</div>
                  <div>
                    <div className="text-[16px] font-black text-white mb-1 tracking-tight">{card.title}</div>
                    <div className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,.38)' }}>{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUARANTEE ───────────────────────────────────────────────────── */}
        <section
          className="px-7 py-[52px]"
          style={{
            background: '#FFF0EF',
            borderTop: '2px solid #E8271A',
            borderBottom: '2px solid #E8271A',
          }}
        >
          <div className="max-w-[700px] mx-auto flex gap-6 items-start">
            <div className="text-[56px] leading-none flex-shrink-0">🛡️</div>
            <div>
              <h3
                className="font-black leading-[0.93] mb-4"
                style={{ fontSize: 'clamp(36px,9vw,68px)', letterSpacing: '-0.03em' }}
              >
                The 60-Day<br /><em style={{ fontStyle: 'italic', color: '#E8271A' }}>Growth Promise</em>
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: '#4B5563' }}>
                We agree on specific, measurable targets before day one.{' '}
                <strong style={{ color: '#0F0908', fontWeight: 800 }}>
                  If you don&apos;t see real growth within 60 days, we keep working at no extra charge until you do.
                </strong>{' '}
                Not a legal contract — a personal promise kept with every client.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────────── */}
        <section id="join" className="px-7 py-[88px]" style={{ background: '#FFF8F8' }}>
          <div className="max-w-[700px] mx-auto">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase block mb-3" style={{ color: '#FF4D40' }}>
              Your Growth Journey
            </span>
            <h2
              className="font-black mb-4"
              style={{ fontSize: 'clamp(28px,6.5vw,48px)', lineHeight: 0.95, letterSpacing: '-0.025em' }}
            >
              Choose<br /><em style={{ fontStyle: 'italic', color: '#E8271A' }}>Your Phase</em>
            </h2>
            <p className="text-[14px] leading-relaxed mb-8" style={{ color: '#9CA3AF' }}>
              Each phase builds on the last. Start with 60 days to see real results — then compound into local dominance over 6 months and a full year.
            </p>
            <div className="flex flex-col gap-3">

              {/* Phase 1 */}
              <PricingCard>
                <div className="p-[22px] pb-4" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  <div
                    className="text-[14px] font-black tracking-widest uppercase inline-block mb-3 px-4 py-1.5 rounded-full"
                    style={{ color: '#E8271A', border: '1.5px solid rgba(232,39,26,.3)' }}
                  >
                    Phase 1
                  </div>
                  <div
                    className="font-black leading-none mb-1.5"
                    style={{ fontSize: 'clamp(30px,7vw,44px)', letterSpacing: '-0.025em' }}
                  >
                    🚀 60-DAY GROWTH (Starter)
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: '#9CA3AF' }}>
                    For local operators ready to see real results fast. First 60 days — measurable growth or we keep working free.
                  </div>
                </div>
                <div className="flex items-baseline gap-0.5 px-[22px] py-4" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  <span className="text-[18px] font-black mt-1.5">$</span>
                  <span className="font-black leading-none" style={{ fontSize: 54, letterSpacing: '-0.04em' }}>1,500</span>
                  <span className="text-[13px] font-semibold self-end mb-1.5 ml-0.5" style={{ color: '#9CA3AF' }}>/mo</span>
                  <span className="text-[13px] font-semibold self-end mb-1.5 ml-1" style={{ color: '#9CA3AF' }}>· 60-day min</span>
                </div>
                <ul className="px-[22px] py-4 flex flex-col gap-2.5" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  {phase1Features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] font-semibold leading-snug" style={{ color: '#1F2937' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FFF0EF' }}>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="px-[22px] py-4">
                  <a
                    href="#join"
                    className="block text-center text-[12px] font-black tracking-wider uppercase px-3 py-3 rounded-full mb-2 transition-all duration-150"
                    style={{ background: '#fff', color: '#E8271A', border: '1px solid #F0E4E4' }}
                  >
                    Get Your 60-Day Growth Plan →
                  </a>
                  <p className="text-[11px] text-center leading-relaxed" style={{ color: '#9CA3AF' }}>We review every application & confirm fit.</p>
                </div>
              </PricingCard>

              {/* Kickoff */}
              <PricingCard dashed>
                <div className="p-[22px] pb-4" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  <div
                    className="text-[14px] font-black tracking-widest uppercase inline-block mb-3 px-4 py-1.5 rounded-full"
                    style={{ color: '#F59E0B', border: '1.5px solid rgba(245,158,11,.3)' }}
                  >
                    One-Time
                  </div>
                  <div className="font-black leading-none mb-1.5" style={{ fontSize: 'clamp(30px,7vw,44px)', letterSpacing: '-0.025em' }}>
                    🔥 KICKOFF CAMPAIGN
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: '#9CA3AF' }}>
                    New location opening or need a fast launchpad? One-time full-blast campaign — no monthly commitment.
                  </div>
                </div>
                <div className="flex items-baseline gap-0.5 px-[22px] py-4" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  <span className="text-[18px] font-black mt-1.5">$</span>
                  <span className="font-black leading-none" style={{ fontSize: 54, letterSpacing: '-0.04em' }}>5,000</span>
                  <span className="text-[15px] font-black self-end mb-1.5 ml-1" style={{ color: '#F59E0B' }}>one-time</span>
                </div>
                <ul className="px-[22px] py-4 flex flex-col gap-2.5" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  {kickoffFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] font-semibold leading-snug" style={{ color: '#1F2937' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FFF0EF' }}>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="px-[22px] py-4">
                  <a href="#join" className="block text-center text-[12px] font-black tracking-wider uppercase px-3 py-3 rounded-full mb-2 transition-all duration-150"
                    style={{ background: '#fff', color: '#E8271A', border: '1px solid #F0E4E4' }}>
                    Get the Kickoff Campaign →
                  </a>
                  <p className="text-[11px] text-center leading-relaxed" style={{ color: '#9CA3AF' }}>No monthly commitment. Perfect for new location launches.</p>
                </div>
              </PricingCard>

              {/* Phase 2 — Featured */}
              <PricingCard dark featured>
                <div className="p-[22px] pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  <div
                    className="inline-flex text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                    style={{ background: '#E8271A', letterSpacing: '0.1em' }}
                  >
                    ⭐ Most Popular
                  </div>
                  <div className="block">
                    <div
                      className="text-[14px] font-black tracking-widest uppercase inline-block mb-3 px-4 py-1.5 rounded-full"
                      style={{ color: '#FF4D40', border: '1.5px solid rgba(255,80,60,.3)' }}
                    >
                      Phase 2
                    </div>
                  </div>
                  <div className="font-black leading-none mb-1.5 text-white" style={{ fontSize: 'clamp(30px,7vw,44px)', letterSpacing: '-0.025em' }}>
                    📍 LOCAL DOMINATION
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>
                    6-month program. Own your local market — rank #1, fill your location, and make competitors irrelevant.
                  </div>
                </div>
                <div className="flex items-baseline gap-0.5 px-[22px] py-4" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  <span className="text-[18px] font-black mt-1.5 text-white">$</span>
                  <span className="font-black leading-none text-white" style={{ fontSize: 54, letterSpacing: '-0.04em' }}>2,750</span>
                  <span className="text-[13px] font-semibold self-end mb-1.5 ml-0.5" style={{ color: 'rgba(255,255,255,.3)' }}>/mo</span>
                  <span className="text-[13px] font-semibold self-end mb-1.5 ml-1" style={{ color: 'rgba(255,255,255,.3)' }}>· 6-month program</span>
                </div>
                <ul className="px-[22px] py-4 flex flex-col gap-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  {phase2Features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,.75)' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(209,26,16,.35)' }}>
                        <CheckIcon color="#FF4D40" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="px-[22px] py-4">
                  <a href="#join" className="block text-center text-[12px] font-black tracking-wider uppercase px-3 py-3 rounded-full mb-2 transition-all duration-150"
                    style={{ background: '#fff', color: '#E8271A' }}>
                    Get Your 60-Day Growth Plan →
                  </a>
                  <p className="text-[11px] text-center leading-relaxed" style={{ color: 'rgba(255,255,255,.28)' }}>Includes 60-Day Growth Promise · Limited spots/month</p>
                </div>
              </PricingCard>

              {/* Phase 3 */}
              <PricingCard>
                <div className="p-[22px] pb-4" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  <div
                    className="text-[14px] font-black tracking-widest uppercase inline-block mb-3 px-4 py-1.5 rounded-full"
                    style={{ color: '#E8271A', border: '1.5px solid rgba(232,39,26,.3)' }}
                  >
                    Phase 3
                  </div>
                  <div className="font-black leading-none mb-1.5" style={{ fontSize: 'clamp(30px,7vw,44px)', letterSpacing: '-0.025em' }}>
                    🏆 1-YEAR PLAN
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: '#9CA3AF' }}>
                    Full-year program after 6 months. Multi-location growth, regional dominance, and a system that runs itself.
                  </div>
                </div>
                <div className="flex items-baseline gap-0.5 px-[22px] py-4" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  <span className="text-[18px] font-black mt-1.5">$</span>
                  <span className="font-black leading-none" style={{ fontSize: 54, letterSpacing: '-0.04em' }}>5,000</span>
                  <span className="text-[13px] font-semibold self-end mb-1.5 ml-0.5" style={{ color: '#9CA3AF' }}>/mo</span>
                  <span className="text-[13px] font-semibold self-end mb-1.5 ml-1" style={{ color: '#9CA3AF' }}>· after Phase 2</span>
                </div>
                <ul className="px-[22px] py-4 flex flex-col gap-2.5" style={{ borderBottom: '1px solid #F0E4E4' }}>
                  {phase3Features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] font-semibold leading-snug" style={{ color: '#1F2937' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FFF0EF' }}>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="px-[22px] py-4">
                  <a href="#join" className="block text-center text-[12px] font-black tracking-wider uppercase px-3 py-3 rounded-full mb-2 transition-all duration-150"
                    style={{ background: '#fff', color: '#E8271A', border: '1px solid #F0E4E4' }}>
                    Get Your 60-Day Growth Plan →
                  </a>
                  <p className="text-[11px] text-center leading-relaxed" style={{ color: '#9CA3AF' }}>Unlocked after completing Phase 2.</p>
                </div>
              </PricingCard>

              {/* Multi-location custom */}
              <div
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ border: '1px solid #F0E4E4', background: '#FFF8F8' }}
              >
                <div className="p-[22px] flex items-center gap-3.5 flex-wrap">
                  <div className="text-[28px]">🏢</div>
                  <div>
                    <div className="text-[17px] font-black tracking-tight mb-0.5">Multi-Location or Franchises</div>
                    <div className="text-[12px] leading-relaxed max-w-[300px]" style={{ color: '#9CA3AF' }}>
                      Running 2+ locations or a franchise network? We scope a custom plan around your number of locations, markets, and goals.
                    </div>
                  </div>
                  <a
                    href="#join"
                    className="ml-auto text-[11px] font-black tracking-wider uppercase text-white px-4 py-2.5 rounded-full transition-all duration-150 whitespace-nowrap"
                    style={{ background: '#0F0908' }}
                  >
                    Get Custom Pricing →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section id="faq" className="px-7 py-[88px]">
          <div className="max-w-[700px] mx-auto">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase block mb-3" style={{ color: '#FF4D40' }}>
              Questions
            </span>
            <h2
              className="font-black mb-8"
              style={{ fontSize: 'clamp(28px,6.5vw,48px)', lineHeight: 0.95, letterSpacing: '-0.025em' }}
            >
              Everything you<br /><em style={{ fontStyle: 'italic', color: '#E8271A' }}>need to know.</em>
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #F0E4E4' }}>
              {faqItems.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA + FORM ─────────────────────────────────────────────── */}
        <section
          className="px-7 py-24 relative overflow-hidden"
          style={{ background: '#160A08' }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: -200, left: '50%', transform: 'translateX(-50%)',
              width: 800, height: 600,
              background: 'radial-gradient(circle,rgba(209,26,16,.15) 0%,transparent 70%)',
            }}
          />
          <div className="max-w-[560px] mx-auto text-center relative">
            <span
              className="text-[10px] font-black tracking-[0.2em] uppercase block mb-4"
              style={{ color: 'rgba(255,255,255,.35)' }}
            >
              Limited to 3 New Businesses Per Month
            </span>
            <h2
              className="font-black mb-3.5"
              style={{ fontSize: 'clamp(32px,9vw,64px)', lineHeight: 0.93, letterSpacing: '-0.03em', color: '#fff' }}
            >
              Dominate Your Local Market,<br />
              <em style={{ fontStyle: 'italic', color: '#FF4D40' }}>Like The Big-Chains.</em>
            </h2>
            <p className="text-[15px] leading-relaxed mb-9" style={{ color: 'rgba(255,255,255,.45)' }}>
              Tell us about your business and your biggest problem. We&apos;ll build your custom plan and reach out within 24 hours.
            </p>

            {/* Lead Form */}
            <div
              className="rounded-[18px] p-8 text-left"
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.08)',
              }}
            >
              <div className="text-[17px] font-black text-white mb-1.5 tracking-tight">Apply to Join the 60-Day Program</div>
              <div className="text-[12px] mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,.35)' }}>
                Takes 2 minutes. We review every application personally.
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <input className="lf-input" type="text" placeholder="Your name" />
                  <input className="lf-input" type="tel" placeholder="Phone number" />
                </div>
                <input className="lf-input" type="text" placeholder="Business name & city" />
                <select className="lf-select">
                  <option value="" disabled>Business type</option>
                  <option>Franchise Operator (1 location)</option>
                  <option>Franchise Operator (2+ locations)</option>
                  <option>Independent Local Business</option>
                  <option>Restaurant / Food & Beverage</option>
                  <option>Retail / Service</option>
                  <option>Other</option>
                </select>
                <select className="lf-select">
                  <option value="" disabled>Current annual revenue</option>
                  <option>$100K – $1M</option>
                  <option>$1M – $5M</option>
                  <option>$5M+</option>
                  <option>Franchise (multiple locations)</option>
                </select>
                <select className="lf-select">
                  <option value="" disabled>Biggest problem right now</option>
                  <option>Losing customers to nearby competitors</option>
                  <option>Not showing up on Google / Maps</option>
                  <option>Ads not driving local foot traffic</option>
                  <option>Customers don&apos;t come back</option>
                  <option>Low foot traffic</option>
                  <option>Launching a new location</option>
                  <option>Underperforming franchise location</option>
                </select>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2.5 font-black text-[14px] tracking-widest uppercase text-white py-4 rounded-full mt-1 cursor-pointer transition-all duration-150"
                  style={{
                    background: '#E8271A',
                    letterSpacing: '0.06em',
                    boxShadow: '0 6px 28px rgba(209,26,16,.25)',
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Get Your 60-Day Growth Plan →
                </button>
              </div>
              <p className="text-[11px] text-center mt-3 font-medium" style={{ color: 'rgba(255,255,255,.2)' }}>
                <a href="#faq" style={{ color: 'rgba(232,80,70,.8)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  *See how the 60-Day Growth Promise works
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="px-7 pt-11 pb-7" style={{ background: '#0F0908', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <div className="max-w-[700px] mx-auto flex items-start justify-between gap-8 flex-wrap mb-7">
            <div>
              <div className="text-[18px] font-black tracking-tight text-white mb-1.5" style={{ letterSpacing: '-0.03em' }}>
                Local<span style={{ color: '#FF4D40' }}>Big</span>
              </div>
              <div className="text-[11px] leading-relaxed max-w-[200px]" style={{ color: 'rgba(255,255,255,.25)' }}>
                The 60-Day Local Growth Program for Franchise Operators & Local Businesses.
              </div>
            </div>
            <div>
              <label className="text-[9px] font-black tracking-[0.16em] uppercase block mb-3" style={{ color: 'rgba(255,255,255,.22)' }}>Quick Links</label>
              <div className="flex flex-col gap-2.5">
                {['Case Studies', 'Pricing', 'Join the Program'].map((l) => (
                  <a key={l} href="#" className="text-[12px] font-semibold transition-all duration-150" style={{ color: 'rgba(255,255,255,.35)' }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[9px] font-black tracking-[0.16em] uppercase block mb-3" style={{ color: 'rgba(255,255,255,.22)' }}>Contact</label>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:hello@localbig.com" className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,.35)' }}>hello@localbig.com</a>
                <a href="#join" className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,.35)' }}>Apply Now</a>
              </div>
            </div>
          </div>
          <div
            className="max-w-[700px] mx-auto pt-5 flex justify-between flex-wrap gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}
          >
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.18)' }}>© 2025 LocalBig. All rights reserved.</span>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.18)' }}>Norwich · Willimantic · Mystic · Niantic, CT</span>
          </div>
        </footer>
      </div>
    </>
  );
}