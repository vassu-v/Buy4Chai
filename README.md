<div align="center">
  <img src="public/logo.svg" width="120" alt="Buy4Chai Logo" />
  <h1>Buy4Chai</h1>
  <p><b>The headless tip jar — bring your own payment gateway.</b></p>
  <p>A static, self-hosted supporter page where <i>you</i> own the gateway, the domain, the deployment, and every rupee. Built for the 2B+ developers Stripe forgot.</p>

  <p>
    <img src="https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind-blue?style=flat-square" alt="Stack" />
    <img src="https://img.shields.io/badge/Fees-0%25-green?style=flat-square" alt="Fees" />
    <img src="https://img.shields.io/badge/License-MIT-orange?style=flat-square" alt="License" />
  </p>

  <p>
    <a href="#quick-start"><strong>Quick Start</strong></a> •
    <a href="#bring-your-own-gateway"><strong>BYO Gateway</strong></a> •
    <a href="https://buy4-chai.vercel.app/"><strong>View Template</strong></a> •
    <a href="https://buy4chai-vassu-v.vercel.app/"><strong>Live Demo</strong></a> •
    <a href="#why-this-exists"><strong>Why</strong></a>
  </p>

  <p>
    <a href="https://buy4chai-vassu-v.vercel.app/">
      <img src="https://buy4chai-vassu-v.vercel.app/badges/personal.svg" alt="Support & Make Badge" />
    </a>
  </p>
</div>

---

## Why This Exists

If you're a developer outside the US/UK/EU, you've hit this wall:

- **Buy Me a Coffee** — Stripe — doesn't work
- **Ko-fi** — Stripe — doesn't work
- **GitHub Sponsors** — Stripe — doesn't work
- **PayPal** — 4–5% fees + painful FIRC compliance per payout
- **A UPI/PIX/M-Pesa link in your README** — janky, unprofessional, breaks on desktop

The problem isn't tipping. It's that every tipping platform is welded to one payment rail — and that rail isn't yours.

**Buy4Chai inverts the model.** The platform is a static site. The payment gateway is whatever works in your country. Wire them together once, deploy once, own the result forever.

---

## Bring Your Own Gateway

Most tip platforms are welded to Stripe. Buy4Chai is welded to nothing.

The project defines a formal **Gateway Contract** in [`docs/gateway.md`](./docs/gateway.md):

- **Tier 1** — Redirect flow — any gateway with a hosted checkout URL
- **Tier 2** — SDK flow — any gateway with a JS SDK
- 100% static, zero backend, public keys only

To add a new gateway, you don't wait for a PR. You don't file an issue. Paste this prompt into Claude / Cursor / Copilot along with your gateway's docs:

```
"Read `docs/gateway.md` and the attached documentation for [Gateway Name]. Follow the architectural best practices and the 'Gateway Contract' defined in `docs/gateway.md`. Decide whether to follow the Tier 1 (Redirect) or Tier 2 (SDK) flow based on the provided docs. Implement `src/gateways/[name].js` ensuring 100% static compliance and zero-backend logic."
```

> [!TIP]
> Clone the repo, open your AI agent, attach your payment gateway's documentation, and let the agent run. Provide your Public Key ID when asked — that's the whole setup.

That's how **Razorpay** got built. That's how **Dodo Payments** got built. The same prompt + docs gives you:

| Gateway | Status |
|---|---|
| Razorpay | ✅ Shipped |
| Dodo Payments | 🟡 Partial build |
| Stripe / Paddle / Lemon Squeezy | 🟡 5-min build |

If your country has a gateway with API docs, Buy4Chai supports it. You're one prompt away.

---

## Quick Start

```bash
# 1. Fork & clone
git clone https://github.com/YOUR_USERNAME/Buy4Chai.git
cd Buy4Chai && npm install && npm run dev

# 2. Open the setup wizard
# Default URL: http://localhost:3000/#setup?key=chai123

# 3. Fill 6 steps. Copy the generated config to chai.config.js. Push.

# 4. Deploy to Vercel/Netlify. Done!
```

