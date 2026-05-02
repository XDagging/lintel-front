import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin, ChevronRight, Wind, Droplets, Sparkles,
  Home, Scissors, CheckCircle, Clock, Shield, Star, ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { AddressSearch } from '../components/AddressSearch';
import logo from '../assets/logo.jpeg';

const SERVICES = [
  { id: 'gutter-cleaning',         name: 'Gutter Cleaning',   desc: 'Keep gutters clear and flowing. Remove debris and ensure proper drainage.',              price: '$89',  Icon: Wind },
  { id: 'window-cleaning',         name: 'Window Cleaning',   desc: 'Crystal-clear windows inside and out. Streak-free shine, every time.',                  price: '$119', Icon: Droplets },
  { id: 'pressure-washing',        name: 'Pressure Washing',  desc: 'Blast away dirt, grime, and mildew from driveways, decks, and siding.',                 price: '$149', Icon: Sparkles },
  { id: 'house-cleaning-standard', name: 'House Cleaning',    desc: 'A thorough clean of every room. Your home, spotless.',                                   price: '$129', Icon: Home },
  { id: 'house-cleaning-deep',     name: 'Deep Clean',        desc: 'The most thorough clean possible — perfect for move-ins and special occasions.',          price: '$229', Icon: Sparkles },
  { id: 'lawn-mowing',             name: 'Lawn Mowing',       desc: 'A perfectly manicured lawn without lifting a finger.',                                   price: '$99',  Icon: Scissors },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setAddress } = useBookingStore();
  const [heroAddress, setHeroAddress] = useState('');

  useEffect(() => {
    if (user) navigate(user.role === 'worker' ? '/worker/dashboard' : '/book', { replace: true });
  }, [user, navigate]);

  const handleAddressConfirm = (addr: string) => {
    if (!addr.trim()) return;
    setAddress(addr, true);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="lintel" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-white text-xl font-black tracking-tight">lintel</span>
          </Link>

          <nav className="hidden md:flex items-center">
            <a href="#services"     className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">Services</a>
            <a href="#how-it-works" className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">How it works</a>
            <Link to="/worker/register" className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">Earn with us</Link>
            <Link to="/blog" className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">Blog</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 h-9 flex items-center text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors">
              Log in
            </Link>
            <Link to="/login" className="px-4 h-9 flex items-center bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 py-16">

          {/* Left — copy + address input */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-4 h-4 text-uber-gray-400" />
              <span className="text-sm text-uber-gray-500 font-medium">Available in your area</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-black leading-[1.05] mb-10">
              Home services,<br />on demand.
            </h1>

            {/* Address box */}
            <div className="rounded-2xl border-2 border-uber-gray-200 bg-white shadow-sm max-w-md overflow-visible">
              <div className="p-4 pb-3">
                <p className="text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-3">Your address</p>
                <AddressSearch
                  value={heroAddress}
                  onChange={setHeroAddress}
                  onConfirm={handleAddressConfirm}
                  placeholder="Enter your home address"
                />
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddressConfirm(heroAddress)}
                  disabled={!heroAddress.trim()}
                  className="w-full h-12 bg-black text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-uber-gray-800 transition-colors disabled:bg-uber-gray-200 disabled:text-uber-gray-400 disabled:cursor-not-allowed"
                >
                  See prices
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm text-uber-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-black font-semibold underline underline-offset-2 hover:no-underline">
                Log in to see your recent activity
              </Link>
            </p>
          </div>

          {/* Right — illustration */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-black mb-2">Our services</h2>
          <p className="text-uber-gray-500 text-lg mb-10">Trusted professionals for every home need.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(({ id, name, desc, price, Icon }) => (
              <div key={id} className="bg-uber-gray-50 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-black text-lg leading-tight">{name}</p>
                    <p className="text-uber-gray-500 text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 h-9 bg-white border border-uber-gray-300 text-black text-sm font-semibold rounded-full hover:border-black transition-colors"
                  >
                    Details
                  </button>
                  <span className="text-sm font-bold text-uber-gray-500">From {price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-uber-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-stretch">

          {/* Mint feature card */}
          <div className="flex-1 bg-[#D4EDE8] rounded-3xl p-10 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex gap-3 mb-8">
                <span className="px-5 h-10 flex items-center bg-black text-white text-sm font-bold rounded-full">Book now</span>
                <span className="px-5 h-10 flex items-center bg-white/70 text-black text-sm font-bold rounded-full">Schedule ahead</span>
              </div>
              <h3 className="text-4xl font-black text-black leading-tight mb-4">
                Get your home<br />right with lintel
              </h3>
              <p className="text-uber-gray-600 text-base leading-relaxed">
                Enter your address, choose a service, and a vetted professional comes to you — on your schedule.
              </p>
            </div>
            <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-3">Your address</p>
              <div className="h-11 bg-uber-gray-50 rounded-lg flex items-center px-4 gap-3 text-sm text-uber-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                <span>Enter your address</span>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full h-11 bg-black text-white font-bold text-sm rounded-xl hover:bg-uber-gray-800 transition-colors"
              >
                Get started
              </button>
            </div>
          </div>

          {/* Benefits list */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-black mb-8">Benefits</h3>
            <div className="space-y-7">
              {[
                { Icon: CheckCircle, title: 'Vetted professionals',    desc: 'Every worker is background-checked and rated by your neighbors.' },
                { Icon: Clock,       title: 'Book in minutes',         desc: 'Select your service, confirm your address, and you\'re done.' },
                { Icon: Shield,      title: 'Pay after confirmation',  desc: 'Your card is only charged once you confirm the job is complete.' },
                { Icon: Star,        title: 'Satisfaction guaranteed', desc: 'Not happy with the work? We\'ll make it right, every time.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-uber-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">{title}</p>
                    <p className="text-uber-gray-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Login CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-black text-black leading-tight mb-4">
              Log in to see your<br />account details
            </h2>
            <p className="text-uber-gray-500 text-lg mb-8">
              View past bookings, tailored suggestions, support resources, and more.
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <Link
                to="/login"
                className="px-6 h-12 bg-black text-white font-bold text-sm rounded-xl flex items-center hover:bg-uber-gray-800 transition-colors"
              >
                Log in to your account
              </Link>
              <Link to="/login" className="text-sm font-semibold text-black underline underline-offset-2 hover:no-underline">
                Create an account
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <LoginCTAVisual />
          </div>
        </div>
      </section>

      {/* ── Worker CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-uber-gray-400 text-xs font-bold uppercase tracking-widest mb-4">For professionals</p>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Earn on your<br />own schedule
            </h2>
            <p className="text-uber-gray-400 text-lg mb-8">
              Join our network of trusted home service professionals. Set your own hours and grow your client base.
            </p>
            <Link
              to="/worker/register"
              className="inline-flex items-center gap-2 px-6 h-12 bg-white text-black font-bold text-sm rounded-xl hover:bg-uber-gray-100 transition-colors"
            >
              Get started as a pro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <WorkerVisual />
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logo} alt="lintel" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-white text-xl font-black">lintel</span>
              </div>
              <p className="text-uber-gray-500 text-sm max-w-xs">
                Home services, on demand. Trusted professionals for every home need.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-white text-sm font-bold mb-3">Company</p>
                <div className="space-y-2">
                  <Link to="/terms"   className="block text-uber-gray-500 text-sm hover:text-white transition-colors">Terms</Link>
                  <Link to="/privacy" className="block text-uber-gray-500 text-sm hover:text-white transition-colors">Privacy</Link>
                  <Link to="/blog"    className="block text-uber-gray-500 text-sm hover:text-white transition-colors">Blog</Link>
                </div>
              </div>
              <div>
                <p className="text-white text-sm font-bold mb-3">Services</p>
                <div className="space-y-2">
                  <Link to="/login"           className="block text-uber-gray-500 text-sm hover:text-white transition-colors">Book a service</Link>
                  <Link to="/worker/register" className="block text-uber-gray-500 text-sm hover:text-white transition-colors">Become a pro</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-uber-gray-600 text-sm">© 2026 lintel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Sticky bottom bar ───────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm py-3 px-6">
        <div className="max-w-sm mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full h-12 bg-white text-black font-bold text-sm rounded-xl hover:bg-uber-gray-100 transition-colors"
          >
            See prices
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Illustrations ─────────────────────────────────────────────────────── */

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[540px] rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
      <svg viewBox="0 0 540 405" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Sky */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        <rect width="540" height="405" fill="url(#sky)" />

        {/* Sun */}
        <circle cx="450" cy="72" r="50" fill="#FCD34D" opacity="0.55" />
        <circle cx="450" cy="72" r="35" fill="#FCD34D" opacity="0.8" />

        {/* Birds */}
        <path d="M78 68 Q83 62 88 68 Q93 62 98 68"  stroke="#A8A29E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M110 88 Q115 82 120 88 Q125 82 130 88" stroke="#A8A29E" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Ground */}
        <rect x="0" y="308" width="540" height="97" fill="#86EFAC" />
        <rect x="0" y="326" width="540" height="79" fill="#4ADE80" />

        {/* House body */}
        <rect x="160" y="194" width="220" height="164" rx="6" fill="#FB923C" />

        {/* Roof */}
        <polygon points="138,196 270,82 402,196" fill="#EA580C" />

        {/* Roof shadow line */}
        <line x1="138" y1="196" x2="402" y2="196" stroke="#C2410C" strokeWidth="3" />

        {/* Chimney */}
        <rect x="300" y="96" width="30" height="62" rx="3" fill="#C2410C" />
        <rect x="295" y="92" width="40" height="12" rx="3" fill="#9A3412" />

        {/* Door */}
        <rect x="232" y="272" width="76" height="86" rx="5" fill="#7C3AED" />
        <rect x="232" y="272" width="76" height="38" rx="5" fill="#6D28D9" />
        <circle cx="298" cy="318" r="5" fill="#DDD6FE" />

        {/* Left window */}
        <rect x="172" y="224" width="58" height="52" rx="5" fill="#BAE6FD" />
        <line x1="201" y1="224" x2="201" y2="276" stroke="#7DD3FC" strokeWidth="2.5" />
        <line x1="172" y1="250" x2="230" y2="250" stroke="#7DD3FC" strokeWidth="2.5" />

        {/* Right window */}
        <rect x="310" y="224" width="58" height="52" rx="5" fill="#BAE6FD" />
        <line x1="339" y1="224" x2="339" y2="276" stroke="#7DD3FC" strokeWidth="2.5" />
        <line x1="310" y1="250" x2="368" y2="250" stroke="#7DD3FC" strokeWidth="2.5" />

        {/* Path */}
        <rect x="245" y="358" width="50" height="47" fill="#D1D5DB" opacity="0.9" />
        <rect x="238" y="356" width="64" height="10" rx="2" fill="#E5E7EB" opacity="0.8" />

        {/* Left tree trunk + foliage */}
        <rect x="86" y="272" width="14" height="76" rx="3" fill="#92400E" />
        <ellipse cx="93" cy="254" rx="36" ry="46" fill="#16A34A" />
        <ellipse cx="93" cy="242" rx="24" ry="30" fill="#22C55E" />

        {/* Right tree */}
        <rect x="422" y="264" width="14" height="84" rx="3" fill="#92400E" />
        <ellipse cx="429" cy="244" rx="36" ry="48" fill="#15803D" />
        <ellipse cx="429" cy="232" rx="24" ry="30" fill="#16A34A" />

        {/* Bushes */}
        <ellipse cx="166" cy="356" rx="22" ry="14" fill="#22C55E" />
        <ellipse cx="374" cy="356" rx="22" ry="14" fill="#16A34A" />
      </svg>

      {/* Floating badge — top left */}
      <div className="absolute top-5 left-5 bg-white rounded-2xl px-3.5 py-2.5 shadow-lg">
        <p className="text-xs font-black text-black">Available now</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-uber-green animate-pulse" />
          <p className="text-xs text-uber-green font-semibold">23 pros nearby</p>
        </div>
      </div>

      {/* Floating badge — bottom right */}
      <div className="absolute bottom-8 right-5 bg-black rounded-2xl px-3.5 py-2.5 shadow-lg">
        <p className="text-xs font-bold text-white">Last booked nearby</p>
        <p className="text-xs text-uber-gray-400 mt-0.5">Gutter cleaning · 2h ago</p>
      </div>
    </div>
  );
}

function LoginCTAVisual() {
  return (
    <div className="w-full max-w-md rounded-3xl overflow-hidden bg-uber-gray-50" style={{ height: 300 }}>
      <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#F6F6F6" />

        {/* Ground shadow */}
        <ellipse cx="130" cy="256" rx="45" ry="12" fill="#E2E2E2" />
        <ellipse cx="290" cy="256" rx="45" ry="12" fill="#E2E2E2" />

        {/* Person 1 — homeowner */}
        <rect x="100" y="152" width="60" height="104" rx="8" fill="#3B82F6" />
        <circle cx="130" cy="130" r="30" fill="#FDE68A" />
        <ellipse cx="130" cy="106" rx="30" ry="14" fill="#1C1917" />
        <circle cx="122" cy="128" r="3.5" fill="#1C1917" />
        <circle cx="138" cy="128" r="3.5" fill="#1C1917" />
        <path d="M123 141 Q130 147 137 141" stroke="#1C1917" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Arm reaching out */}
        <rect x="160" y="162" width="18" height="12" rx="5" fill="#FDE68A" />

        {/* Person 2 — worker */}
        <rect x="250" y="146" width="64" height="110" rx="8" fill="#1C1917" />
        {/* Hi-vis vest */}
        <polygon points="260,146 276,146 276,220 260,220" fill="#D97706" opacity="0.6" />
        <polygon points="298,146 314,146 314,220 298,220" fill="#D97706" opacity="0.6" />
        <circle cx="282" cy="122" r="30" fill="#FBBF24" />
        <rect x="256" y="98" width="52" height="10" rx="3" fill="#374151" />
        <ellipse cx="282" cy="96" rx="32" ry="12" fill="#1F2937" />
        <circle cx="274" cy="120" r="3.5" fill="#1C1917" />
        <circle cx="290" cy="120" r="3.5" fill="#1C1917" />
        <path d="M275 133 Q282 139 289 133" stroke="#1C1917" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Broom handle */}
        <rect x="316" y="116" width="8" height="130" rx="4" fill="#92400E" />
        <ellipse cx="320" cy="122" rx="16" ry="9" fill="#D97706" />

        {/* Stars between them */}
        <polygon points="200,135 203,126 206,135 215,135 208,141 211,150 200,144 189,150 192,141 185,135" fill="#FCD34D" />
      </svg>
    </div>
  );
}

function WorkerVisual() {
  return (
    <div className="w-full max-w-sm rounded-3xl overflow-hidden" style={{ height: 280 }}>
      <svg viewBox="0 0 360 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="280" fill="#111111" />

        {/* Subtle grid */}
        {[50,100,150,200,250].map(y => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#ffffff" strokeWidth="0.5" opacity="0.04" />
        ))}
        {[60,120,180,240,300].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#ffffff" strokeWidth="0.5" opacity="0.04" />
        ))}

        {/* Worker figure */}
        <rect x="140" y="150" width="80" height="100" rx="8" fill="#374151" />
        {/* Hi-vis */}
        <polygon points="150,150 164,150 164,250 150,250" fill="#D97706" opacity="0.7" />
        <polygon points="196,150 210,150 210,250 196,250" fill="#D97706" opacity="0.7" />
        <circle cx="180" cy="126" r="32" fill="#FBBF24" />
        <rect x="154" y="100" width="52" height="11" rx="3" fill="#374151" />
        <ellipse cx="180" cy="98" rx="32" ry="13" fill="#1F2937" />
        <circle cx="172" cy="124" r="3.5" fill="#1C1917" />
        <circle cx="188" cy="124" r="3.5" fill="#1C1917" />
        <path d="M173 137 Q180 143 187 137" stroke="#1C1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Arms */}
        <rect x="108" y="158" width="34" height="14" rx="6" fill="#FBBF24" />
        <rect x="218" y="158" width="34" height="14" rx="6" fill="#FBBF24" />

        {/* Rating card */}
        <rect x="16" y="18" width="118" height="54" rx="10" fill="white" opacity="0.96" />
        <text x="27" y="40" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#111">Top Rated</text>
        <text x="27" y="57" fontFamily="system-ui,sans-serif" fontSize="10" fill="#6B7280">4.9 ★  ·  247 jobs</text>

        {/* Earnings card */}
        <rect x="226" y="18" width="118" height="54" rx="10" fill="#D97706" />
        <text x="237" y="40" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="white">This week</text>
        <text x="237" y="57" fontFamily="system-ui,sans-serif" fontSize="10" fill="white" opacity="0.85">+$847 earned</text>
      </svg>
    </div>
  );
}
