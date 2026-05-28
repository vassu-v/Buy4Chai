<div align="center">
  <img src="public/logo.svg" width="120" alt="Buy4Chai Logo" />
  <h1>Buy4Chai</h1>
  <p><b>The headless tip jar. Bring your own payment gateway.</b></p>
  <p>A static, self-hosted supporter page where <i>you</i> own the gateway, the domain, the deployment, and every rupee. Built for the 2B+ developers Stripe forgot.</p>

  <p>
    <img src="https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind-blue?style=flat-square" alt="Stack" />
    <img src="https://img.shields.io/badge/Fees-0%25-green?style=flat-square" alt="Fees" />
    <img src="https://img.shields.io/badge/License-MIT-orange?style=flat-square" alt="License" />
  </p>

  <p>
    <a href="#-quick-start"><strong>Quick Start</strong></a> •
    <a href="#-bring-your-own-gateway"><strong>BYO Gateway</strong></a> •
    <a href="https://buy4-chai.vercel.app/"><strong>View template</strong></a> •
    <a href="https://buy4chai-vassu-v.vercel.app/"><strong>Live Demo</strong></a> •
    <a href="#-why-this-exists"><strong>Why</strong></a>
  </p>

  <p>
    <a href="https://buy4chai-vassu-v.vercel.app/">
      <img src="https://buy4chai-vassu-v.vercel.app/badges/personal.svg" alt="Support & Make Badge" />
    </a>
  </p>
</div>

---

## 🛑 Why this exists

If you're a developer outside the US/UK/EU, you've hit this wall:

- **Buy Me a Coffee** → Stripe → doesn't work
- **Ko-fi** → Stripe → doesn't work
- **GitHub Sponsors** → Stripe → doesn't work
- **PayPal** → 4–5% fees + painful FIRC compliance per payout
- **A UPI/PIX/M-Pesa link in your README** → janky, unprofessional, breaks on desktop

The problem isn't tipping. It's that every tipping platform is welded to one payment rail — and that rail isn't yours.

**Buy4Chai inverts the model.** The platform is a static site. The payment gateway is whatever works in your country. You wire them together once, deploy once, and own the result forever.

---

## 🔌 Bring Your Own Gateway

Most tip platforms are welded to Stripe. Buy4Chai is welded to nothing.

The project defines a formal **Gateway Contract** in [`gateway.md`](./gateway.md):
- **Tier 1** — Redirect flow (any gateway with a hosted checkout URL)
- **Tier 2** — SDK flow (any gateway with a JS SDK)
- 100% static, zero backend, public keys only

To add a new gateway, you don't wait for a PR. You don't file an issue. You paste this prompt into Claude / Cursor / Antigravity along with the gateway's docs:

> *Read `gateway.md` and the attached documentation for [Gateway Name]. Follow the Gateway Contract. Decide Tier 1 vs Tier 2 based on the docs. Implement `src/gateways/[name].js` with 100% static compliance and zero backend logic.*

That's how **Razorpay** got built. That's how **Dodo Payments** got built. The same prompt + docs gives you:

| Country | Gateway | Status |
|---|---|---|
| 🇮🇳 India | Razorpay | ✅ Shipped |
| 🇮🇳 India | Dodo Payments | ✅ Shipped |
| 🇮🇳 India | Cashfree | 🟡 5-min build |
| 🇧🇷 Brazil | Mercado Pago / PIX | 🟡 5-min build |
| 🇰🇪 Kenya | M-Pesa Daraja | 🟡 5-min build |
| 🇮🇩 Indonesia | Midtrans / GoPay | 🟡 5-min build |
| 🌎 Global | Stripe / Paddle / Lemon Squeezy | 🟡 5-min build |

If your country has a gateway with API docs, Buy4Chai supports it. You're 1 prompt away.

---

## 🚀 Quick Start

```bash
# 1. Fork & clone
git clone https://github.com/YOUR_USERNAME/Buy4Chai.git
cd Buy4Chai && npm install && npm run dev

# 2. Open the setup wizard
# Default URL: http://localhost:3000/#setup?key=chai123

# 3. Fill 6 steps. Copy the generated config to chai.config.js. Push.

# 4. Deploy to Vercel/Netlify. Done.
```

