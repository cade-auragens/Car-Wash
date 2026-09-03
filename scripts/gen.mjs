// Page generator for the Firehouse Carwash multi-page site.
// Run from the repo root:  node scripts/gen.mjs
// It writes one static .html file per route; Vite treats each as an entry.
import { writeFileSync } from "node:fs";

const NAV = [
  { label: "Wash Plans", href: "/plans", key: "plans" },
  { label: "Locations", href: "/locations", key: "locations" },
  { label: "Heroes & Foundation", href: "/foundation", key: "foundation" },
  { label: "Our Story", href: "/story", key: "story" },
  { label: "Community", href: "/community", key: "community" },
  { label: "Contact", href: "/contact", key: "contact" },
];

const header = (active) => `    <div class="topbar">
      <div class="wrap">
        <div class="l">
          <span>📞 (519) 796 6323</span>
          <span>📞 (519) 990 6431</span>
        </div>
        <div class="r">
          <span>🕖 Self-Serve 24/7 · Express 7 AM – 8 PM</span>
        </div>
      </div>
    </div>

    <header>
      <div class="wrap">
        <a class="logo" href="/"><img data-logo alt="Firehouse Carwash" class="logo-img" /></a>
        <nav class="main" id="mainNav">
${NAV.map(
  (n) =>
    `          <a class="link${n.key === active ? " active" : ""}" href="${n.href}">${n.label}</a>`
).join("\n")}
          <a class="link" id="memberLogin" data-cta="login" href="/plans" hidden>Member Login</a>
          <a class="btn btn-primary btn-sm" data-cta="join" href="/plans">
            <span class="star">✦</span> Join the Club
          </a>
        </nav>
        <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
      </div>
    </header>`;

const footer = () => `    <footer>
      <div class="foot-top">
        <div>
          <div class="foot-logo">
            <img data-logo alt="Firehouse Carwash" style="height: 76px; width: auto" />
          </div>
          <p>
            A clean car says a lot. Self-serve, touch-free, and power vacuums
            across Leamington, Lakeshore, and Belle River — open seven days a
            week.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="/plans">Wash Plans</a></li>
            <li><a href="/locations">Locations</a></li>
            <li><a href="/foundation">Heroes &amp; Foundation</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="/story">Our Story</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/plans">Join the Club</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:15197966323">(519) 796 6323</a></li>
            <li><a href="tel:15199906431">(519) 990 6431</a></li>
            <li><a href="mailto:firehallcarwash@gmail.com">firehallcarwash@gmail.com</a></li>
            <li>134 Talbot St E, Leamington</li>
            <li>Self-serve &amp; IBA 24 hrs · Express 7 AM – 8 PM</li>
          </ul>
        </div>
      </div>
      <div class="foot-bot">
        © 2026 Firehouse Carwash. All rights reserved. · Terms &amp; Support ·
        Privacy Policy
      </div>
    </footer>`;

