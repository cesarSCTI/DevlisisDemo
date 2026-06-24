'use client';
import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import styled from 'styled-components';

/* ─── Layout ──────────────────────────────────────────── */

const Wrap = styled.section`
  padding: 7rem 2rem;
  background: var(--bg);
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const HeadLeft = styled.div``;

const Label = styled.span`
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.8rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--text-hi);
`;

/* ─── Filter pills ─────────────────────────────────────── */

const Filters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Pill = styled.button`
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid;
  transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  background: ${({ $active }) => $active ? 'var(--accent)' : 'transparent'};
  border-color: ${({ $active }) => $active ? 'transparent' : 'var(--border-strong)'};
  color: ${({ $active }) => $active ? '#fff' : 'var(--text-mid)'};
  box-shadow: ${({ $active }) => $active ? 'var(--shadow-accent)' : 'none'};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ $active }) => $active ? 'var(--accent-dark)' : 'var(--bg-raised)'};
      color: ${({ $active }) => $active ? '#fff' : 'var(--text-hi)'};
      border-color: ${({ $active }) => $active ? 'transparent' : 'var(--border-strong)'};
    }
  }
  &:active { transform: scale(0.97); }
`;

/* ─── Grid ─────────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  grid-column: ${({ $span }) => $span || 'span 4'};
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: rgba(79, 70, 229, 0.3);
      box-shadow: var(--shadow-md);
      transform: translateY(-3px);
    }
  }

  @media (max-width: 900px) { grid-column: span 1; }
`;

/* ─── Thumbnail ─────────────────────────────────────────── */

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio || '16/9'};
  background: ${({ $gradient }) => $gradient};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.2) 100%);
  }
`;

const MockupFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 88%;
  filter: drop-shadow(0 12px 32px rgba(0,0,0,0.3));
`;

/* ─── Card body ─────────────────────────────────────────── */

const CardBody = styled.div`
  padding: 1.4rem 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardCat = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent);
  display: block;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-hi);
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  color: var(--text-mid);
  font-size: 0.88rem;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.18rem 0.6rem;
  background: var(--accent-light);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  color: var(--accent-dark);
  font-weight: 500;
`;

const ComingSoon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-lo);
  user-select: none;
