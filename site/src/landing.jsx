import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useMotionValue, useAnimationFrame, animate } from 'framer-motion';

import {
  Github, ArrowRight, ArrowUpRight, X,
  Zap, Code2, Star, Sun, Moon, ChevronLeft, ChevronRight
} from 'lucide-react';
import AnimatedHeroDemo from './AnimatedHeroDemo.jsx';

/* ─── Constants ──────────────────────────────────────────────── */

const GITHUB_URL   = 'https://github.com/vassu-v/buy4chai';
const FORK_URL     = 'https://github.com/vassu-v/buy4chai/fork';
const PLAYGROUND   = '/playground';

/* ─── Theme Tokens ───────────────────────────────────────────── */

const DARK = {
  root:        'bg-[#0A0A0A] text-white',
  nav:         'border-white/[0.06] bg-[#0A0A0A]/90',
  navLink:     'text-zinc-400 hover:text-white hover:bg-white/5',
  card:        'bg-[#0F0F0F] border border-white/[0.07]',
  cardInner:   'bg-[#111111]',
  browserBar:  'bg-[#1A1A1A] border-b border-white/[0.06]',
  browserUrl:  'bg-[#0D0D0D] border border-white/[0.05] text-zinc-500',
  browserPage: 'bg-[#0C0C0C]',
  codeWrap:    'bg-[#0D0D0D] border border-white/[0.06]',
  codeBar:     'bg-[#111111] border-b border-white/[0.06]',
  codeFile:    'text-zinc-600',
  input:       'bg-[#0F0F0F] border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/40 focus:ring-amber-500/10',
  heading:     'text-white',
  body:        'text-zinc-400',
  faint:       'text-zinc-500',
  dimmer:      'text-zinc-600',
  label:       'text-zinc-400',
  accent:      'text-amber-500',
  accentHex:   '#F59E0B',
  divider:     'border-white/[0.04]',
  statCard:    'bg-[#0F0F0F] border border-white/[0.06]',
  quote:       'bg-[#0D0D0D] border border-white/[0.06]',
  stepCard:    'bg-[#0F0F0F] border border-white/[0.06] hover:border-amber-500/20',
  stepNum:     'text-white/[0.03]',
  stepIcon:    'bg-amber-500/10 border border-amber-500/20 text-amber-500',
  ctaBanner:   'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20',
  ctaGlow:     'bg-amber-500/10',
  pillText:    'text-zinc-500',
  pillDot:     'text-amber-500',
  heroGlow1:   'bg-amber-500/[0.04]',
  heroGlow2:   'bg-amber-500/[0.06]',
  iconBox:     'bg-white/[0.04] border border-white/10',
  scrollLine:  'via-white/20',
  tagText:     'text-zinc-500',
  amberBtn:    'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/20',
  outlineBtn:  'border-white/15 text-white hover:border-white/30 hover:bg-white/5',
  toggleBg:    'bg-white/[0.08] border-white/10 text-zinc-300 hover:bg-white/[0.13]',
  previewName: 'text-white',
  previewBio:  'text-zinc-500',
  previewSafe: 'text-zinc-600',
  oldCard1:    'bg-[#0D1117] border border-[#30363d]/80',
  oldCard2:    'bg-[#003087] border border-[#1a4fa0]/60',
  oldCard3:    'bg-[#0A0A0A] border border-red-900/40',
  footerText:  'text-zinc-600',
  footerLink:  'text-zinc-400 hover:text-white',
};