const shell = ({ title, desc, active, body }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
${header(active)}

${body}

${footer()}

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;

const pageHead = (eyebrow, title, sub) => `    <section class="page-head">
      <div class="wrap">
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title}</h1>
        ${sub ? `<p>${sub}</p>` : ""}
      </div>
    </section>`;

// ---------- reusable content blocks ----------
const finder = `    <div class="finder">
      <div class="wrap">
        <div class="lead">
          <div class="pin">📍</div>
          <div>
            <h3>Find a Firehouse Near You</h3>
            <p>Four locations across Leamington, Lakeshore &amp; Belle River — open 7 days a week.</p>
          </div>
        </div>
        <div class="chips">
          <a href="/locations">Leamington</a>
          <a href="/locations">Lakeshore</a>
          <a href="/locations">Belle River</a>
          <a href="/locations">All Locations ›</a>
        </div>
      </div>
    </div>`;

const clubBand = `    <section class="club blk" id="club">
      <div class="wrap">
        <div class="club-card">
          <div class="kicker">Unlimited Monthly Wash</div>
          <h3>Join the Unlimited Wash Club</h3>
          <div class="big">$25<span style="font-size: 18px; font-weight: 600">/mo</span></div>
          <p>Your new favorite membership. Wash as often as you like for one flat monthly price at any Firehouse location.</p>
          <ul>
            <li>Unlimited monthly car washes</li>
            <li>Undercarriage rinse &amp; foaming brush</li>
            <li>Tire &amp; wheel cleaner + spot-free rinse</li>
            <li>Bring-a-friend washes</li>
          </ul>
          <a class="btn btn-gold" data-cta="join" href="/plans"><span class="star">✦</span> Join the Club <span class="arw">›</span></a>
        </div>
        <div class="club-card solid">
          <div class="kicker">Not ready to join?</div>
          <h3>Buy a Single Wash</h3>
          <p>Prefer to pay as you go? Pick your level of shine — from a quick Basic rinse to the full Ultimate treatment.</p>
          <ul>
            <li>1 Alarm — $10</li>
            <li>2 Alarm — $14 · most popular</li>
            <li>3 Alarm — $18</li>
          </ul>
          <a class="btn btn-primary" href="#pricing">Select Your Wash <span class="arw">›</span></a>
        </div>
      </div>
    </section>`;

const pricingBand = `    <section class="pricing blk" id="pricing">
      <div class="wrap">
        <div class="sec-head">
          <div class="eyebrow" style="color: var(--gold)">Our Pricing</div>
          <h2>Wash Packages</h2>
          <p>Fire House Car Wash automatic packages. Pick your level of shine.</p>
        </div>
        <div class="plan-grid">
          <div class="plan">
            <div class="plan-top"><h3>1 Alarm</h3><div class="price">$10</div></div>
            <div class="plan-body">
              <div class="f">High-pressure soap</div>
              <div class="f">High-pressure rinse</div>
              <div class="f">Foaming brush</div>
            </div>
            <div class="plan-foot"><a class="btn btn-dark btn-sm" href="/locations">Get This Wash</a></div>
          </div>
          <div class="plan featured">
            <div class="ribbon">Most Popular</div>
            <div class="plan-top"><h3>2 Alarm</h3><div class="price">$14</div></div>
            <div class="plan-body">
              <div class="f">High-pressure soap</div>
              <div class="f">High-pressure rinse</div>
              <div class="f">Foaming brush</div>
              <div class="f">Tire &amp; wheel cleaner</div>
              <div class="f">Spot-free rinse</div>
            </div>
            <div class="plan-foot"><a class="btn btn-primary btn-sm" href="/locations">Get This Wash</a></div>
          </div>
          <div class="plan">
            <div class="plan-top"><h3>3 Alarm</h3><div class="price">$18</div></div>
            <div class="plan-body">
              <div class="f">High-pressure soap</div>
              <div class="f">High-pressure rinse</div>
              <div class="f">Foaming brush</div>
              <div class="f">Tire &amp; wheel cleaner</div>
              <div class="f">Spot-free rinse</div>
              <div class="f">Undercarriage rinse</div>
            </div>
            <div class="plan-foot"><a class="btn btn-dark btn-sm" href="/locations">Get This Wash</a></div>
          </div>
          <div class="plan vip">
            <div class="plan-top"><h3>3 Alarm+</h3><div class="price">$25</div></div>
            <div class="plan-body">
              <div class="f">Everything in 3 Alarm</div>
              <div class="f">Undercarriage rinse</div>
              <div class="f">Unlimited monthly carwash</div>
              <div class="f">Bring a friend &amp; wash</div>
            </div>
            <div class="plan-foot"><a class="btn btn-gold btn-sm" data-cta="join" href="/plans">Join the Club</a></div>
          </div>
        </div>
        <p class="plan-note">Prices vary slightly by location. Touch-free automatic (Ultimate $17 · Value $15 · Basic $13) available at our Car Wash location.</p>
      </div>
    </section>`;

const carouselBand = `    <section class="signature blk" id="signature">
      <div class="sec-head">
        <div class="eyebrow">Our Wash Menu</div>
        <h2>Signature Services</h2>
        <p>The latest technology and services to make your car wash experience better for your car — and the environment.</p>
      </div>
      <div class="carousel">
        <div class="track-mask">
          <div class="track" id="track">
            <div class="scard"><div class="art a1"><img class="art-img" data-sig="touchfree" alt="Touch-free foam being sprayed onto a car" /></div><div class="body"><div class="kicker">Touch-Free Technology</div><h3>Gentle on Your Vehicle, Tough on Dirt</h3><p>Advanced touch-free and soft-touch options with high-quality soaps that blast away road grime and salt while protecting your finish.</p></div></div>
            <div class="scard"><div class="art a2"><img class="art-img" data-sig="rinse" alt="Car being rinsed with water" /></div><div class="body"><div class="kicker">Spot-Free Rinse</div><h3>A Flawless, Streak-Free Shine</h3><p>Purified spot-free water rinses every panel so your car dries clean and spotless — no water marks left behind.</p></div></div>
            <div class="scard"><div class="art a3"><img class="art-img" data-sig="undercarriage" alt="High-pressure wash blasting away grime" /></div><div class="body"><div class="kicker">Undercarriage Blast</div><h3>Powerful Undercarriage Wash</h3><p>High-pressure jets clear away the road grime and corrosive winter salt hiding underneath your vehicle.</p></div></div>
            <div class="scard"><div class="art a4"><img class="art-img" data-sig="foam" alt="Car covered in cleaning foam" /></div><div class="body"><div class="kicker">Foaming Brush</div><h3>Deep-Clean Triple Foam</h3><p>A rich foaming brush lifts dirt from every surface for a thorough, gentle deep clean on your paint.</p></div></div>
            <div class="scard"><div class="art a5"><img class="art-img" data-sig="wheel" alt="Wheel and tire being cleaned" /></div><div class="body"><div class="kicker">Tire &amp; Wheel</div><h3>Bright, Detailed Wheels</h3><p>Dedicated tire &amp; wheel cleaner cuts through brake dust and grime to finish the look from the ground up.</p></div></div>
          </div>
        </div>
        <button class="car-btn car-prev" id="carPrev" aria-label="Previous">‹</button>
        <button class="car-btn car-next" id="carNext" aria-label="Next">›</button>
        <div class="car-dots" id="carDots"></div>
      </div>
    </section>`;

const locationsBand = `    <section class="locs blk" id="locations">
      <div class="wrap">
        <div class="sec-head">
          <div class="eyebrow">Our Locations</div>
          <h2>Four Ways to Get a Spotless Ride</h2>
          <p>Every Firehouse location is open seven days a week with power vacuums on site.</p>
        </div>
        <div class="loc-grid">
          <div class="loc"><div class="loc-top"><h3>Fire House Car Wash</h3></div><div class="loc-body"><div class="tags"><span>Self-Serve Bays</span><span>Vacuums</span></div><address>134 Talbot St E<br />Leamington, ON N8H 1L7</address><div class="hrs">7:00 AM – 8:00 PM · (519) 990 6431</div><a class="btn btn-primary btn-sm" href="/plans">View Pricing <span class="arw">›</span></a></div></div>
          <div class="loc"><div class="loc-top"><h3>Top Car Wash</h3></div><div class="loc-body"><div class="tags"><span>Premium Wash</span><span>Vacuums</span></div><address>187 Blanchard Drive<br />Lakeshore, ON N8H 2L9</address><div class="hrs">Open 24/7 · Rain or Shine</div><a class="btn btn-primary btn-sm" href="/plans">Soft &amp; Touch-Free <span class="arw">›</span></a></div></div>
          <div class="loc"><div class="loc-top"><h3>BR Self Serve</h3></div><div class="loc-body"><div class="tags"><span>Self-Serve Bays</span><span>Vacuums</span></div><address>1516–1524 Essex County Rd 22<br />Belle River, ON N8L 0R6</address><div class="hrs">Wash it your way · (519) 796 6323</div><a class="btn btn-primary btn-sm" href="/contact">Find Us <span class="arw">›</span></a></div></div>
          <div class="loc"><div class="loc-top"><h3>Car Wash — Touch Free</h3></div><div class="loc-body"><div class="tags"><span>Fast &amp; Affordable</span><span>Vacuums</span></div><address>Touch-free automatic<br />Ultimate · Value · Basic</address><div class="hrs">Ultimate $17 · Value $15 · Basic $13</div><a class="btn btn-primary btn-sm" href="/plans">See Wash Menu <span class="arw">›</span></a></div></div>
        </div>
      </div>
    </section>`;

const whyBand = `    <section class="why blk" id="why">
      <div class="wrap">
        <div class="sec-head"><div class="eyebrow">Why Choose Us</div><h2>A Wash for Every Need</h2></div>
        <div class="why-grid">
          <div class="why-cell"><div class="why-img"><img data-sig="touchfree" alt="Touch-free foam wash" /></div><div class="why-body"><h3>Touch-Free Technology</h3><p>Gentle on your vehicle, tough on dirt.</p></div></div>
          <div class="why-cell"><div class="why-img"><img data-sig="rinse" alt="Spot-free water rinse" /></div><div class="why-body"><h3>Spot-Free Rinse</h3><p>Leaves your car spotless and shiny.</p></div></div>
          <div class="why-cell"><div class="why-img"><img data-sig="undercarriage" alt="High-pressure undercarriage wash" /></div><div class="why-body"><h3>Powerful Undercarriage</h3><p>Blasts away road grime and salt.</p></div></div>
          <div class="why-cell"><div class="why-img"><img data-sig="foam" alt="A quick, thorough clean" /></div><div class="why-body"><h3>Fast &amp; Convenient</h3><p>Quality clean in just minutes.</p></div></div>
        </div>
      </div>
    </section>`;

const heroesBand = `    <section class="heroes blk" id="heroes">
      <div class="wrap">
        <div class="sec-head">
          <div class="eyebrow">We Back Our Heroes</div>
          <h2>First Responder &amp; Frontline Discounts</h2>
          <p>A thank-you to the people who keep our communities safe and healthy.</p>
        </div>
        <div class="hero-offers">
          <div class="offer"><div class="pct">20% OFF</div><h3>Memberships</h3><p>Save 20% on any Unlimited Wash Club membership, every month.</p></div>
          <div class="offer"><div class="pct">50% OFF</div><h3>Your First Car Wash</h3><p>Half off your very first wash with valid proof of employment.</p></div>
        </div>
        <div class="who-badges">
          <span>🚒 Firefighters</span>
          <span>🚑 EMS</span>
          <span>🎖️ Active Military</span>
          <span>🇨🇦 Veterans</span>
          <span>⚕️ Doctors &amp; Nurses</span>
        </div>
        <p class="offer-note">Valid proof of employment or service required. Ask an attendant to redeem — discounts available at all Firehouse Car Wash locations.</p>
      </div>
    </section>`;

const foundationBand = `    <section class="foundation blk" id="foundation">
      <div class="wrap found-wrap">
        <div class="found-media"><img data-firetruck alt="Red fire engine at a local station" /></div>
        <div class="found-body">
          <div class="eyebrow">Making a Difference</div>
          <h2>The Firehouse Foundation</h2>
          <p>We're proud to be setting up the Firehouse Foundation — giving back a portion of every wash to support the local fire departments in the communities each Firehouse Car Wash calls home.</p>
          <ul>
            <li>Supporting the Leamington fire department</li>
            <li>Supporting the Lakeshore fire department</li>
            <li>Supporting the Belle River fire department</li>
            <li>Localized giving at every Firehouse Car Wash location</li>
          </ul>
          <span class="found-badge">Coming Soon</span>
        </div>
      </div>
    </section>`;

const reviewsBand = `    <section class="testi blk" id="reviews">
      <div class="wrap">
        <div class="sec-head"><div class="eyebrow">Client Testimonials</div><h2>Our Members Say It Best</h2></div>
        <div class="t-grid">
          <div class="t-card"><div class="stars">★★★★★</div><div class="quote-title">My Go-To Car Wash</div><p>I can wash my car myself and take my time getting it exactly how I want it. The bays are clean, the equipment is easy to use, and the prices are great.</p><div class="who">— Fire House Car Wash customer</div></div>
          <div class="t-card"><div class="stars">★★★★★</div><div class="quote-title">Great Equipment &amp; Value</div><p>One of my favorite self-serve car washes in the area. The equipment works great, the water pressure is strong, and I get my car clean without spending a lot.</p><div class="who">— BR Self Serve customer</div></div>
          <div class="t-card"><div class="stars">★★★★★</div><div class="quote-title">Clean, Convenient &amp; Reliable</div><p>Whenever my car needs a good clean I come here. It's convenient, affordable, and I appreciate being able to choose exactly how I want to wash my car.</p><div class="who">— Top Car Wash customer</div></div>
        </div>
      </div>
    </section>`;

const insiderBand = `    <section class="insider blk" id="insider">
      <div class="wrap">
        <div class="eyebrow" style="color: #ffd9d2">Stay in the Loop</div>
        <h2>Become a Firehouse Insider</h2>
        <p>Join our mailing list for news, exclusive offers, and member promotions across all four locations.</p>
        <form class="nl-form" id="nlForm">
          <input type="email" required placeholder="Enter your email address" aria-label="Email address" />
          <button class="btn btn-dark" type="submit">Join the List <span class="arw">›</span></button>
        </form>
        <div class="nl-note" id="nlNote">We respect your inbox — offers only, no spam.</div>
        <div class="nl-done" id="nlDone">✓ You're on the list! Watch your inbox for Firehouse offers.</div>
      </div>
    </section>`;

// ---------- home ----------
const homeHero = `    <section class="hero" id="top">
      <div class="hero-media">
        <video id="heroVideo" class="hero-video" autoplay muted loop playsinline preload="auto"></video>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="wrap">
          <div class="eyebrow">Fast · Affordable · Always Spotless</div>
          <h1>A Clean Car<br />Says a Lot</h1>
          <p>Self-serve bays, touch-free automatics, and power vacuums across Leamington, Lakeshore &amp; Belle River — open seven days a week.</p>
          <div class="btns">
            <a class="btn btn-primary" data-cta="join" href="/plans"><span class="star">✦</span> Join the Unlimited Wash Club <span class="arw">›</span></a>
            <a class="btn btn-ghost" href="/locations">Find a Location</a>
          </div>
        </div>
      </div>
    </section>`;

const highlights = `    <section class="blk highlights-sec">
      <div class="wrap">
        <div class="sec-head"><div class="eyebrow">Explore Firehouse</div><h2>Everything a Clean Car Needs</h2></div>
        <div class="hl-grid">
          <a class="hl" href="/plans"><div class="hl-img"><img data-hl="plans" alt="Car wash plans" /></div><div class="hl-body"><h3>Wash Plans</h3><p>Single washes and the unlimited Wash Club.</p><span class="hl-go">Explore ›</span></div></a>
          <a class="hl" href="/locations"><div class="hl-img"><img data-hl="locations" alt="Our car wash locations" /></div><div class="hl-body"><h3>Locations</h3><p>Four spots across Leamington, Lakeshore &amp; Belle River.</p><span class="hl-go">Find us ›</span></div></a>
          <a class="hl" href="/foundation"><div class="hl-img"><img data-hl="foundation" alt="Fire engine" /></div><div class="hl-body"><h3>Heroes &amp; Foundation</h3><p>First-responder discounts and giving back to local fire departments.</p><span class="hl-go">Learn more ›</span></div></a>
          <a class="hl" href="/story"><div class="hl-img"><img data-hl="story" alt="A family-run car wash" /></div><div class="hl-body"><h3>Our Story</h3><p>A local, family-run, firehouse-themed car wash.</p><span class="hl-go">Meet us ›</span></div></a>
          <a class="hl" href="/community"><div class="hl-img"><img data-hl="community" alt="Community volunteers" /></div><div class="hl-body"><h3>Community</h3><p>Family-friendly and proud to support our towns.</p><span class="hl-go">Get involved ›</span></div></a>
        </div>
      </div>
    </section>`;

// ---------- story ----------
const storyBody = `${pageHead("Our Story", "Built by Locals, for Locals", "A family-run, firehouse-themed car wash proud to call Leamington, Lakeshore &amp; Belle River home.")}
    <section class="story blk">
      <div class="wrap story-wrap">
        <div class="story-media"><img data-firetruck alt="Fire engine — the heart of the Firehouse theme" /></div>
        <div class="story-body">
          <div class="eyebrow">How It Started</div>
          <h2>A Clean Car Says a Lot</h2>
          <p>Firehouse Carwash grew out of a simple idea: give our neighbours a fast, affordable, genuinely great place to wash their cars — with a firehouse theme that makes the whole family smile. From self-serve bays to touch-free automatics and power vacuums, every location is built to get you a spotless ride in minutes.</p>
          <p>Today we're proud to run four locations across Leamington, Lakeshore, and Belle River, open seven days a week. We keep our bays clean, our equipment dialed in, and our prices fair — because a clean car really does say a lot.</p>
        </div>
      </div>
    </section>

    <section class="team blk" style="background:var(--smoke)">
      <div class="wrap">
        <div class="sec-head"><div class="eyebrow">Meet the Team</div><h2>The People Behind Firehouse</h2><p>Questions about a wash, a location, or a membership? These are the folks who can help.</p></div>
        <div class="team-grid">
          <div class="team-card"><div class="team-avatar">JW</div><h3>Jeff</h3><div class="team-role">Owner / Operator</div><p>Happy to help with anything from wash packages to memberships across all four locations.</p></div>
          <div class="team-card"><div class="team-avatar">RW</div><h3>Rick</h3><div class="team-role">Owner / Operator</div><p>Keeps the bays clean, the equipment running, and every visit quick and easy.</p></div>
          <div class="team-card"><div class="team-avatar">🚒</div><h3>The Firehouse Team</h3><div class="team-role">On-site crew</div><p>Friendly faces at every location, making sure your car — and your day — go smoothly.</p></div>
        </div>
      </div>
    </section>`;

// ---------- community ----------
const communityBody = `${pageHead("Community", "Proud to Serve Our Towns", "Family-friendly, community-first, and always giving back to the people who keep us safe.")}
    <section class="blk">
      <div class="wrap community-grid">
        <div class="comm-card"><div class="comm-img"><img data-comm="family" alt="A happy family" /></div><div class="comm-body"><h3>Family Friendly</h3><p>Our firehouse theme is built for families — a car wash the kids actually get excited about. Fast, fun, and spotless every time.</p></div></div>
        <div class="comm-card"><div class="comm-img"><img data-comm="fire" alt="A red fire engine" /></div><div class="comm-body"><h3>Backing Local Fire Departments</h3><p>Through the <a href="/foundation" style="color:var(--fire);font-weight:600">Firehouse Foundation</a>, we give back a portion of every wash to the fire departments in the towns we serve.</p></div></div>
        <div class="comm-card"><div class="comm-img"><img data-comm="responders" alt="Firefighters in gear" /></div><div class="comm-body"><h3>Thanking First Responders</h3><p>Firefighters, EMS, military, veterans, and healthcare workers get <a href="/foundation" style="color:var(--fire);font-weight:600">special discounts</a> as our way of saying thank you.</p></div></div>
        <div class="comm-card"><div class="comm-img"><img data-comm="volunteers" alt="Community volunteers handing out aid" /></div><div class="comm-body"><h3>Out in the Community</h3><p>From local events to neighbourhood fundraisers, we love showing up for Leamington, Lakeshore, and Belle River.</p></div></div>
      </div>
    </section>

    <section class="club blk">
      <div class="wrap" style="display:block;text-align:center;max-width:720px">
        <div class="kicker" style="color:var(--gold);font-family:'Poppins';font-weight:600;letter-spacing:.14em;text-transform:uppercase;font-size:12px;margin-bottom:12px">Get Involved</div>
        <h2 style="font-size:clamp(28px,3.6vw,44px);font-weight:800">Have a Community Event?</h2>
        <p style="font-size:17px;margin:14px 0 26px;opacity:.95">We'd love to be part of it. Reach out and let's find a way to support your school, team, or fundraiser.</p>
        <a class="btn btn-gold" href="/contact">Get in Touch <span class="arw">›</span></a>
      </div>
    </section>`;

// ---------- contact ----------
const contactBody = `    <section class="contact-logo">
      <div class="wrap">
        <img data-logo class="contact-logo-img" alt="Firehouse Carwash" />
        <p class="contact-logo-sub">Ready when you are — scroll down to get in touch.</p>
        <a href="#contact-form" class="scroll-cue" aria-label="Scroll to the contact form">↓</a>
      </div>
    </section>
    <section class="blk" id="contact-form">
      <div class="wrap contact-grid">
        <div class="cform-wrap">
          <h2>Send Us a Message</h2>
          <form class="cform" id="cform">
            <div class="cf-row">
              <label>Name<input type="text" name="name" required /></label>
              <label>Email<input type="email" name="email" required /></label>
            </div>
            <div class="cf-row">
              <label>Phone<input type="tel" name="phone" /></label>
              <label>Location<select name="location"><option>Leamington</option><option>Lakeshore</option><option>Belle River</option><option>Not sure</option></select></label>
            </div>
            <label>Message<textarea name="message" rows="5" required></textarea></label>
            <button class="btn btn-primary" type="submit">Send Message <span class="arw">›</span></button>
            <div class="cform-done" id="cformDone">✓ Thanks! Your email app should open with your message ready to send.</div>
          </form>
        </div>
        <div class="info-card">
          <h4>Visit Fire House Car Wash</h4>
          <div class="line"><span class="k">Phone</span><span><a href="tel:15197966323">(519) 796 6323</a> · <a href="tel:15199906431">(519) 990 6431</a></span></div>
          <div class="line"><span class="k">Email</span><span><a href="mailto:firehallcarwash@gmail.com">firehallcarwash@gmail.com</a></span></div>
          <div class="line"><span class="k">Address</span><span>134 Talbot St E, Leamington, ON N8H 1L7</span></div>
          <div class="line"><span class="k">Hours</span><span>Self-serve &amp; IBA open 24 hours · Express tunnels 7:00 AM – 8:00 PM</span></div>
          <div class="line"><span class="k">On site</span><span>Self-serve bays · Power vacuums · Coin &amp; card payment</span></div>
        </div>
      </div>
    </section>`;

// ---------- assemble pages ----------
const pages = {
  "index.html": shell({
    title: "Firehouse Carwash | A Clean Car Says a Lot — Leamington, Lakeshore & Belle River",
    desc: "Firehouse Carwash — self-serve bays, touch-free automatics, and power vacuums across Leamington, Lakeshore & Belle River. First-responder discounts and an unlimited wash club.",
    active: "home",
    body: `${homeHero}\n\n${highlights}\n\n${reviewsBand}\n\n${insiderBand}`,
  }),
  "plans.html": shell({
    title: "Wash Plans & Membership | Firehouse Carwash",
    desc: "Firehouse Carwash wash packages and the unlimited Wash Club — 1 Alarm, 2 Alarm, 3 Alarm, and 3 Alarm+.",
    active: "plans",
    body: `${pageHead("Wash Plans", "Pick Your Level of Shine", "From a quick 1 Alarm wash to the unlimited Wash Club.")}\n\n${clubBand}\n\n${pricingBand}\n\n${carouselBand}`,
  }),
  "locations.html": shell({
    title: "Locations | Firehouse Carwash — Leamington, Lakeshore & Belle River",
    desc: "Four Firehouse Carwash locations across Leamington, Lakeshore, and Belle River — open seven days a week with power vacuums.",
    active: "locations",
    body: `${pageHead("Locations", "Four Ways to Get a Spotless Ride", "Open seven days a week with power vacuums on site.")}\n\n${finder}\n\n${locationsBand}\n\n${whyBand}`,
  }),
  "foundation.html": shell({
    title: "Heroes & The Firehouse Foundation | Firehouse Carwash",
    desc: "First-responder discounts and the Firehouse Foundation — giving back to the local fire departments in Leamington, Lakeshore, and Belle River.",
    active: "foundation",
    body: `${pageHead("Heroes & Foundation", "We Back Our Heroes", "First-responder discounts — and giving back to the local fire departments in every town we serve.")}\n\n${heroesBand}\n\n${foundationBand}`,
  }),
  "story.html": shell({
    title: "Our Story | Firehouse Carwash",
    desc: "The story behind Firehouse Carwash — a local, family-run, firehouse-themed car wash serving Leamington, Lakeshore, and Belle River.",
    active: "story",
    body: storyBody,
  }),
  "community.html": shell({
    title: "Community | Firehouse Carwash",
    desc: "Firehouse Carwash is family-friendly and community-first — supporting local fire departments and first responders across our towns.",
    active: "community",
    body: communityBody,
  }),
  "contact.html": shell({
    title: "Contact | Firehouse Carwash",
    desc: "Get in touch with Firehouse Carwash — questions about a wash, a location, or a membership.",
    active: "contact",
    body: contactBody,
  }),
};

for (const [name, html] of Object.entries(pages)) {
  writeFileSync(name, html);
  console.log("wrote", name);
}
