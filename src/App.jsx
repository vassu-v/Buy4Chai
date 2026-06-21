import React, { useState, useEffect } from 'react';
import SupporterPage from './SupporterPage.jsx';
import SetupPage from './SetupPage.jsx';
import config from '../chai.config.js';

/* ── Color utilities (mirror of Playground.jsx) ───────────────── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function rgbToHex(r, g, b) {
  return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
function shift(hex, delta) {
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex(r+delta, g+delta, b+delta);
}
function deriveTheme(bgHex, light) {
  if (light) {
    return {
      bg: bgHex, bgSubtle: shift(bgHex,-12), card: shift(bgHex,+8), cardBorder: shift(bgHex,-30),
      inputBg: shift(bgHex,-10), textPrimary:'#2A1F1A', textMuted:'#7C6A5B', textFaint:'#A89080',
    };
  }
  return {
    bg: bgHex, bgSubtle: shift(bgHex,+10), card: shift(bgHex,+20), cardBorder: shift(bgHex,+38),
    inputBg: shift(bgHex,+25), textPrimary:'#F0EDE8', textMuted:'#9E8E80', textFaint:'#6B5F55',
  };
}

/**
 * Lightweight SPA Router
 * - /         → Supporter Facing Page
 * - /#setup   → Developer Wizard (protected by setupKey)
 */
export default function App() {
  const [hash, setHash]   = useState(window.location.hash);

  const [dark, setDark]   = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggleDark = () => setDark(d => !d);

  const queryParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const setupKey    = queryParams.get('key');
  const expectedKey = import.meta.env.VITE_SETUP_KEY || config.setupKey;

  const isSetup = hash.startsWith('#setup') &&
                  (config.showSetup !== false) &&
                  (!expectedKey || setupKey === expectedKey);

  /* ── Build dynamic styles from config color fields ── */
  const c       = config.accentColor || '#8B5E3C';
  const darkBg  = config.darkBg      || '#18130E';
  const lightBg = config.lightBg     || '#FDF8F3';
  const darkT   = deriveTheme(darkBg,  false);
  const lightT  = deriveTheme(lightBg, true);

  const dynamicStyles = `
    /* accent overrides */
    .bg-chai-500          { background-color: ${c} !important; }
    .text-chai-500,
    .text-chai-600        { color: ${c} !important; }
    .fill-chai-600        { fill: ${c} !important; }
    .border-chai-500      { border-color: ${c} !important; }
    .bg-chai-100          { background-color: ${c}22 !important; }
    .bg-chai-50           { background-color: ${c}11 !important; }
    .shadow-chai-500\\/20  { box-shadow: 0 8px 30px ${c}40 !important; }
    .hover\\:bg-chai-600:hover      { background-color: ${c}dd !important; }
    .focus\\:border-chai-500:focus  { border-color: ${c} !important; }
    .focus\\:ring-chai-500\\/30:focus { box-shadow: 0 0 0 3px ${c}30 !important; }

    /* light theme vars */
    :root {
      --bg:           ${lightT.bg};
      --bg-subtle:    ${lightT.bgSubtle};
      --card:         ${lightT.card};
      --card-border:  ${lightT.cardBorder};
      --input-bg:     ${lightT.inputBg};
      --text-primary: ${lightT.textPrimary};
      --text-muted:   ${lightT.textMuted};
      --text-faint:   ${lightT.textFaint};
    }

    /* dark theme vars */
    .dark {
      --bg:           ${darkT.bg};
      --bg-subtle:    ${darkT.bgSubtle};
      --card:         ${darkT.card};
      --card-border:  ${darkT.cardBorder};
      --input-bg:     ${darkT.inputBg};
      --text-primary: ${darkT.textPrimary};
      --text-muted:   ${darkT.textMuted};
      --text-faint:   ${darkT.textFaint};
    }
  `;

  return (
    <>
      <style>{dynamicStyles}</style>
      {isSetup
        ? <SetupPage dark={dark} toggleDark={toggleDark}/>
        : <SupporterPage dark={dark} toggleDark={toggleDark}/>}
    </>
  );
}