const LIGHT = {
  root:        'bg-[#FDF8F3] text-[#3D2B1F]',
  nav:         'border-[#E6D5C3]/70 bg-[#FDF8F3]/95',
  navLink:     'text-[#7C6A5B] hover:text-[#3D2B1F] hover:bg-[#F0E4D4]',
  card:        'bg-[#FFF9F5] border border-[#E6D5C3]',
  cardInner:   'bg-[#F5EDE2]',
  sectionAlt:  'bg-[#F5EDE2]',
  browserBar:  'bg-[#F0E4D4] border-b border-[#E6D5C3]',
  browserUrl:  'bg-[#FDF8F3] border border-[#E6D5C3] text-[#A89080]',
  browserPage: 'bg-[#FDF8F3]',
  codeWrap:    'bg-[#2A1A0E] border border-[#E6D5C3]/20',
  codeBar:     'bg-[#221508] border-b border-white/[0.07]',
  codeFile:    'text-zinc-500',
  input:       'bg-[#F5EDE2] border-[#E6D5C3] text-[#3D2B1F] placeholder:text-[#A89080] focus:border-[#8B5E3C]/60 focus:ring-[#8B5E3C]/10',
  heading:     'text-[#3D2B1F]',
  body:        'text-[#7C6A5B]',
  faint:       'text-[#7C6A5B]',
  dimmer:      'text-[#A89080]',
  label:       'text-[#7C6A5B]',
  accent:      'text-[#8B5E3C]',
  accentHex:   '#8B5E3C',
  divider:     'border-[#E6D5C3]/70',
  statCard:    'bg-[#FFF9F5] border border-[#E6D5C3]',
  quote:       'bg-[#FFF9F5] border border-[#E6D5C3]',
  stepCard:    'bg-[#FFF9F5] border border-[#E6D5C3] hover:border-[#D4A373]/70',
  stepNum:     'text-[#3D2B1F]/[0.04]',
  stepIcon:    'bg-[#F5EDE2] border border-[#E6D5C3] text-[#8B5E3C]',
  ctaBanner:   'bg-gradient-to-br from-[#F7E9D9] via-[#FFF4EB] to-[#FDF8F3] border border-[#E6D5C3]',
  ctaGlow:     'bg-[#D4A373]/25',
  pillText:    'text-[#7C6A5B]',
  pillDot:     'text-[#8B5E3C]',
  heroGlow1:   'bg-[#D4A373]/[0.14]',
  heroGlow2:   'bg-amber-400/[0.1]',
  iconBox:     'bg-[#F7E9D9] border border-[#E6D5C3]',
  scrollLine:  'via-[#D4A373]/50',
  tagText:     'text-[#8B5E3C]',
  amberBtn:    'bg-amber-500 text-black hover:bg-amber-600 shadow-amber-500/20',
  outlineBtn:  'border-[#E6D5C3] text-[#5F4029] hover:border-[#D4A373] hover:bg-[#F5EDE2]',
  toggleBg:    'bg-[#F5EDE2] border-[#E6D5C3] text-[#7C6A5B] hover:bg-[#EDD9C4]',
  previewName: 'text-[#3D2B1F]',
  previewBio:  'text-[#7C6A5B]',
  previewSafe: 'text-[#A89080]',
  oldCard1:    'bg-[#0D1117] border border-[#30363d]/80',
  oldCard2:    'bg-[#003087] border border-[#1a4fa0]/60',
  oldCard3:    'bg-[#111111] border border-red-900/40',
  footerText:  'text-[#A89080]',
  footerLink:  'text-[#7C6A5B] hover:text-[#3D2B1F]',
};

/* ─── Inline Chai Logo ───────────────────────────────────────── */