⏱ **~10 minutes** if you already have a gateway account.  
🎬 **[Full walkthrough](#tutorial)** if you want to see it in action first.

> [!NOTE]
> Use the AI Prompts and BYO Gateway guide below to set up instantly while you work, then one-click deploy with Vercel or any other service — exactly as shown in the video.
>
> *We used Jules async on the web to build this instantly.*

---

## You Own This

There's no SaaS here — no account system, no platform that sees your money, your supporters' data, or your traffic. Your fork is your fork. If this repo disappears tomorrow, your deployment keeps working.

That's not a side effect. It's the design.

---

## What Makes It Different

- **Narrative-first layout** — Move beyond transactional forms. An editorial design that lets you tell your story, show your work, and build real connection with supporters.
- **Dual-currency engine** — Set prices in USD, receive in your local currency. Supporters toggle currencies in real-time with automatic conversion.
- **0% platform fees** — Money moves directly from supporter to gateway. No middleman, no cut.
- **Self-hosted sovereignty** — You own the deployment. No platform accounts, no vendor lock-in — host on Vercel, GitHub Pages, or Netlify for free.
- **Protected onboarding** — A 6-step setup wizard (`/#setup`) handles everything from identity to gateway keys, gated by a security key for production safety.

---

## Secure by Design

- **Public keys only** — Buy4Chai never asks for secret keys. Your config is safe to be public.
- **Setup lockdown** — Disable the configuration wizard in production with a single toggle.
- **Route protection** — Your setup route is gated by a unique key known only to you.

---

## The Experience

| **Storytelling** | **Project Showcase** | **Dual Currency** |
| :--- | :--- | :--- |
| Build a narrative around your work. Let people know *why* they should support you. | Pin your best open-source projects with high-quality preview cards. | Automatic USD/Local conversion with a simple supporter-facing toggle. |

---

## Tutorial

Watch the setup wizard and supporter payment flow in action:

**[Watch the walkthrough video →](https://buy4-chai.vercel.app/complete.mp4)**

---

## AI-Powered Setup

Don't want to fill the config manually? Hand this prompt to any AI agent — Claude, Copilot, Cursor, Jules, whatever you use.

**Step 1** — Fork the repo and open it in your AI agent.

**Step 2** — Copy your profile content from wherever you exist online — GitHub, LinkedIn, Twitter, your personal site, anywhere. Paste the raw text directly into chat. No links needed; the AI doesn't need to browse the web.

**Step 3** — Paste this prompt followed by your copied content:

```
I want to set up my Buy4Chai supporter page.
I've pasted my profile content below from my online profiles.

Please do the following:

1. Read through everything I've pasted and extract the following:
   - My name
   - A short bio (one or two lines, friendly and human)
   - My avatar/profile image if mentioned or linked
   - My social links (GitHub, LinkedIn, Twitter, website)
   - My best projects worth pinning — name, description, link, and preview image if available

2. Before writing anything, show me what you found and confirm with me:
   - Which projects should be pinned and in what order?
   - Is the bio accurate or should it be reworded?
   - Ask me if I have a profile photo or avatar I want to use
   - Ask me if I have any gallery images I want to show
   - Ask me what thank you message I want supporters to see after they pay

3. Once I've confirmed everything, write it all to `chai.config.js` only. Do not touch any other file. The structure of `chai.config.js` is already in the repo — follow it exactly, just fill in my real values.

4. Rename the personal badge in `public/badges/personal.svg` — replace the placeholder name with my actual name.

5. Once done, verify the full flow:
   - Does the page load correctly?
   - Does the payment modal open?
   - Does the thank you screen appear on success?

6. Give me a clean summary of everything that was added and what my next step is to deploy.

Important rules you must follow:
- Only edit `chai.config.js` and the personal badge — nothing else
- Never ask for or use a secret or private key
- If any information is missing from what I pasted, ask me directly rather than guessing or making something up
- Always confirm with me before writing anything to any file
- Do not assume I use any specific platform — work with whatever content I provide

---

[PASTE YOUR PROFILE CONTENT HERE — from any platform, any format, just copy and paste the text]
```

**Step 4** — Answer the agent's questions, confirm your config, deploy.

> [!TIP]
> Want custom colors? Tell your AI agent: "Change the accent color to [your color] by updating the CSS variables in index.css" — it'll handle the rest in seconds.

---

## Add to Your README

Pick a badge style that fits your project:

| Style | Preview |
| :--- | :--- |
| **Mono-Chai** | ![Mono-Chai](public/badges/standard.svg) |
| **Bento-Box** | ![Bento-Box](public/badges/personal.svg) |
| **Light Pill** | ![Light Pill](public/badges/buy4chai.svg) |
| **Classic** | ![Classic](public/badges/badge.svg) |
| **Shields.io** | ![Shields](https://img.shields.io/badge/Support-Buy4Chai-8B5E3C?style=for-the-badge&logo=coffee&logoColor=white) |

**Mono-Chai**
```markdown
[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/standard.svg)](https://your-deployment-url.vercel.app)
```

**Bento-Box**
```markdown
[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/personal.svg)](https://your-deployment-url.vercel.app)
```

**Light Pill**
```markdown
[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/buy4chai.svg)](https://your-deployment-url.vercel.app)
```

**Classic**
```markdown
[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/badge.svg)](https://your-deployment-url.vercel.app)
```

**Shields.io**
```markdown
[![Support](https://img.shields.io/badge/Support-Buy4Chai-8B5E3C?style=for-the-badge&logo=coffee&logoColor=white)](https://your-deployment-url.vercel.app)
```

*(Replace `your-deployment-url.vercel.app` with your actual live URL.)*

> [!TIP]
> For the **Bento-Box** style, use your own deployment link as the image source — e.g. `https://your-name.vercel.app/badges/personal.svg` — for full control over your branding.

---

## Not Just India

Buy4Chai started as a fix for Indian developers locked out of Stripe. But "locked out of Stripe" describes most of the developer world:

- **Latin America** — Stripe limited; PIX, Mercado Pago, dLocal dominate
- **Africa** — M-Pesa, Flutterwave, Paystack
- **Southeast Asia** — Midtrans, GoPay, GCash
- **MENA** — PayTabs, Tap, HyperPay

If you ship a gateway adapter for your region, open a PR — we'll feature your country in the README.

---

## Adapters in the Wild

| Project | Gateway |
|---|---|
| @vassu-v | Razorpay |
| *(yours here — open a PR)* | |

---

## Community

<div align="center">
  <img src="screenshots/community_1.png" alt="Community feedback 1" width="45%" />
  <img src="screenshots/community_2.png" alt="Community feedback 2" width="45%" />
  <br>
  <img src="screenshots/community_3.png" alt="Community feedback 3" width="70%" />
</div>

---

## Architecture

Built on **React 18, Vite, Tailwind CSS, and Framer Motion** — all static, no server required.

- **[Master Manifesto](docs/master.md)** — The "why" and the roadmap
- **[Design System](docs/design.md)** — Tokens and component architecture
- **[Gateway Contract](docs/gateway.md)** — How to add a new payment gateway in ~10 minutes

---

## Tech Stack

| Layer | Tech |
|---|---|
| UI | React 18 |
| Build | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Deployment | Vercel / Netlify / GitHub Pages |

## Links

| Resource | URL |
| --- | --- |
| Landing Page | https://land-chai.vercel.app/ |
| Live Preview | https://land-chai.vercel.app/playground |

---

<div align="center">
  <p>Built for the open source community.</p>
  <p>
    <a href="https://buy4chai-vassu-v.vercel.app/">
      <img src="https://buy4chai-vassu-v.vercel.app/badges/personal.svg" alt="Support & Make Badge" />
    </a>
  </p>
  <p><i>If this helps you, give it a ⭐</i></p>
</div>