`;

/* ─── Mockup SVG components ─────────────────────────────── */

const StoreMockup = () => (
  <svg viewBox="0 0 280 158" width="100%" fill="none">
    <defs><clipPath id="s-clip"><rect width="280" height="158" rx="8"/></clipPath></defs>
    <g clipPath="url(#s-clip)">
      <rect width="280" height="158" fill="rgba(0,0,0,0.1)"/>
      {/* Nav */}
      <rect width="280" height="28" fill="rgba(255,255,255,0.18)"/>
      <rect x="10" y="10" width="52" height="8" rx="3" fill="rgba(255,255,255,0.85)"/>
      <rect x="74" y="8" width="126" height="12" rx="6" fill="rgba(255,255,255,0.15)"/>
      <rect x="82" y="12" width="55" height="4" rx="2" fill="rgba(255,255,255,0.35)"/>
      <rect x="218" y="7" width="14" height="14" rx="3" fill="rgba(255,255,255,0.2)"/>
      <rect x="221" y="10" width="8" height="5.5" rx="1.5" fill="rgba(255,255,255,0.65)"/>
      <circle cx="222.5" cy="17" r="1.5" fill="rgba(255,255,255,0.65)"/>
      <circle cx="227.5" cy="17" r="1.5" fill="rgba(255,255,255,0.65)"/>
      <circle cx="252" cy="14" r="7" fill="rgba(74,222,128,0.85)"/>
      <rect x="249" y="11" width="6" height="5" rx="1" fill="rgba(255,255,255,0.9)"/>
      {/* Product cards */}
      {[0, 1, 2].map(i => {
        const x = 10 + i * 91;
        const featured = i === 1;
        return (
          <g key={i}>
            <rect x={x} y="34" width="79" height="90" rx="6"
              fill={`rgba(255,255,255,${featured ? 0.2 : 0.13})`}/>
            <rect x={x} y="34" width="79" height="50" rx="6"
              fill={`rgba(255,255,255,${featured ? 0.3 : 0.2})`}/>
            {featured && (
              <>
                <rect x={x} y="34" width="40" height="14" rx="7" fill="rgba(74,222,128,0.85)"/>
                <rect x={x+7} y="39" width="26" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
              </>
            )}
            <rect x={x+15} y="44" width="48" height="28" rx="4"
              fill={`rgba(255,255,255,${featured ? 0.35 : 0.25})`}/>
            <rect x={x+6} y="90" width="48" height="5" rx="2" fill="rgba(255,255,255,0.65)"/>
            <rect x={x+6} y="99" width="34" height="7" rx="2" fill="rgba(255,255,255,0.85)"/>
            <rect x={x+6} y="110" width="62" height="10" rx="5"
              fill={`rgba(255,255,255,${featured ? 0.78 : 0.18})`}/>
            {featured && (
              <rect x={x+18} y="113.5" width="38" height="4" rx="2" fill="rgba(0,0,0,0.18)"/>
            )}
          </g>
        );
      })}
      {/* Promo bar */}
      <rect y="136" width="280" height="22" fill="rgba(255,255,255,0.1)"/>
      <rect x="80" y="141" width="120" height="6" rx="3" fill="rgba(255,255,255,0.3)"/>
    </g>
  </svg>
);

const DashMockup = () => {
  const barHeights = [38, 55, 44, 68, 78, 100];
  return (
    <svg viewBox="0 0 280 158" width="100%" fill="none">
      <defs><clipPath id="db-clip"><rect width="280" height="158" rx="8"/></clipPath></defs>
      <g clipPath="url(#db-clip)">
        <rect width="280" height="158" fill="rgba(0,0,0,0.08)"/>
        {/* Top metric bar */}
        <rect width="280" height="40" fill="rgba(255,255,255,0.18)"/>
        <rect x="12" y="9" width="78" height="10" rx="3" fill="rgba(255,255,255,0.85)"/>
        <rect x="12" y="24" width="52" height="7" rx="2" fill="rgba(255,255,255,0.4)"/>
        {/* KPI chips */}
        <rect x="148" y="8" width="60" height="24" rx="5" fill="rgba(255,255,255,0.18)"/>
        <rect x="155" y="13" width="38" height="8" rx="2" fill="rgba(255,255,255,0.78)"/>
        <rect x="155" y="24" width="26" height="4" rx="2" fill="rgba(255,255,255,0.38)"/>
        <rect x="214" y="8" width="58" height="24" rx="5" fill="rgba(255,255,255,0.18)"/>
        <rect x="221" y="13" width="30" height="8" rx="2" fill="rgba(74,222,128,0.85)"/>
        <rect x="221" y="24" width="36" height="4" rx="2" fill="rgba(255,255,255,0.38)"/>
        {/* Chart area label */}
        <rect x="12" y="48" width="78" height="5" rx="2" fill="rgba(255,255,255,0.35)"/>
        {/* Bars */}
        {barHeights.map((h, i) => {
          const bH = h * 0.58;
          const bX = 14 + i * 38;
          const bY = 116 - bH;
          const active = i === 5;
          return (
            <g key={i}>
              <rect x={bX} y={bY} width="26" height={bH} rx="4"
                fill={active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.22)'}/>
              <rect x={bX+2} y="120" width="22" height="4" rx="2"
                fill={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}/>
            </g>
          );
        })}
        {/* Footer metrics */}
        <rect y="136" width="280" height="22" fill="rgba(255,255,255,0.1)"/>
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={10 + i * 92} y="140" width="80" height="12" rx="4"
              fill="rgba(255,255,255,0.12)"/>
            <rect x={15 + i * 92} y="143" width="38" height="5" rx="2"
              fill="rgba(255,255,255,0.55)"/>
          </g>
        ))}
      </g>
    </svg>
  );
};

const DeliveryMockup = () => (
  <svg viewBox="0 0 200 250" width="100%" fill="none">
    <defs><clipPath id="del-clip"><rect width="200" height="250" rx="8"/></clipPath></defs>
    <g clipPath="url(#del-clip)">
      <rect width="200" height="250" fill="rgba(0,0,0,0.08)"/>
      {/* Status bar */}
      <rect width="200" height="20" fill="rgba(255,255,255,0.15)"/>
      <rect x="10" y="7" width="28" height="6" rx="2" fill="rgba(255,255,255,0.55)"/>
      <circle cx="185" cy="10" r="4" fill="rgba(255,255,255,0.55)"/>
      <circle cx="173" cy="10" r="4" fill="rgba(255,255,255,0.35)"/>
      {/* Header */}
      <rect width="200" height="50" fill="rgba(255,255,255,0.18)"/>
      <rect x="14" y="24" width="108" height="10" rx="3" fill="rgba(255,255,255,0.85)"/>
      <rect x="14" y="38" width="72" height="7" rx="2" fill="rgba(255,255,255,0.45)"/>
      {/* Progress track */}
      <rect x="14" y="62" width="172" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
      <rect x="14" y="62" width="130" height="3" rx="1.5" fill="rgba(255,255,255,0.75)"/>
      {[0, 1, 2, 3].map(i => (
        <circle key={i} cx={14 + i * 57.3} cy="63.5" r="6"
          fill={i < 3 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.22)'}/>
      ))}
      {['Recibido', 'Preparando', 'En camino', 'Entrega'].map((_, i) => (
        <rect key={i} x={8 + i * 50} y="74" width={i === 0 ? 34 : i === 1 ? 38 : i === 2 ? 34 : 28}
          height="4" rx="2" fill={i < 3 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)'}/>
      ))}
      {/* Map */}
      <rect x="12" y="88" width="176" height="120" rx="8" fill="rgba(255,255,255,0.12)"/>
      {/* Map grid */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="12" y1={106 + i * 26} x2="188" y2={106 + i * 26}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={30 + i * 42} y1="88" x2={30 + i * 42} y2="208"
          stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}
      {/* Route */}
      <path d="M34 194 Q60 188 82 164 T148 132"
        stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeDasharray="5 3" fill="none"/>
      {/* Destination pin */}
      <circle cx="148" cy="132" r="7" fill="rgba(74,222,128,0.85)"/>
      <circle cx="148" cy="132" r="3" fill="rgba(255,255,255,0.9)"/>
      {/* Truck marker */}
      <circle cx="82" cy="164" r="11" fill="rgba(255,255,255,0.2)"/>
      <rect x="75" y="159" width="14" height="9" rx="2" fill="rgba(255,255,255,0.85)"/>
      <circle cx="78" cy="169.5" r="2" fill="rgba(255,255,255,0.65)"/>
      <circle cx="85" cy="169.5" r="2" fill="rgba(255,255,255,0.65)"/>
      {/* ETA card */}
      <rect x="12" y="216" width="176" height="28" rx="6" fill="rgba(255,255,255,0.18)"/>
      <rect x="20" y="222" width="58" height="7" rx="2" fill="rgba(255,255,255,0.75)"/>
      <rect x="20" y="233" width="42" height="5" rx="2" fill="rgba(255,255,255,0.4)"/>
      <rect x="138" y="220" width="42" height="16" rx="5" fill="rgba(74,222,128,0.7)"/>
      <rect x="143" y="226" width="32" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
    </g>
  </svg>
);

const ChatMockup = () => (
  <svg viewBox="0 0 200 250" width="100%" fill="none">
    <defs><clipPath id="ch-clip"><rect width="200" height="250" rx="8"/></clipPath></defs>
    <g clipPath="url(#ch-clip)">
      <rect width="200" height="250" fill="rgba(0,0,0,0.08)"/>
      {/* Header */}
      <rect width="200" height="46" fill="rgba(255,255,255,0.18)"/>
      <rect x="8" y="17" width="12" height="12" rx="3" fill="rgba(255,255,255,0.22)"/>
      <circle cx="36" cy="23" r="13" fill="rgba(255,255,255,0.22)"/>
      <rect x="54" y="14" width="72" height="8" rx="3" fill="rgba(255,255,255,0.85)"/>
      <circle cx="57" cy="30" r="3.5" fill="rgba(74,222,128,0.9)"/>
      <rect x="65" y="26" width="38" height="6" rx="2" fill="rgba(255,255,255,0.45)"/>
      {/* Bot msg 1 */}
      <rect x="10" y="56" width="126" height="30" rx="12" fill="rgba(255,255,255,0.2)"/>
      <rect x="20" y="63" width="82" height="6" rx="2" fill="rgba(255,255,255,0.72)"/>
      <rect x="20" y="73" width="60" height="5" rx="2" fill="rgba(255,255,255,0.42)"/>
      {/* User msg 1 */}
      <rect x="66" y="96" width="124" height="22" rx="12" fill="rgba(255,255,255,0.3)"/>
      <rect x="76" y="102" width="82" height="6" rx="2" fill="rgba(255,255,255,0.82)"/>
      <rect x="76" y="111" width="50" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
      {/* Bot msg 2 */}
      <rect x="10" y="128" width="148" height="38" rx="12" fill="rgba(255,255,255,0.2)"/>
      <rect x="20" y="136" width="96" height="6" rx="2" fill="rgba(255,255,255,0.72)"/>
      <rect x="20" y="146" width="118" height="5" rx="2" fill="rgba(255,255,255,0.45)"/>
      <rect x="20" y="155" width="72" height="5" rx="2" fill="rgba(255,255,255,0.3)"/>
      {/* User msg 2 */}
      <rect x="90" y="176" width="100" height="22" rx="12" fill="rgba(255,255,255,0.3)"/>
      <rect x="100" y="182" width="68" height="6" rx="2" fill="rgba(255,255,255,0.82)"/>
      <rect x="100" y="191" width="44" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
      {/* Typing indicator */}
      <rect x="10" y="208" width="56" height="22" rx="11" fill="rgba(255,255,255,0.18)"/>
      <circle cx="25" cy="219" r="3" fill="rgba(255,255,255,0.65)"/>
      <circle cx="35" cy="219" r="3" fill="rgba(255,255,255,0.42)"/>
      <circle cx="45" cy="219" r="3" fill="rgba(255,255,255,0.25)"/>
      {/* Input bar */}
      <rect y="234" width="200" height="16" fill="rgba(255,255,255,0.15)"/>
      <rect x="10" y="237" width="148" height="10" rx="5" fill="rgba(255,255,255,0.15)"/>
      <rect x="16" y="240" width="58" height="4" rx="2" fill="rgba(255,255,255,0.38)"/>
      <circle cx="182" cy="242" r="7" fill="rgba(255,255,255,0.4)"/>
      <rect x="179" y="239" width="6" height="6" rx="1" fill="rgba(255,255,255,0.75)"/>
    </g>
  </svg>
);

const CalendarMockup = () => {
  const booked = new Set([2, 4, 7, 9, 14, 16, 21, 23, 28]);
  const today = 14;
  return (
    <svg viewBox="0 0 200 250" width="100%" fill="none">
      <defs><clipPath id="cal-clip"><rect width="200" height="250" rx="8"/></clipPath></defs>
      <g clipPath="url(#cal-clip)">
        <rect width="200" height="250" fill="rgba(0,0,0,0.08)"/>
        {/* Header */}
        <rect width="200" height="44" fill="rgba(255,255,255,0.18)"/>
        <rect x="12" y="10" width="84" height="10" rx="3" fill="rgba(255,255,255,0.85)"/>
        <rect x="12" y="25" width="58" height="7" rx="2" fill="rgba(255,255,255,0.45)"/>
        <rect x="156" y="13" width="14" height="14" rx="4" fill="rgba(255,255,255,0.2)"/>
        <rect x="174" y="13" width="14" height="14" rx="4" fill="rgba(255,255,255,0.2)"/>
        {/* Day labels */}
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((_, i) => (
          <rect key={i} x={10 + i * 26} y="52" width="18" height="14" rx="4"
            fill={i >= 5 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.14)'}/>
        ))}
        {/* Calendar cells — 5 weeks */}
        {Array.from({ length: 35 }, (_, idx) => {
          const row = Math.floor(idx / 7);
          const col = idx % 7;
          const cx = 10 + col * 26;
          const cy = 72 + row * 22;
          const isToday = idx === today;
          const isBk = booked.has(idx);
          return (
            <rect key={idx} x={cx} y={cy} width="18" height="16" rx="4"
              fill={isToday
                ? 'rgba(255,255,255,0.78)'
                : isBk
                ? 'rgba(255,255,255,0.32)'
                : 'rgba(255,255,255,0.08)'}/>
          );
        })}
        {/* CTA */}
        <rect x="12" y="196" width="176" height="34" rx="8" fill="rgba(255,255,255,0.78)"/>
        <rect x="46" y="209" width="108" height="8" rx="3" fill="rgba(0,0,0,0.18)"/>
        {/* Selected slot info */}
        <rect x="12" y="236" width="176" height="10" rx="4" fill="rgba(255,255,255,0.14)"/>
        <rect x="18" y="238.5" width="80" height="5" rx="2" fill="rgba(255,255,255,0.5)"/>
        <rect x="148" y="238.5" width="32" height="5" rx="2" fill="rgba(74,222,128,0.7)"/>
      </g>
    </svg>
  );
};

const QuotesMockup = () => (
  <svg viewBox="0 0 280 158" width="100%" fill="none">
    <defs><clipPath id="q-clip"><rect width="280" height="158" rx="8"/></clipPath></defs>
    <g clipPath="url(#q-clip)">
      <rect width="280" height="158" fill="rgba(255,255,255,0.08)"/>
      {/* Document card */}
      <rect x="28" y="6" width="224" height="146" rx="7" fill="rgba(255,255,255,0.15)"/>
      {/* Doc header */}
      <rect x="28" y="6" width="224" height="34" rx="7" fill="rgba(255,255,255,0.22)"/>
      <rect x="38" y="13" width="58" height="9" rx="3" fill="rgba(255,255,255,0.85)"/>
      <rect x="38" y="26" width="82" height="6" rx="2" fill="rgba(255,255,255,0.45)"/>
      <rect x="192" y="11" width="52" height="20" rx="5" fill="rgba(255,255,255,0.2)"/>
      <rect x="198" y="15" width="40" height="6" rx="2" fill="rgba(255,255,255,0.68)"/>
      <rect x="198" y="24" width="28" height="4.5" rx="2" fill="rgba(255,255,255,0.38)"/>
      {/* Line items */}
      {[0, 1, 2].map(i => {
        const y = 48 + i * 24;
        return (
          <g key={i}>
            <rect x="38" y={y} width="108" height="7" rx="2.5" fill="rgba(255,255,255,0.55)"/>
            <rect x="38" y={y + 11} width="76" height="4.5" rx="2" fill="rgba(255,255,255,0.3)"/>
            <rect x="206" y={y} width="40" height="7" rx="2" fill="rgba(255,255,255,0.68)"/>
          </g>
        );
      })}
      {/* Divider */}
      <rect x="38" y="120" width="204" height="1" fill="rgba(255,255,255,0.2)"/>
      {/* Total */}
      <rect x="38" y="126" width="52" height="8" rx="2" fill="rgba(255,255,255,0.75)"/>
      <rect x="198" y="123" width="50" height="14" rx="4" fill="rgba(255,255,255,0.85)"/>
      {/* Approve button */}
      <rect x="38" y="140" width="204" height="8" rx="4" fill="rgba(74,222,128,0.8)"/>
      <rect x="84" y="142" width="112" height="4" rx="2" fill="rgba(255,255,255,0.9)"/>
    </g>
  </svg>
);

const InventoryMockup = () => {
  const rows = [
    { pct: 72, low: false },
    { pct: 14, low: true },
    { pct: 91, low: false },
    { pct: 53, low: false },
  ];
  return (
    <svg viewBox="0 0 280 158" width="100%" fill="none">
      <defs><clipPath id="inv-clip"><rect width="280" height="158" rx="8"/></clipPath></defs>
      <g clipPath="url(#inv-clip)">
        <rect width="280" height="158" fill="rgba(0,0,0,0.08)"/>
        {/* Header */}
        <rect width="280" height="34" fill="rgba(255,255,255,0.18)"/>
        <rect x="12" y="10" width="72" height="9" rx="3" fill="rgba(255,255,255,0.85)"/>
        <rect x="12" y="23" width="52" height="5" rx="2" fill="rgba(255,255,255,0.4)"/>
        <rect x="162" y="8" width="106" height="18" rx="9" fill="rgba(255,255,255,0.15)"/>
        <rect x="174" y="13" width="62" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
        {/* Column labels */}
        <rect width="280" height="22" y="34" fill="rgba(255,255,255,0.1)"/>
        <rect x="12" y="40" width="55" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
        <rect x="128" y="40" width="50" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
        <rect x="232" y="40" width="36" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
        {/* Rows */}
        {rows.map(({ pct, low }, i) => {
          const y = 56 + i * 24;
          return (
            <g key={i}>
              <rect x="0" y={y} width="280" height="22"
                fill={low ? 'rgba(248,113,113,0.09)' : i % 2 ? 'rgba(255,255,255,0.04)' : 'transparent'}/>
              <rect x="12" y={y + 7} width="86" height="7" rx="2.5"
                fill="rgba(255,255,255,0.62)"/>
              <rect x="120" y={y + 8} width="92" height="5" rx="2.5"
                fill="rgba(255,255,255,0.12)"/>
              <rect x="120" y={y + 8} width={92 * pct / 100} height="5" rx="2.5"
                fill={low ? 'rgba(248,113,113,0.78)' : 'rgba(255,255,255,0.55)'}/>
              <rect x="232" y={y + 7} width="30" height="7" rx="2"
                fill={low ? 'rgba(248,113,113,0.85)' : 'rgba(255,255,255,0.62)'}/>
              {low && <circle cx="268" cy={y + 11} r="5" fill="rgba(248,113,113,0.72)"/>}
            </g>
          );
        })}
        {/* Footer */}
        <rect y="152" width="280" height="6" fill="rgba(255,255,255,0.08)"/>
        <rect x="12" y="153.5" width="58" height="3" rx="1.5" fill="rgba(255,255,255,0.28)"/>
        <rect x="194" y="153.5" width="74" height="3" rx="1.5" fill="rgba(255,255,255,0.28)"/>
      </g>
    </svg>
  );
};

/* ─── Data ──────────────────────────────────────────────── */

const projects = [
  {
    id: 1,
    title: 'Tienda online que vende sola',
    category: 'Web App',
    description: 'Transformamos el negocio físico de un cliente en una tienda online completa. Hoy vende las 24 horas sin atención manual y sin depender de intermediarios.',
    tags: ['Tienda online', 'Pagos digitales', 'Inventario automático'],
    filter: 'web',
    span: 'span 6',
    ratio: '16/9',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
    Mockup: StoreMockup,
  },
  {
    id: 2,
    title: 'Panel de control empresarial',
    category: 'Dashboard',
    description: 'Una empresa dejó de perder horas generando reportes manualmente. Ahora su equipo toma decisiones con datos en tiempo real desde cualquier dispositivo.',
    tags: ['Reportes automáticos', 'Métricas en tiempo real', 'Multi-usuario'],
    filter: 'web',
    span: 'span 6',
    ratio: '16/9',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    Mockup: DashMockup,
  },
  {
    id: 3,
    title: 'App de domicilios propia',
    category: 'Mobile',
    description: 'Eliminamos la dependencia de plataformas de terceros. El negocio gestiona sus propios pedidos, establece sus precios y se queda con el 100% de las ganancias.',
    tags: ['App propia', 'Tracking en vivo', 'Sin comisiones'],
    filter: 'mobile',
    span: 'span 4',
    ratio: '4/5',
    gradient: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',
    Mockup: DeliveryMockup,
  },
  {
    id: 4,
    title: 'Atención al cliente automática',
    category: 'IA',
    description: 'El 80% de las preguntas frecuentes respondidas en segundos, sin intervención humana. El equipo de soporte ahora se enfoca en cerrar ventas.',
    tags: ['Chatbot IA', 'Disponible 24/7', 'Sin personal extra'],
    filter: 'ia',
    span: 'span 4',
    ratio: '4/5',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #312e81 100%)',
    Mockup: ChatMockup,
  },
  {
    id: 5,
    title: 'Agenda online inteligente',
    category: 'Web App',
    description: 'Una clínica eliminó las llamadas para agendar citas. Los pacientes reservan solos, reciben recordatorios automáticos y cancelan sin necesidad de llamar.',
    tags: ['Reservas online', 'Recordatorios automáticos', 'Historial digital'],
    filter: 'web',
    span: 'span 4',
    ratio: '4/5',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%)',
    Mockup: CalendarMockup,
  },
  {
    id: 6,
    title: 'Cotizaciones y ventas en piloto automático',
    category: 'Automatización',
    description: 'Un negocio de servicios dejó de redactar propuestas a mano. Ahora cada cliente recibe su cotización personalizada en segundos, las aprueba en línea y el equipo solo ejecuta el trabajo.',
    tags: ['Cotizaciones automáticas', 'Aprobación en línea', 'Sin trabajo manual'],
    filter: 'automatizacion',
    span: 'span 6',
    ratio: '16/9',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #9f1239 100%)',
    Mockup: QuotesMockup,
  },
  {
    id: 7,
    title: 'Control de inventario y administración',
    category: 'Web App',
    description: 'Una distribuidora reemplazó sus hojas de cálculo con un sistema propio. Ahora saben qué tienen, qué se está agotando y cuánto vendieron — todo en tiempo real desde cualquier dispositivo.',
    tags: ['Stock en tiempo real', 'Alertas de reabastecimiento', 'Reportes automáticos'],
    filter: 'web',
    span: 'span 6',
    ratio: '16/9',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    Mockup: InventoryMockup,
  },
];

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Automatización', value: 'automatizacion' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'IA', value: 'ia' },
];

export default function Portfolio() {
  const [active, setActive] = useState('all');
  const reduce = useReducedMotion();

  const visible = active === 'all' ? projects : projects.filter(p => p.filter === active);

  return (
    <Wrap id="portafolio">
      <Header>
        <HeadLeft>
          <Label>Casos de éxito</Label>
          <Title>Lo que hemos logrado para otros negocios</Title>
        </HeadLeft>
        <Filters>
          {filters.map(f => (
            <Pill key={f.value} $active={active === f.value} onClick={() => setActive(f.value)}>
              {f.label}
            </Pill>
          ))}
        </Filters>
      </Header>

      <Grid>
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <Card
              key={p.id}
              $span={p.span}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Thumb $ratio={p.ratio} $gradient={p.gradient}>
                <MockupFrame>
                  <p.Mockup />
                </MockupFrame>
              </Thumb>
              <CardBody>
                <CardCat>{p.category}</CardCat>
                <CardTitle>{p.title}</CardTitle>
                <CardDesc>{p.description}</CardDesc>
                <Tags>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
              </CardBody>
            </Card>
          ))}
        </AnimatePresence>
      </Grid>
    </Wrap>
  );
}
