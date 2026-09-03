// ---------------------------------------------------------------------------
// Stripe hosted links for the V.I.P. Wash Club membership.
//
// These are PUBLIC URLs (safe to commit) that come from your Stripe dashboard:
//
//   STRIPE_PAYMENT_LINK  – the recurring ($25/mo) subscription Payment Link.
//     Stripe Dashboard → Payment Links → New → your "V.I.P. Wash Club" price.
//     Looks like:  https://buy.stripe.com/xxxxxxxxxxxx
//
//   STRIPE_PORTAL_LINK   – the Customer Portal login link (member sign-in).
//     Stripe Dashboard → Settings → Billing → Customer portal → activate,
//     then copy the shareable login link.
//     Looks like:  https://billing.stripe.com/p/login/xxxxxxxxxxxx
//
// While these are empty the "Join V.I.P." buttons keep their in-page behavior
// and the "Member Login" link stays hidden. Paste the real URLs to go live.
// ---------------------------------------------------------------------------

export const STRIPE_PAYMENT_LINK = "";
export const STRIPE_PORTAL_LINK = "";

// Where the Contact form sends messages. The form opens the visitor's email
// app pre-addressed to this inbox. Change it or swap in a JotForm embed later.
export const CONTACT_EMAIL = "jemsholdingsinc@gmail.com";