⏱ **~10 minutes** if you already have a Razorpay/gateway account.
🎬 **[~3 minutes](#-tutorial)** if you want a full walkthrough video.

---

## 🌍 Not Just India

Buy4Chai started as a fix for Indian developers locked out of Stripe. But "locked out of Stripe" describes most of the developer world:

- **Latin America** — Stripe limited; PIX, Mercado Pago, dLocal dominate
- **Africa** — M-Pesa, Flutterwave, Paystack
- **Southeast Asia** — Midtrans, GoPay, GCash
- **MENA** — PayTabs, Tap, HyperPay

If you ship Buy4Chai with a gateway adapter for your region, open a PR — we'll feature your country in the README.

---

## 🤝 You Own This

We don't run a SaaS. We don't have an account system. We don't see your money, your supporters' data, or your traffic. Your fork is your fork. If this repo disappears tomorrow, your deployment keeps working.

That's not a side effect. It's the design.

---

## ✨ Why this is better

- **📖 Narrative-First Design:** Move beyond transactional forms. Build a connection with your supporters through an editorial-style layout that showcases your mission, your story, and your gallery.
- **💱 Dual-Currency Engine:** A first-of-its-kind system for developers. Set prices in USD, receive in your local currency. Supporters can toggle currencies in real-time with automatic conversion.
- **💸 0% Platform Fees:** We aren't a middleman. Money moves directly from your supporters to your gateway account. You keep every cent.
- **🛡️ Self-Hosted Sovereignty:** You own the deployment. No platform accounts, no vendor lock-in. Host it on your own domain using Vercel, GitHub Pages, or Netlify for free.
- **🔐 Protected Onboarding:** A professional 6-step setup wizard (`/#setup`) that handles everything from identity to gateway keys, gated by a security key for production safety.

---

## 📸 Visuals

### Dark Mode (Default)
[![Dark Mode](screenshots/dark_mode.jpg)](https://buy4-chai.vercel.app/)

### Light Mode
[![Light Mode](screenshots/light_mode.jpg)](https://buy4-chai.vercel.app/)

---

## 🎨 The Experience

| **Storytelling** | **Project Showcase** | **Dual Currency** |
| :--- | :--- | :--- |
| Build a narrative around your work. Let people know *why* they should support you. | Pin your best open-source projects with high-quality preview cards. | Automatic USD/Local conversion with a simple supporter-facing toggle. |

---

## 📹 Tutorial

Watch the walkthrough video to see the setup wizard and supporter payment flow in action:

*👉 **[Click here to watch the tutorial video](https://buy4-chai.vercel.app/complete.mp4)** 🎥*

---

## 🤖 AI-Powered Setup — Let AI Build Your Page For You

Don't want to fill the config manually? Hand this prompt to any AI agent — Claude, Copilot, Cursor, Jules, whatever you use.

**Step 1:** Fork the repo and open it in your AI agent.

**Step 2:** Copy your profile content from wherever you exist online — GitHub, LinkedIn, Twitter, your personal site, anywhere. Just paste the text content directly into the chat with the prompt below. No links needed, the AI doesn't need to browse the web.

**Step 3:** Paste this prompt followed by your copied content:

> I want to set up my Buy4Chai supporter page.
> I've pasted my profile content below from my online profiles.
> 
> Please do the following:
> 
> 1. Read through everything I've pasted and extract the following:
>    - My name
>    - A short bio (one or two lines, friendly and human)
>    - My avatar/profile image if mentioned or linked
>    - My social links (GitHub, LinkedIn, Twitter, website)
>    - My best projects worth pinning — name, description, link, and preview image if available
> 
> 2. Before writing anything, show me what you found and confirm with me:
>    - Which projects should be pinned and in what order?
>    - Is the bio accurate or should it be reworded?
>    - Ask me if I have a profile photo or avatar I want to use
>    - Ask me if I have any gallery images I want to show
>    - Ask me what thank you message I want supporters to see after they pay
> 
> 3. Once I've confirmed everything, write it all to `chai.config.js` only. Do not touch any other file. The structure of `chai.config.js` is already in the repo — follow it exactly, just fill in my real values.
> 
> 4. Rename the personal badge in `public/badges/personal.svg` — replace the placeholder name with my actual name.
> 
> 5. Once done, verify the full flow:
>    - Does the page load correctly?
>    - Does the payment modal open?
>    - Does the thank you screen appear on success?
> 
> 6. Give me a clean summary of everything that was added and what my next step is to deploy.
> 
> Important rules you must follow:
> - Only edit `chai.config.js` and the personal badge — nothing else
> - Never ask for or use a secret or private key
> - If any information is missing from what I pasted, ask me directly rather than guessing or making something up
> - Always confirm with me before writing anything to any file
> - Do not assume I use any specific platform — work with whatever content I provide
> 
> ---
> 
> [PASTE YOUR PROFILE CONTENT HERE — from any platform, any format, just copy and paste the text]

**Step 4:** Answer the agent's questions, confirm your config, deploy.

---

## 🛡️ Secure by Design

- **Public Keys Only:** Buy4Chai never asks for Secret Keys. Your config is safe to be public.
- **Setup Lockdown:** Disable the configuration wizard in production with a single toggle.
- **Password Protection:** Your setup route is gated by a unique key known only to you.

---

## 📊 Adapters in the wild

| Project | Country | Gateway | Live |
|---|---|---|---|
| @vassu-v | 🇮🇳 IN | Razorpay | [Demo](https://buy4chai-vassu-v.vercel.app/) |
| _(yours here — open a PR)_ | | | |

---

## 🔌 Add to your README

Choose a badge style that fits your project's aesthetic:

| Style | Preview | Markdown Snippet (Click to expand) |
| :--- | :--- | :--- |
| **Mono-Chai** | ![Mono-Chai](public/badges/standard.svg) | <details><summary>Get Code</summary><br><br>```markdown<br>[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/standard.svg)](https://your-deployment-url.vercel.app)<br>```<br></details> |
| **Bento-Box** | ![Bento-Box](public/badges/personal.svg) | <details><summary>Get Code</summary><br><br>```markdown<br>[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/personal.svg)](https://your-deployment-url.vercel.app)<br>```<br></details> |
| **Light Pill** | ![Light Pill](public/badges/buy4chai.svg) | <details><summary>Get Code</summary><br><br>```markdown<br>[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/buy4chai.svg)](https://your-deployment-url.vercel.app)<br>```<br></details> |
| **Classic** | ![Classic](public/badges/badge.svg) | <details><summary>Get Code</summary><br><br>```markdown<br>[![Support](https://raw.githubusercontent.com/vassu-v/Buy4Chai/main/public/badges/badge.svg)](https://your-deployment-url.vercel.app)<br>```<br></details> |
| **Shields.io** | ![Shields](https://img.shields.io/badge/Support-Buy4Chai-8B5E3C?style=for-the-badge&logo=coffee&logoColor=white) | <details><summary>Get Code</summary><br><br>```markdown<br>[![Support](https://img.shields.io/badge/Support-Buy4Chai-8B5E3C?style=for-the-badge&logo=coffee&logoColor=white)](https://your-deployment-url.vercel.app)<br>```<br></details> |

*(Replace `your-deployment-url.vercel.app` with your actual live URL).*

> [!TIP]
> For the **Bento-Box** style, you will have to change the badge name and host it on your own domain. Instead of using the Raw GitHub link, use your own deployment link (e.g., `https://your-name.vercel.app/badges/personal.svg`) for the image source to ensure full control over your branding.

---

## 🏗️ Architecture

Built with **React 18, Vite, Tailwind CSS, and Framer Motion**.

- **[Master Manifesto](master.md)** — The "Why" and the roadmap.
- **[Design System](design.md)** — The tokens and component architecture.
- **[Gateway Contract](gateway.md)** — How to add a new payment gateway in 10 minutes.

---

<div align="center">
  <p>Built for the Open Source Community 🌍</p>
  <p>
    <a href="https://buy4chai-vassu-v.vercel.app/">
      <img src="https://buy4chai-vassu-v.vercel.app/badges/personal.svg" alt="Support & Make Badge" />
    </a>
  </p>
  <p><i>If this helps you, consider giving it a ⭐</i></p>
</div>