function ChaiLogo({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="lt" x1="200" y1="120" x2="200" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E1954A" />
          <stop offset="50%" stopColor="#C0712C" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <linearGradient id="lg" x1="150" y1="100" x2="250" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
        <filter id="ls"><feGaussianBlur in="SourceGraphic" stdDeviation="4" /></filter>
      </defs>
      <g filter="url(#ls)" opacity="0.6">
        <path d="M180 80C180 80 170 60 185 45C200 30 190 10 190 10" stroke="#FDF8F3" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M210 90C210 90 225 70 215 55C205 40 215 20 215 20" stroke="#FDF8F3" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      <path d="M140 100L165 350C165 365 180 375 200 375C220 375 235 365 235 350L260 100" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M144 140L165 345C165 358 180 368 200 368C220 368 235 358 235 345L256 140C256 140 200 155 144 140Z" fill="url(#lt)" />
      <ellipse cx="200" cy="142" rx="56" ry="12" fill="#F4B87C" fillOpacity="0.4" />
      <path d="M150 110C150 110 160 250 175 340" stroke="url(#lg)" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M140 100C140 100 200 115 260 100" stroke="white" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Grid Background ────────────────────────────────────────── */

function GridBackground({ dark }) {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const raf       = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove  = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()  => { mouse.current = { x: -9999,     y: -9999     }; };

    window.addEventListener('resize',    resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    const GRID   = 60;
    const RADIUS = 230;

    const draw = () => {
      const { width, height } = canvas;
      const { x: mx, y: my } = mouse.current;

      ctx.clearRect(0, 0, width, height);

      const BASE = dark ? 'rgba(255,255,255,0.09)' : 'rgba(61,43,31,0.14)';
      const [R, G, B] = dark ? [245, 158, 11] : [139, 94, 60];

      // ── Vertical lines ──
      for (let xi = 0; xi <= width + GRID; xi += GRID) {
        const perp = Math.abs(mx - xi);
        const prox = Math.max(0, 1 - perp / RADIUS);

        ctx.beginPath();
        ctx.moveTo(xi, 0);
        ctx.lineTo(xi, height);
        ctx.strokeStyle = BASE;
        ctx.lineWidth   = 0.7;
        ctx.stroke();

        if (prox > 0.02) {
          const span = RADIUS * 1.3;
          const grad = ctx.createLinearGradient(0, my - span, 0, my + span);
          const a    = prox * (dark ? 0.65 : 0.45);
          grad.addColorStop(0,   `rgba(${R},${G},${B},0)`);
          grad.addColorStop(0.5, `rgba(${R},${G},${B},${a})`);
          grad.addColorStop(1,   `rgba(${R},${G},${B},0)`);
          ctx.beginPath();
          ctx.moveTo(xi, my - span);
          ctx.lineTo(xi, my + span);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 0.5 + prox * 1.2;
          ctx.stroke();
        }
      }

      // ── Horizontal lines ──
      for (let yi = 0; yi <= height + GRID; yi += GRID) {
        const perp = Math.abs(my - yi);
        const prox = Math.max(0, 1 - perp / RADIUS);

        ctx.beginPath();
        ctx.moveTo(0,     yi);
        ctx.lineTo(width, yi);
        ctx.strokeStyle = BASE;
        ctx.lineWidth   = 0.7;
        ctx.stroke();

        if (prox > 0.02) {
          const span = RADIUS * 1.3;
          const grad = ctx.createLinearGradient(mx - span, 0, mx + span, 0);
          const a    = prox * (dark ? 0.65 : 0.45);
          grad.addColorStop(0,   `rgba(${R},${G},${B},0)`);
          grad.addColorStop(0.5, `rgba(${R},${G},${B},${a})`);
          grad.addColorStop(1,   `rgba(${R},${G},${B},0)`);
          ctx.beginPath();
          ctx.moveTo(mx - span, yi);
          ctx.lineTo(mx + span, yi);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 0.5 + prox * 1.2;
          ctx.stroke();
        }
      }

      // ── Intersection dots ──
      const dotRadius = RADIUS * 0.7;
      for (let xi = 0; xi <= width + GRID; xi += GRID) {
        for (let yi = 0; yi <= height + GRID; yi += GRID) {
          const dist = Math.hypot(mx - xi, my - yi);
          if (dist < dotRadius) {
            const t = Math.max(0, 1 - dist / dotRadius);
            ctx.beginPath();
            ctx.arc(xi, yi, 2 * t, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${R},${G},${B},${t * (dark ? 0.9 : 0.7)})`;
            ctx.fill();
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ─── Shared Primitives ──────────────────────────────────────── */

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >{children}</motion.div>
  );
}

function Btn({ t, href, onClick, children, outline = false, className = '' }) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.97] shadow-lg';
  const cls  = `${base} ${outline ? `border ${t.outlineBtn} shadow-none` : `${t.amberBtn}`} ${className}`;
  if (href?.startsWith('/')) return <Link to={href} className={cls}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

function SectionTag({ t, children }) {
  return (
    <p className={`text-[10px] font-black tracking-[0.22em] uppercase mb-4 ${t.tagText}`}>{children}</p>
  );
}

/* ─── Nav ────────────────────────────────────────────────────── */

function Nav({ t, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? `backdrop-blur-md border-b ${t.nav}` : ''}`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <ChaiLogo size={26} />
          <span className={`font-bold text-[15px] tracking-tight ${t.heading}`}>Buy4Chai</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {[['#features','Features'],['#how-it-works','How it works'],[PLAYGROUND,'Try it'],[GITHUB_URL,'GitHub']].map(([href, label]) => {
            const cls = `px-3.5 py-2 text-sm rounded-lg font-medium transition-colors ${t.navLink}`;
            if (href.startsWith('/'))
              return <Link key={label} to={href} className={cls}>{label}</Link>;
            return (
              <a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={cls}>
                {label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(d => !d)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${t.toggleBg}`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Btn t={t} href={PLAYGROUND}>
            Try it live <ArrowRight size={14} />
          </Btn>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */

function Hero({ t, dark }) {
  return (
    <section className={`relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden ${dark ? 'noise-bg' : ''}`}>
      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] pointer-events-none ${t.heroGlow1}`} />
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none ${t.heroGlow2}`} />

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        {/* Anchor pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border ${
            dark
              ? 'border-amber-500/25 text-amber-400/80 bg-amber-500/[0.07]'
              : 'border-[#E6D5C3] text-[#8B5E3C] bg-[#F7E9D9]'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-amber-500' : 'bg-[#8B5E3C]'}`} />
            Open source · Zero fees · Self-hosted
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-[clamp(2.6rem,7vw,5rem)] font-extrabold tracking-tight leading-[1.05] mb-5 ${t.heading}`}
        >
          The headless<br />
          <span className={`${dark ? 'text-amber-500' : 'text-amber-600'}`} style={{ textShadow: dark ? '0 0 30px rgba(245,158,11,0.35)' : 'none' }}>
            tip jar.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg font-medium max-w-lg mb-10 leading-relaxed ${t.body}`}
        >
          Bring your own gateway. No Stripe required.
          <br />
          <span className={`text-base ${t.faint}`}>Fork once, configure once, own it forever.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Btn t={t} href={PLAYGROUND} className="text-base px-6 py-3">
            Try it live <ArrowRight size={16} />
          </Btn>
          <Btn t={t} href={GITHUB_URL} outline className="text-base px-6 py-3">
            <Github size={16} /> View on GitHub
          </Btn>
        </motion.div>

        {/* Pill strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className={`mt-14 flex items-center gap-6 text-xs font-medium ${t.pillText}`}
        >
          <span className="flex items-center gap-1.5">
            <Star size={12} className={t.pillDot} /> 12+ stars
          </span>
          <span className={`w-px h-3 ${dark ? 'bg-white/10' : 'bg-[#E6D5C3]'}`} />
          <span>0% fees</span>
          <span className={`w-px h-3 ${dark ? 'bg-white/10' : 'bg-[#E6D5C3]'}`} />
          <span>MIT Licensed</span>
          <span className={`w-px h-3 ${dark ? 'bg-white/10' : 'bg-[#E6D5C3]'}`} />
          <span>100% static</span>
          <span className={`w-px h-3 ${dark ? 'bg-white/10' : 'bg-[#E6D5C3]'}`} />
          <span>You Own This</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className={`w-[1px] h-9 bg-gradient-to-b from-transparent ${t.scrollLine} to-transparent mx-auto`}
        />
      </motion.div>
    </section>
  );
}

/* ─── Before / After ─────────────────────────────────────────── */

function BeforeAfter({ t, dark }) {
  return (
    <section id="features" className={`py-28 px-5 border-t ${t.divider} ${!dark && t.sectionAlt ? t.sectionAlt : ''}`}>
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-20">
          <SectionTag t={t}>The problem</SectionTag>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${t.heading}`}>
            Every other option<br />
            <span className={t.body}>is broken for you.</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-[1fr_56px_1fr] gap-6 items-start">

          {/* OLD WAY */}
          <FadeUp delay={0.05}>
            <p className={`text-[10px] font-black tracking-[0.25em] uppercase mb-5 ${t.faint}`}>The old way</p>
            <p className={`text-2xl font-bold mb-8 leading-tight ${t.heading}`}>Janky workarounds.<br />Friction for everyone.</p>

            {/* README card */}
            <div className={`relative ${t.oldCard1} rounded-xl p-4 rotate-[-0.8deg] shadow-xl mb-3`}>
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[10px] text-zinc-500 font-mono">README.md</span>
              </div>
              <div className="font-mono text-[13px] leading-6 space-y-0.5">
                <p className="text-zinc-500">{`## Support me`}</p>
                <p><span className="text-[#79c0ff]">upi</span><span className="text-zinc-400">: </span><span className="text-amber-400">yourname@oksbi</span></p>
                <p className="text-zinc-600 text-[11px] mt-2">{`// 🤞 hope they bother to copy-paste it`}</p>
              </div>
            </div>

            {/* PayPal card */}
            <div className={`relative ${t.oldCard2} rounded-xl p-4 rotate-[1.2deg] shadow-xl mb-3 ml-4`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-blue-200/60 uppercase tracking-wider">PayPal Receipt</span>
                <span className="text-[10px] text-blue-200/40">Today</span>
              </div>
              <div className="space-y-1.5 font-mono text-sm">
                <div className="flex justify-between text-blue-100"><span>Payment received</span><span>$10.00</span></div>
                <div className="flex justify-between text-red-400"><span>PayPal fee</span><span>-$0.75</span></div>
                <div className="flex justify-between text-white font-bold border-t border-blue-700/50 pt-1.5"><span>You get</span><span>$9.25</span></div>
                <p className="text-blue-200/40 text-[10px] pt-1">4.5% cut. Every time. 😑</p>
              </div>
            </div>

            {/* Stripe card */}
            <div className={`relative ${t.oldCard3} rounded-xl p-4 rotate-[-0.4deg] shadow-xl mr-2`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X size={10} className="text-red-400" />
                </div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">stripe.com</span>
              </div>
              <p className="text-red-400 text-sm font-medium leading-relaxed">This account is invite only. You need an invite to access Stripe.</p>
              <p className="text-zinc-600 text-[11px] mt-2 font-mono">error_code: country_not_supported</p>
            </div>
          </FadeUp>

          {/* Arrow */}
          <FadeUp delay={0.1} className="hidden md:flex items-center justify-center pt-36">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${t.card}`}>
              <ArrowRight size={18} className={dark ? 'text-amber-500' : 'text-amber-600'} />
            </div>
          </FadeUp>

          {/* BETTER WAY */}
          <FadeUp delay={0.15}>
            <p className={`text-[10px] font-black tracking-[0.25em] uppercase mb-5 ${dark ? 'text-amber-500' : 'text-amber-600'}`}>The better way</p>
            <p className={`text-2xl font-bold mb-8 leading-tight ${t.heading}`}>A clean supporter<br />experience.</p>

            {/* Browser mock */}
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${t.card}`}>
              <div className={`px-4 py-3 flex items-center gap-2.5 ${t.browserBar}`}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className={`flex-1 mx-3 rounded-md px-3 py-1 text-[11px] font-mono ${t.browserUrl}`}>yourname.vercel.app</div>
              </div>
              <img
                src={dark ? '/Screenshot_2026-06-21_17-37-00.png' : '/Screenshot_2026-06-21_17-37-07.png'}
                alt="Buy4Chai supporter page"
                className="w-full block"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */

const STEPS = [
  { num: '01', title: 'Fork',      desc: 'Clone the repo to your GitHub in one click. No accounts, no signups.', icon: <Github size={18} /> },
  { num: '02', title: 'Configure', desc: 'Edit one config file with your name, bio, avatar, and gateway key.',    icon: <Code2  size={18} /> },
  { num: '03', title: 'Deploy',    desc: 'Push to Vercel or Netlify. Auto-detects, builds, goes live in minutes.',icon: <Zap    size={18} /> },
];

function HowItWorks({ t }) {
  return (
    <section id="how-it-works" className={`py-28 px-5 border-t ${t.divider}`}>
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <SectionTag t={t}>Setup</SectionTag>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${t.heading}`}>
            Live in <span className={t.accent}>10 minutes.</span>
          </h2>
          <p className={`mt-4 max-w-md mx-auto ${t.faint}`}>No backend. No accounts. No monthly fee. Just a repo you own.</p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {STEPS.map((step, i) => {
            const rotate = i === 0 ? -4 : i === 2 ? 4 : 0;
            // Each card floats at its own phase, amplitude, and speed so they never sync up
            const floats = [
              { y: [-5,  8, -5], duration: 4.3, delay: 0.4 },  // 01: starts mid-down, drifts up
              { y: [ 0, -11, 0], duration: 3.4, delay: 0   },  // 02: starts neutral, goes up
              { y: [ 6, -5,  6], duration: 3.9, delay: 1.2 },  // 03: starts mid-up, drifts down
            ];
            const { y, duration, delay } = floats[i];
            return (
              <FadeUp key={step.num} delay={i * 0.08}>
                <motion.div
                  className={`relative group p-7 rounded-2xl transition-colors duration-300 h-full ${t.stepCard}`}
                  style={{ rotate }}
                  animate={{ y }}
                  transition={{ repeat: Infinity, duration, ease: 'easeInOut', delay }}
                >
                  <div className={`absolute top-7 right-7 text-[clamp(3rem,5vw,4rem)] font-black select-none leading-none ${t.stepNum}`}>
                    {step.num}
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${t.stepIcon}`}>
                    {step.icon}
                  </div>
                  <h3 className={`font-bold text-xl mb-3 ${t.heading}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${t.faint}`}>{step.desc}</p>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>

        {/* Code block — always dark */}
        <FadeUp delay={0.2} className="mt-8">
          <div className={`rounded-2xl overflow-hidden ${t.codeWrap}`}>
            <div className={`flex items-center gap-2 px-5 py-3 ${t.codeBar}`}>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]" />
              </div>
              <span className={`text-xs font-mono ml-2 ${t.codeFile}`}>chai.config.js</span>
            </div>
            <pre className="p-5 text-[13px] font-mono leading-6 overflow-x-auto text-zinc-300">
{`export default {
  `}<span className="text-zinc-600">// That's it. Just fill these in.</span>{`
  name:       `}<span className="text-amber-400">"Your Name"</span>{`,
  avatar:     `}<span className="text-amber-400">"https://github.com/you.png"</span>{`,
  bio:        `}<span className="text-amber-400">"One line about what you build"</span>{`,
  gateway:    `}<span className="text-amber-400">"razorpay"</span>{`,   `}<span className="text-zinc-600">// or "dodo", "upi-direct"</span>{`
  gatewayKey: `}<span className="text-amber-400">"rzp_live_..."</span>{`,  `}<span className="text-zinc-600">// public key only</span>{`
}

`}<span className="text-zinc-600">{`// want to skip this headache?`}</span>{`
`}<span className="text-zinc-600">{`// copy-paste this prompt → drop it into your agent`}</span>{`
`}<span className="text-zinc-600">{`// find prompt `}</span><a href="https://github.com/vassu-v/Buy4Chai/#-ai-powered-setup--let-ai-build-your-page-for-you" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors">{`@here`}</a>
            </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Live Preview ───────────────────────────────────────────── */

function FakeSidebar({ t, dark }) {
  const [name,  setName]  = useState('Shoryavardhaan');
  const [bio,   setBio]   = useState('Building open source tools.');
  const [color, setColor] = useState('#F59E0B');

  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.3 }}
      className={`w-[200px] shrink-0 rounded-2xl overflow-hidden shadow-2xl border ${t.card}`}
    >
      {/* Title bar */}
      <div className={`px-3 py-2.5 flex items-center gap-2 border-b ${dark ? 'bg-[#111] border-white/[0.06]' : 'bg-[#F0E4D4] border-[#E6D5C3]'}`}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <span className={`text-[10px] font-semibold ${t.faint}`}>Customize</span>
      </div>

      <div className="p-3.5 space-y-3">
        {/* Name */}
        <div>
          <label className={`text-[9px] font-black tracking-[0.15em] uppercase block mb-1 ${t.dimmer}`}>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={30}
            className={`w-full text-xs px-2.5 py-1.5 rounded-lg border ${t.input}`}
          />
        </div>

        {/* Bio */}
        <div>
          <label className={`text-[9px] font-black tracking-[0.15em] uppercase block mb-1 ${t.dimmer}`}>Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={2}
            maxLength={80}
            className={`w-full text-xs px-2.5 py-1.5 rounded-lg border resize-none leading-relaxed ${t.input}`}
          />
        </div>

        {/* Accent color */}
        <div>
          <label className={`text-[9px] font-black tracking-[0.15em] uppercase block mb-1.5 ${t.dimmer}`}>Color</label>
          <div className="flex gap-1.5 flex-wrap mb-2">
            {['#F59E0B','#10B981','#6366F1','#EC4899','#EF4444','#3B82F6'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-4.5 h-4.5 rounded-full border-2 transition-all hover:scale-125"
                style={{
                  width: 18, height: 18,
                  backgroundColor: c,
                  borderColor: color === c ? (dark ? '#fff' : '#3D2B1F') : 'transparent',
                }}
              />
            ))}
          </div>
          <div className="h-1 rounded-full transition-colors duration-300" style={{ backgroundColor: color }} />
        </div>

        {/* CTA */}
        <Link
          to={PLAYGROUND}
          className="flex items-center justify-center gap-1.5 w-full text-[11px] font-bold py-2 rounded-lg transition-opacity hover:opacity-80"
          style={{ backgroundColor: color, color: '#000' }}
        >
          Try live <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
}

function LivePreview({ t, dark }) {
  return (
    <section id="preview" className={`py-28 px-5 border-t ${t.divider} ${!dark && t.sectionAlt ? t.sectionAlt : ''}`}>
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-20">
          <SectionTag t={t}>Try it</SectionTag>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${t.heading}`}>
            See it live. <span className={t.accent}>Make it yours.</span>
          </h2>
          <p className={`mt-4 max-w-sm mx-auto text-sm ${t.faint}`}>
            Jump into the playground — customize colors, name, bio and watch it update in real time.
          </p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <div className="flex items-center justify-center gap-5 md:gap-8">

            {/* Dark screenshot — leans left, floats upward */}
            <Link to={PLAYGROUND} className="block shrink-0 group">
              <motion.div
                style={{ rotate: -6 }}
                animate={{ y: [6, -12, 6] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
                whileHover={{ scale: 1.04, transition: { duration: 0.22 } }}
                className={`w-[260px] md:w-[380px] rounded-2xl overflow-hidden shadow-2xl border cursor-pointer ${
                  dark ? 'border-white/10' : 'border-white/20'
                }`}
              >
                <img src="/Screenshot_2026-06-21_17-37-00.png" alt="Buy4Chai dark theme" className="w-full block" />
              </motion.div>
            </Link>

            {/* Fake sidebar tool — upright, gentle bob */}
            <FakeSidebar t={t} dark={dark} />

            {/* Light screenshot — leans right, floats downward */}
            <Link to={PLAYGROUND} className="block shrink-0 group">
              <motion.div
                style={{ rotate: 6 }}
                animate={{ y: [-10, 8, -10] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.7 }}
                whileHover={{ scale: 1.04, transition: { duration: 0.22 } }}
                className={`w-[260px] md:w-[380px] rounded-2xl overflow-hidden shadow-2xl border cursor-pointer ${
                  dark ? 'border-white/10' : 'border-black/[0.08]'
                }`}
              >
                <img src="/Screenshot_2026-06-21_17-37-07.png" alt="Buy4Chai light theme" className="w-full block" />
              </motion.div>
            </Link>

          </div>
        </FadeUp>

        <FadeUp delay={0.14} className="text-center mt-16">
          <Btn t={t} href={PLAYGROUND} className="text-base px-7 py-3">
            Open Playground <ArrowRight size={16} />
          </Btn>
          <p className={`mt-3 text-xs ${t.dimmer}`}>No account. No fork required to preview.</p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Social Proof ───────────────────────────────────────────── */

const QUOTES = [
  {
    text: "Self-hosted donations is a great wedge. The Stripe-free angle hits hardest for devs in countries Stripe still won't serve.",
    name: 'Saeed Anwar',
    handle: '@saen_dev',
    platform: 'X',
    screenshot: '/community_3.png',
    initials: 'SA',
    avatarBg: '#15202B',
  },
  {
    text: "this is brutally underrated tbh..",
    name: 'Syed Khader',
    handle: 'LinkedIn',
    platform: 'LinkedIn',
    screenshot: '/community_1.png',
    initials: 'SK',
    avatarBg: '#0A3358',
  },
  {
    text: "Dude I was exactly thinking about it and even started a project! Good that you have done it. Happy!",
    name: 'u/practical_indian',
    handle: 'r/indiandevs',
    platform: 'Reddit',
    screenshot: '/community_2.png',
    initials: 'PI',
    avatarBg: '#2D1200',
  },
];

const PLT = {
  X:        { text: 'text-zinc-200',   bg: 'bg-zinc-700/60',      dot: '#E4E4E7' },
  LinkedIn: { text: 'text-blue-200',   bg: 'bg-blue-900/50',      dot: '#93C5FD' },
  Reddit:   { text: 'text-orange-200', bg: 'bg-orange-900/50',    dot: '#FB923C' },
};

/* Single card — no screenshot logic inside (handled by carousel parent) */
function QuoteCard({ q, t, dark, active }) {
  const pc = PLT[q.platform];
  return (
    <div className={`h-full flex flex-col gap-4 p-6 rounded-2xl select-none transition-all duration-200 ${t.quote} ${
      active
        ? dark ? 'border-amber-500/35 bg-[#131313] shadow-lg shadow-amber-500/5' : 'border-[#D4A373]/60 bg-white shadow-lg'
        : dark ? 'hover:border-white/10' : 'hover:border-[#D4A373]/30'
    }`}>
      <span className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${pc.bg} ${pc.text}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pc.dot }} />
        {q.platform}
      </span>
      <blockquote className={`text-sm leading-relaxed font-semibold flex-1 ${t.heading}`}>
        "{q.text}"
      </blockquote>
      <div className={`flex items-center gap-3 pt-3 border-t ${dark ? 'border-white/[0.06]' : 'border-[#E6D5C3]/60'}`}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
          style={{ backgroundColor: q.avatarBg }}>
          {q.initials}
        </div>
        <div>
          <p className={`text-xs font-bold ${t.heading}`}>{q.name}</p>
          <p className={`text-[10px] ${t.dimmer}`}>{q.handle}</p>
        </div>
      </div>
    </div>
  );
}

/* Infinite horizontal marquee with pause-on-hover + arrow nav */
function QuotesCarousel({ t, dark }) {
  const [paused, setPaused]         = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const baseX    = useMotionValue(0);
  const trackRef = useRef(null);
  const loopW    = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) loopW.current = trackRef.current.scrollWidth / 3;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    let next = baseX.get() - delta * 0.038;
    if (loopW.current && next <= -loopW.current) next += loopW.current;
    baseX.set(next);
  });

  const shift = (dir) => {
    if (!loopW.current) return;
    const cardW = loopW.current / QUOTES.length;
    animate(baseX, baseX.get() + dir * cardW, {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
  };

  const items = [...QUOTES, ...QUOTES, ...QUOTES];

  const arrowCls = `absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 backdrop-blur-sm ${
    dark
      ? 'border-white/15 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 bg-[#0A0A0A]/70'
      : 'border-[#E6D5C3] text-[#7C6A5B] hover:border-[#D4A373] hover:text-[#5F4029] bg-[#FDF8F3]/80'
  }`;

  return (
    <div className="relative">
      {/* Left arrow — floats over the fade edge */}
      <button
        className={`${arrowCls} left-3`}
        onClick={() => shift(1)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Previous"
      >
        <ChevronLeft size={15} />
      </button>

      {/* Right arrow */}
      <button
        className={`${arrowCls} right-3`}
        onClick={() => shift(-1)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Next"
      >
        <ChevronRight size={15} />
      </button>

      {/*
        overflow-x: clip  → clips horizontal scroll without creating a BFC
        overflow-y: visible → lets screenshots float above cards unclipped
        mask-image          → soft fade at left/right edges
      */}
      <div
        style={{
          overflowX: 'clip',
          overflowY: 'visible',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 11%, black 89%, transparent 100%)',
          maskImage:        'linear-gradient(to right, transparent 0%, black 11%, black 89%, transparent 100%)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHoveredKey(null); }}
      >
        {/* pt-52 = headroom for the screenshot popup above each card */}
        <motion.div ref={trackRef} style={{ x: baseX }} className="flex gap-4 pt-52 pb-3 cursor-default">
          {items.map((q, i) => (
            <motion.div
              key={i}
              className="w-[340px] shrink-0 relative"
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              onHoverStart={() => setHoveredKey(q.handle)}
              onHoverEnd={() => setHoveredKey(null)}
            >
              {/* Screenshot floats above the card, anchored to its bottom edge */}
              <AnimatePresence>
                {hoveredKey === q.handle && (
                  <motion.div
                    className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[300px] rounded-2xl overflow-hidden shadow-2xl pointer-events-none z-30 border ${
                      dark ? 'border-white/15 shadow-black/60' : 'border-[#E6D5C3] shadow-black/10'
                    }`}
                    initial={{ opacity: 0, y: 10, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{    opacity: 0, y: 10, scale: 0.93 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <img src={q.screenshot} alt={q.name} className="w-full h-auto block" />
                  </motion.div>
                )}
              </AnimatePresence>

              <QuoteCard q={q} t={t} dark={dark} active={hoveredKey === q.handle} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const STATS = [
  { value: '12+',  label: 'GitHub Stars'   },
  { value: '40+',  label: 'Reddit Upvotes' },
  { value: '7.6K', label: 'Reddit Views'   },
  { value: '0%',   label: 'Platform Fees'  },
];

function SocialProof({ t, dark }) {
  return (
    <section className={`py-28 px-5 border-t ${t.divider}`}>
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-14">
          <SectionTag t={t}>What people are saying</SectionTag>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${t.heading}`}>
            The dev community<br />
            <span className={t.accent}>noticed.</span>
          </h2>
          <p className={`mt-4 max-w-xs mx-auto text-sm ${t.faint}`}>
            Pause to read, use arrows or drag to browse.
          </p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <QuotesCarousel t={t} dark={dark} />
        </FadeUp>

        <FadeUp delay={0.12} className="mt-14">
          <div className="flex flex-wrap justify-center gap-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className={`px-6 py-4 rounded-2xl flex items-center gap-3 ${t.statCard}`}>
                <span className={`text-2xl font-black ${t.accent}`}>{value}</span>
                <span className={`text-sm font-medium ${t.faint}`}>{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─────────────────────────────────────────────── */

function CTABanner({ t, dark }) {
  return (
    <section className={`py-20 px-5 border-t ${t.divider}`}>
      <FadeUp>
        <div className={`max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-12 text-center ${t.ctaBanner}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-[60px] pointer-events-none ${t.ctaGlow}`} />
          <div className="relative z-10">
            <ChaiLogo size={40} className="mx-auto mb-6 opacity-90" />
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${t.heading}`}>
              Ready to own your tip page?
            </h2>
            <p className={`mb-8 max-w-md mx-auto text-sm leading-relaxed ${t.body}`}>
              Fork in 30 seconds. Configure in 5 minutes. Deploy in 10. Your supporters are waiting.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Btn t={t} href={FORK_URL} className="text-base px-7 py-3">
                Fork on GitHub <ArrowRight size={16} />
              </Btn>
              <Btn t={t} href={PLAYGROUND} outline className="text-base px-7 py-3">
                Try the playground
              </Btn>
              <Btn t={t} href="https://buy4-chai.vercel.app/complete.mp4" outline className="text-base px-7 py-3">
                View 3min Setup <ArrowUpRight size={15} />
              </Btn>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

function Footer({ t, dark }) {
  return (
    <footer className={`border-t ${t.divider} py-10 px-5`}>
      <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm ${t.footerText}`}>
        <div className="flex items-center gap-2.5">
          <ChaiLogo size={18} />
          <span className={`font-medium ${t.heading}`}>Buy4Chai</span>
          <span className={dark ? 'text-white/10' : 'text-[#E6D5C3]'}>·</span>
          <span>MIT License</span>
        </div>
        <div className="flex items-center gap-6">
          <span>
            Built by{' '}
            <a href="https://github.com/vassu-v" target="_blank" rel="noopener noreferrer" className={`transition-colors ${t.footerLink}`}>@vassu-v</a>
          </span>
          <span className={dark ? 'text-white/10' : 'text-[#E6D5C3]'}>·</span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 transition-colors ${t.footerLink}`}>
            <Github size={14} /> GitHub
          </a>
        </div>
        <a href="https://buy4chai-vassu-v.vercel.app/" target="_blank" rel="noopener noreferrer">
          <img src="/badge.svg" alt="Buy me a chai" className={`h-8 transition-opacity ${dark ? 'opacity-60 hover:opacity-100' : 'opacity-70 hover:opacity-100'}`} />
        </a>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */

export default function Landing() {
  const [dark, setDark] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const t = dark ? DARK : LIGHT;

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${t.root}`}
      style={dark ? {
        background: [
          'radial-gradient(ellipse 110% 50% at 50% -5%, rgba(112,48,6,0.48) 0%, transparent 62%)',
          'radial-gradient(ellipse 55% 30% at 95% 85%, rgba(80,34,4,0.22) 0%, transparent 55%)',
          '#0A0A0A',
        ].join(', ')
      } : undefined}
    >
      {/* Interactive grid canvas — sits above the background, below all content */}
      <GridBackground dark={dark} />

      {/* z-10 keeps every section above the canvas */}
      <div className="relative z-10">
        <Nav       t={t} dark={dark} setDark={setDark} />
        <Hero      t={t} dark={dark} />
        <BeforeAfter t={t} dark={dark} />
        <HowItWorks  t={t} />
        <LivePreview t={t} dark={dark} />
        <SocialProof t={t} dark={dark} />
        <CTABanner   t={t} dark={dark} />
        <Footer      t={t} dark={dark} />
      </div>

      {/* Full-screen Intro Loader Overlay */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: '#000000',
              overflow: 'hidden'
            }}
          >
            <AnimatedHeroDemo onComplete={() => setTimeout(() => setIntroDone(true), 1200)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

