import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export const BLOG_POSTS = [
  {
    slug: 'what-a-pro-does',
    title: 'What a Lintel Pro Actually Does — A Full Breakdown',
    excerpt: 'Thinking about signing up as a Lintel pro? Here\'s exactly what a typical job looks like, how you get paid, and what Lintel handles for you — including all the equipment.',
    readTime: '5 min read',
    date: 'May 1, 2026',
    category: 'For Professionals',
    content: `
## What it means to be a Lintel pro

A Lintel pro is a vetted, independent service worker who picks up on-demand home service jobs — gutter cleaning, pressure washing, window cleaning, and more. You set your own schedule, choose which jobs to accept, and get paid directly after each one.

Think of it like being a rideshare driver, but for home services. You don't need a car full of passengers — just a willingness to work, a driver's license, and a clean background check. Lintel provides all the equipment.

## Your typical job, step by step

### Step 1 — A job appears on your dashboard

When a homeowner books a service in your area, the job shows up in your worker dashboard. You'll see the service type, address, date, and the payout amount — before you accept it.

### Step 2 — You accept the job

Tap "Accept" and the job is yours. The homeowner gets notified that a pro has been assigned. You'll see the full address and any notes from the customer.

### Step 3 — Show up and do the work

Arrive at the scheduled time, introduce yourself, and get to work. Each service type has a clear scope — Lintel defines what's included so there are no awkward conversations about what's "extra."

- **Gutter cleaning**: Remove debris from all accessible gutters using the provided vacuum and blower equipment, flush downspouts, bag and remove waste. All work is ground-level — no ladders.
- **Pressure washing**: Clean the specified surface (driveway, patio, deck, or siding) using Lintel's commercial-grade pressure washer. We provide the machine, detergents, and nozzles — you just operate it.
- **Window cleaning**: Clean all exterior-facing windows (and interior if booked) using the provided water-fed pole system and supplies. Streak-free finish expected.

### Step 4 — Mark the job complete

When you're done, mark the job as complete in the app. This generates a **confirmation code** — a unique code you give to the homeowner.

### Step 5 — Get paid

The homeowner enters your confirmation code in their app to confirm they're satisfied. Once confirmed, your payout is released — typically within 1–2 business days via Stripe. If the homeowner doesn't confirm within 48 hours, the system auto-confirms and pays you.

## How much do you earn?

On every completed job, you keep **40% of the job fee**. Here's what that looks like in practice:

| Service | Job Price | Your Payout |
|---------|-----------|-------------|
| Gutter Cleaning | $89 | $35.60 |
| Window Cleaning | $119 | $47.60 |
| Pressure Washing | $149 | $59.60 |

Tips are added on top — and **100% of every tip goes directly to you**. Lintel takes nothing from tips, ever.

### Our $40/hr minimum commitment

We believe pros should be paid fairly for their time. If your commission on a job works out to less than **$40/hour** based on the expected job duration, we'll increase your split until it does. This isn't a bonus or a promo — it's a standing policy. We'd rather take a smaller cut than have our pros earning less than they deserve.

Top-performing pros who take multiple jobs per day regularly earn **$400–$800/week** working part-time hours.

## What Lintel handles for you

This is the part most people underestimate. Running a home service business on your own means buying equipment, marketing, scheduling, invoicing, handling disputes, and buying insurance. Lintel handles all of that:

- **All equipment and supplies**: We provide everything you need for every job — pressure washers, vacuums, cleaning solutions, water-fed poles, the works. You just show up and do the work.
- **Customer acquisition**: We run ads, SEO, and referral programs. You never have to find your own clients.
- **Scheduling**: The booking system handles availability, time slots, and reminders.
- **Payment processing**: Stripe handles all money movement. You don't send invoices or chase payments.
- **Insurance**: Every job is covered under Lintel's $1M general liability policy. If you accidentally damage something, we handle the claim.
- **Dispute resolution**: If a customer isn't happy, our support team mediates. You don't have to negotiate with angry homeowners.

## What you need to get started

### Requirements
- Must be a current high school student
- Valid driver's license and reliable transportation to get to job sites
- Pass a background check (Lintel runs this — it takes 1–3 business days)

That's it. **Lintel provides all equipment and supplies** for every service type — pressure washers, gutter vacuums, window cleaning systems, detergents, trash bags, everything. You just need to show up ready to work.

## A day in the life

Here's what a realistic Tuesday might look like for an active Lintel pro:

- **8:30 AM** — Check the dashboard over coffee. See two gutter cleaning jobs and a pressure wash available nearby.
- **9:00 AM** — Accept all three. Grab your keys and head out.
- **9:30 AM** — Arrive at first gutter job. 45 minutes of work. Mark complete, hand over the code.
- **10:30 AM** — Drive to second gutter job (12 minutes away). Same process.
- **12:00 PM** — Lunch break.
- **1:00 PM** — Pressure washing job. Takes about 90 minutes for a driveway.
- **3:00 PM** — Done for the day. Three jobs completed, ~$143 earned before tips.

That's a 6-hour workday, on your own terms. No boss. No set hours. No uniform (though a clean, professional appearance is expected).

## How ratings work

After each job, the homeowner rates you on a 5-star scale. Your rating is visible to future customers and affects which jobs you're offered. Here's the system:

- **4.5★ and above**: You're in great standing. You get first access to new jobs in your area.
- **4.0–4.4★**: You're on watch. Maintain quality or risk reduced job access.
- **Below 4.0★**: Your account is paused for review. You may need to complete a quality refresher before reactivating.

The network average is **4.9★** — most pros take pride in their work and ratings reflect that.

## Ready to start?

Signing up takes about 5 minutes. You'll fill out a short application, consent to a background check, and connect your bank account through Stripe. Once approved (usually 1–3 business days), jobs start appearing on your dashboard.

No franchise fees. No startup costs. No equipment to buy. No minimum hours. Just real work for real pay.
    `,
  },
  {
    slug: 'how-it-works',
    title: 'How Lintel Works: Book a Pro in Under 2 Minutes',
    excerpt: 'Enter your address, pick a service, and a vetted professional shows up. No phone calls, no haggling, no surprises — here\'s the full picture.',
    readTime: '3 min read',
    date: 'April 28, 2026',
    category: 'Getting Started',
    content: `
## Book a home service in three steps

Most home service booking involves calling around, waiting for quotes, and hoping the person who shows up is reliable. We built Lintel to eliminate every one of those pain points.

### Step 1 — Enter your address

Type your home address into the search box. This tells us which professionals are available in your area and confirms we serve your location.

### Step 2 — Choose your service

Pick from our menu of services — gutter cleaning, pressure washing, window cleaning, house cleaning, deep cleaning, or lawn mowing. Every service has a flat starting price listed upfront. No surprise quotes after the fact.

### Step 3 — Confirm and relax

Log in with Google (one tap), review the booking, and submit. A vetted pro will arrive at the scheduled time. You'll get a notification when they're on their way and when the job is marked complete.

## How payment works

We don't charge your card when you book. Once the professional marks the job complete, they'll give you a **confirmation code**. You enter that code in the app — that's your signal that you've seen the work and are satisfied. Only then does your payment go through.

Don't like what you see? Don't enter the code. Contact our support team and we'll make it right.

## What about tips?

After confirming a job, you'll have the option to add a tip. 100% of any tip goes directly to the worker. It's entirely optional, but it goes a long way for pros who do great work.

## Rescheduling or canceling

Plans change. You can cancel or reschedule a booking any time before the pro is dispatched, with no charge.
    `,
  },
  {
    slug: 'why-choose-lintel',
    title: 'Why Choose Lintel Over Calling Around',
    excerpt: 'Background-checked pros, transparent pricing, and you only pay after the job is done. Here\'s why thousands of homeowners are switching to on-demand home services.',
    readTime: '4 min read',
    date: 'April 22, 2026',
    category: 'Why Lintel',
    content: `
## The old way is broken

You need your gutters cleaned. So you Google "gutter cleaning near me," call three companies, leave two voicemails, get one callback with a quote that feels too high, and eventually just... put it off.

We've all been there. Lintel exists to fix this.

## Vetted professionals only

Every worker on Lintel is background-checked before they ever receive a job. We also use a live rating system — pros with low ratings stop receiving bookings. You can see a worker's rating and job count before they show up.

This isn't a random freelancer marketplace. It's a curated network of home service professionals who've earned their spot.

## Flat, upfront pricing

No quotes. No "I'll send you an estimate." Every service has a published starting price. You know what you're paying before you book. The only variable is add-ons you explicitly choose.

## Pay after confirmation — not before

This is the biggest differentiator. Your card is authorized when you book (to reserve the slot), but nothing is captured until you confirm the job is complete with a code the pro gives you. If the work isn't satisfactory, you don't enter the code, and you owe nothing while we investigate.

This puts the power where it belongs: with you.

## Satisfaction guaranteed

If you're not happy with the work, we'll send someone back to make it right — at no additional charge. No hoops, no lengthy disputes. Just contact support and we'll handle it.

## Book in under 2 minutes

From landing page to confirmed booking: enter your address, pick a service, log in with Google, confirm. That's it. No account setup, no payment form hunting — your card is saved after the first booking.
    `,
  },
  {
    slug: 'why-not-buy-your-own-machine',
    title: 'Should You Buy Your Own Pressure Washer? (Spoiler: Probably Not)',
    excerpt: 'The math on buying vs. booking a pressure washer — and why the "ownership" option costs far more than the sticker price suggests.',
    readTime: '5 min read',
    date: 'April 15, 2026',
    category: 'Tips & Advice',
    content: `
## The tempting logic of buying your own machine

You need your driveway pressure washed. A quick Amazon search turns up a decent electric pressure washer for $150–$300. You think: "I'll use it every spring. Over a few years I'll come out ahead."

It's a reasonable thought. Let's run the actual numbers.

## The real cost of ownership

### Purchase price
A consumer-grade electric pressure washer: **$150–$300**. A gas-powered unit that actually moves tough grime: **$400–$800**.

### Hose and accessories
The machine rarely comes with a quality hose. Add a surface cleaner attachment for driveways: **$40–$80** more.

### Storage
Where does it live? If you don't have a garage or shed, you're buying a cover or renting space. Even with a garage, it's a bulky item taking up permanent real estate.

### Maintenance
Gas models need oil changes, fresh fuel every season, and carburetor cleaning if stored improperly. Electric models need pump maintenance and o-ring replacements. Budget **$20–$50/year** and 1–2 hours of your time.

### Learning curve and mistakes
Consumer machines run at lower PSI than professional units. More importantly, wrong technique on the wrong surface — wood siding, certain pavers, roof shingles — causes real damage. Professional operators know which nozzle at which distance for each material. Homeowners learn the hard way.

### Actual usage
Most people pressure wash their driveway and maybe a deck once a year. Amortized over 5 years, even a $200 machine plus accessories plus maintenance puts your cost per use at **$60–$100** — before your time.

## What Lintel charges

A professional pressure washing job starts at **$149**. That includes a commercial-grade machine, the right detergents, a trained operator, and a satisfaction guarantee. No storage. No maintenance. No learning curve.

The "buy it yourself" math only works if you're doing multiple surfaces every season. For most homeowners — a driveway or deck once a year — you're better off booking.

## The same logic applies to other services

- **Gutter cleaning**: Commercial-grade vacuums and blowers, plus working safely on a ladder at height, is a professional skill. The equipment alone runs $500+.
- **Window cleaning**: Streak-free results on second-story windows require a water-fed pole system ($300–$800) and purified water.
- **Lawn mowing**: If you already have a mower, this one's closer. But the time and upkeep of mower ownership starts looking expensive once you factor in your Saturday afternoon.

## The honest bottom line

Buy the equipment if you genuinely enjoy doing the work and do it frequently. If you're buying it purely to save money, the math usually doesn't work — and the time and hassle definitely don't.
    `,
  },
  {
    slug: 'how-our-commission-works',
    title: 'How Lintel\'s Commission Split Works',
    excerpt: 'We believe professionals should earn a fair share. Here\'s exactly how the money moves on every Lintel job — including what happens with promo codes.',
    readTime: '3 min read',
    date: 'April 8, 2026',
    category: 'For Professionals',
    content: `
## Transparency over fine print

A lot of gig platforms bury their fee structures. We'd rather just tell you exactly how it works.

## The standard split

On every completed job, Lintel takes **60%** of the job fee and the worker takes **40%**.

**Example**: A $149 pressure washing job → worker earns **$59.60**.

That 60% covers platform operations, payment processing, insurance, customer support, marketing that fills your calendar, and background check costs. The 40% is a real, immediate transfer to the worker's connected bank account via Stripe — typically within 1–2 business days.

## Why 40%?

Traditional staffing agencies take 40–50% of what a client pays, and the worker sees less. Job boards charge subscription fees. Lintel charges nothing upfront — you pay only when you earn.

More importantly, Lintel handles everything you'd otherwise spend time and money on: customer acquisition, payment processing, dispute resolution, and scheduling infrastructure. The 40% is what you take home after all of that is handled for you.

## What changes with a promo code

When a customer uses a **referral or promo code**, the split adjusts to account for the person whose code it was:

| Party | Standard | With Promo Code |
|-------|----------|-----------------|
| Lintel platform | 60% | 25% |
| Service worker (you) | 40% | 40% |
| Promo code earner | — | 35% |

The **service worker always keeps 40%** — that never changes. The promo adjustment comes out of Lintel's share, not yours.

## Tips are 100% yours

After a job is confirmed, customers can optionally add a tip. Every dollar of every tip goes directly to you. Lintel takes nothing from tips.

## Stripe Connect onboarding

Payouts are processed through Stripe Connect. Before you can receive transfers, you'll need to complete a one-time Stripe onboarding (identity verification and bank account details). This is required by payment regulations — it's not a Lintel policy — and it takes about 5 minutes.

Once onboarded, your earnings transfer automatically after each job is confirmed.

## Questions?

If you have questions about your earnings or a specific payout, contact support through the app. We're transparent about every transaction and can provide a full breakdown for any job.
    `,
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white pb-20">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="lintel" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-white text-xl font-black tracking-tight">lintel</span>
          </Link>
          <nav className="hidden md:flex items-center">
            <Link to="/#services"     className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">Services</Link>
            <Link to="/#how-it-works" className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">How it works</Link>
            <Link to="/worker/register" className="px-4 h-10 flex items-center text-white/70 hover:text-white text-sm font-medium transition-colors">Earn with us</Link>
            <Link to="/blog" className="px-4 h-10 flex items-center text-white text-sm font-medium transition-colors border-b-2 border-white">Blog</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 h-9 flex items-center text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors">Log in</Link>
            <Link to="/login" className="px-4 h-9 flex items-center bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-uber-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Lintel Blog</p>
          <h1 className="text-5xl font-black text-white leading-tight">
            Tips, guides, and<br />honest advice.
          </h1>
          <p className="text-uber-gray-400 text-lg mt-4 max-w-lg">
            Everything you need to know about home services — from how to book to whether it's worth buying your own equipment.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-uber-gray-50 rounded-3xl p-8 flex flex-col justify-between hover:bg-uber-gray-100 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 h-7 flex items-center bg-black text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-uber-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-black text-black leading-tight mb-3 group-hover:underline underline-offset-2">
                  {post.title}
                </h2>
                <p className="text-uber-gray-500 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between mt-8">
                <span className="text-uber-gray-400 text-xs">{post.date}</span>
                <span className="flex items-center gap-1.5 text-black text-sm font-semibold">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 mt-8">
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
    </div>
  );
}
