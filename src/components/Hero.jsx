'use client';
import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowRight, TrendUp, ShoppingCart, Robot, Clock, ChartLineDown, Kanban, Calendar, Star } from '@phosphor-icons/react';
import styled, { keyframes } from 'styled-components';

/* ─── Layout ──────────────────────────────────────────── */

const HeroWrap = styled.section`
  position: relative;
  overflow: hidden;
  background: var(--bg);
`;

const Section = styled.div`
  position: relative;
  z-index: 1;
  min-height: 80dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 7rem 4rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 6rem 2rem 4rem;
    gap: 3rem;
  }
`;

const Left = styled.div`
  max-width: 560px;
`;

/* ─── Badge ────────────────────────────────────────────── */

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const flow = keyframes`
  from { stroke-dashoffset: 0; }
  to   { stroke-dashoffset: -22; }
`;

const Avail = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  background: var(--accent-light);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 1.8rem;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    animation: ${blink} 2s ease-in-out infinite;
    flex-shrink: 0;
  }
`;

/* ─── Typography ───────────────────────────────────────── */

const Title = styled.h1`
  font-size: clamp(2.6rem, 5.5vw, 4.4rem);
  font-weight: 900;
  line-height: 1.04;
  letter-spacing: -2px;
  margin-bottom: 1.4rem;
  color: var(--text-hi);

  em {
    font-style: normal;
    color: var(--accent);
  }
`;

const Sub = styled.p`
  font-size: 1.1rem;
  color: var(--text-mid);
  line-height: 1.75;
  max-width: 440px;
  margin-bottom: 2.2rem;
`;

/* ─── Buttons ──────────────────────────────────────────── */

const Btns = styled.div`
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.8rem;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: var(--shadow-accent);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--accent-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-accent-lg);
    }
  }
  &:active { transform: scale(0.98); }
`;

const Ghost = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.8rem;
  background: transparent;
  color: var(--text-hi);
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid var(--border-strong);
  transition: border-color 0.2s, color 0.2s, transform 0.15s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateY(-2px);
    }
  }
  &:active { transform: scale(0.98); }
`;

/* ─── Dashboard visual ──────────────────────────────────── */

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  position: relative;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const DashWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
`;

const FloatNotif = styled.div`
  position: absolute;
  right: -12px;
  top: -18px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.65rem 1rem;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 0.65rem;
  z-index: 2;
  white-space: nowrap;

  @media (max-width: 520px) { display: none; }
`;

const NotifDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #059669;
  flex-shrink: 0;
  animation: ${blink} 2s ease-in-out infinite;
`;

const NotifText = styled.div``;
const NotifTitle = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-hi);
`;
const NotifSub = styled.div`
  font-size: 0.68rem;
  color: var(--text-lo);
  margin-top: 1px;
`;

const DashCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(0, 0, 0, 0.03);
`;

const DashHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.3rem;
  border-bottom: 1px solid var(--border);
`;

const DashTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-hi);
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DashPeriod = styled.div`
  font-size: 0.7rem;
  color: var(--text-lo);
  background: var(--bg-raised);
  padding: 0.22rem 0.65rem;
  border-radius: var(--radius-pill);
`;

const ChartArea = styled.div`
  padding: 1.1rem 1.3rem 0;
`;

const ChartLab = styled.div`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text-lo);
  margin-bottom: 0.7rem;
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 7px;
  height: 72px;
`;

const Bar = styled.div`
  flex: 1;
  border-radius: 4px 4px 0 0;
  height: ${({ $h }) => $h}%;
  min-height: 4px;
  background: ${({ $active }) => $active
    ? 'var(--accent)'
    : 'var(--bg-raised)'};
`;

const MonthRow = styled.div`
  display: flex;
  gap: 7px;
  padding: 0.35rem 0 0;
`;

const ML = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.62rem;
  color: ${({ $active }) => $active ? 'var(--accent)' : 'var(--text-lo)'};
  font-weight: ${({ $active }) => $active ? '700' : '400'};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border-top: 1px solid var(--border);
  margin-top: 1px;
`;

const MetricBox = styled.div`
  padding: 1rem 1.3rem;
  background: var(--bg-surface);
`;

const MetricVal = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 0.25rem;
  color: ${({ $green }) => $green ? '#059669' : 'var(--text-hi)'};
`;

const MetricLab = styled.div`
  font-size: 0.68rem;
  color: var(--text-lo);
  font-weight: 500;
`;

/* ─── Stats ─────────────────────────────────────────────── */

const StatRow = styled.div`
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-hi);
  box-shadow: var(--shadow-sm);
`;

const StatDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $color }) => $color || 'var(--accent)'};
  flex-shrink: 0;
`;

/* ─── Dynamic Widget ────────────────────────────────────── */

const WidgetCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(0, 0, 0, 0.03);
  width: 100%;
  max-width: 460px;
`;

const WidgetHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.3rem;
  border-bottom: 1px solid var(--border);
`;

const WidgetIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: var(--radius-sm);
  background: ${p => p.$bg};
  color: ${p => p.$fg};
  flex-shrink: 0;
  transition: background 0.3s, color 0.3s;
`;

const WidgetLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-hi);
  flex: 1;
`;

const NavDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const NavDot = styled.button`
  width: ${p => p.$active ? '14px' : '5px'};
  height: 5px;
  border-radius: 3px;
  background: ${p => p.$active ? 'var(--accent)' : 'var(--border-strong)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;
`;

const WidgetBody = styled.div`
  padding: 1rem 1.3rem;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WHeadline = styled.div`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: var(--text-lo);
  margin-bottom: 0.55rem;
`;

/* Vista 1 — Ecommerce */
const BigStat = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text-hi);
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const GreenBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  background: rgba(5, 150, 105, 0.1);
  color: #059669;
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  font-weight: 700;
`;

const StatSub = styled.div`
  font-size: 0.72rem;
  color: var(--text-lo);
  margin-top: 0.3rem;
`;

/* Vista 2 — Operaciones */
const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin: 0.1rem 0 0.5rem;
`;

const TimeBox = styled.div`
  text-align: center;
`;

const TimeNum = styled.div`
  font-size: 1.55rem;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1;
  color: ${p => p.$accent ? 'var(--accent)' : 'var(--text-lo)'};
  ${p => p.$strike && 'text-decoration: line-through; opacity: 0.45;'}
`;

const TimeLab = styled.div`
  font-size: 0.6rem;
  color: var(--text-lo);
  margin-top: 2px;
`;

const ArrowSep = styled.div`
  font-size: 1rem;
  color: var(--border-strong);
  flex-shrink: 0;
`;

const AutoBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  font-weight: 600;
`;

/* Vista 3 — Costos */
const CostRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.9rem;
  margin-bottom: 0.6rem;
`;

const CostNum = styled.div`
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: #059669;
  line-height: 1;
`;

const CostSub = styled.div`
  font-size: 0.68rem;
  color: var(--text-lo);
  line-height: 1.4;
  padding-bottom: 3px;
`;

/* Vista 4 — Proyectos */
const ProjItem = styled.div`
  margin-bottom: 0.42rem;
  &:last-child { margin-bottom: 0; }
`;

const ProjRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.68rem;
  color: var(--text-mid);
  font-weight: 500;
  margin-bottom: 0.22rem;
`;

const ProjPct = styled.span`
  color: var(--text-lo);
  font-weight: 400;
`;

const TrackBar = styled.div`
  height: 4px;
  background: var(--bg-raised);
  border-radius: 2px;
  overflow: hidden;
`;

const FillBar = styled.div`
  height: 100%;
  width: ${p => p.$pct}%;
  background: var(--accent);
  border-radius: 2px;
`;

/* Vista 5 — Chatbot IA */
const PctRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin-bottom: 0.2rem;
`;

const LargePct = styled.div`
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -2px;
  color: var(--accent);
  line-height: 1;
`;

const MiniStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.45rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-lo);
`;

const MiniDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${p => p.$color || 'var(--accent)'};
`;

/* Vista 6 — Agenda */
const SlotGrid = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  max-width: 210px;
  margin: 0.45rem 0 0.35rem;
`;

const Slot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: ${p =>
    p.$booked ? '#059669' :
    p.$partial ? 'rgba(5,150,105,0.28)' :
    'var(--bg-raised)'};
`;

/* Vista 7 — Satisfacción */
const RatingWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.4rem;
`;

const RatingNum = styled.div`
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -2px;
  color: var(--text-hi);
  line-height: 1;
`;

const RatingInfo = styled.div``;

const StarDisplay = styled.div`
  color: #f59e0b;
  font-size: 0.95rem;
  letter-spacing: 1px;
  line-height: 1;
  margin-bottom: 0.15rem;
`;

const RatingBreak = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const RatingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.62rem;
  color: var(--text-lo);
  font-weight: 500;
`;

const RatingLabel = styled.span`
  width: 1.6rem;
  flex-shrink: 0;
`;

const RatingTrack = styled.div`
  flex: 1;
  height: 4px;
  background: var(--bg-raised);
  border-radius: 2px;
  overflow: hidden;
`;

const RatingFill = styled.div`
  height: 100%;
  width: ${p => p.$pct}%;
  background: #f59e0b;
  border-radius: 2px;
`;

const RatingPct = styled.span`
  width: 2rem;
  text-align: right;
  flex-shrink: 0;
`;

/* ─── Background lines ──────────────────────────────────── */

const FlowPath = styled.path`
  fill: none;
  stroke-dasharray: 8 14;
  animation: ${flow} ${p => p.$dur}s linear infinite;
  animation-delay: ${p => p.$delay}s;
  will-change: stroke-dashoffset;
`;

const LINE_SETS = [
  { d: 'M -50,155 C 280,30  790,270 1450,110',  stroke: 'rgba(37,99,235,0.14)',  w: 1,   dur: 2,   delay: 0     },
  { d: 'M -50,180 C 280,55  790,295 1450,135',  stroke: 'rgba(37,99,235,0.06)',  w: 0.8, dur: 2,   delay: -1.1  },
  { d: 'M -50,375 C 380,215 830,455 1450,330',  stroke: 'rgba(5,150,105,0.13)',  w: 1,   dur: 2.6, delay: -0.5  },
  { d: 'M -50,400 C 380,240 830,480 1450,355',  stroke: 'rgba(5,150,105,0.06)',  w: 0.8, dur: 2.6, delay: -1.8  },
  { d: 'M -50,565 C 320,415 790,590 1450,490',  stroke: 'rgba(99,102,241,0.12)', w: 1,   dur: 3.2, delay: -0.8  },
  { d: 'M -50,590 C 320,440 790,615 1450,515',  stroke: 'rgba(99,102,241,0.05)', w: 0.8, dur: 3.2, delay: -2.2  },
];

const BgLines = () => (
  <svg
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    viewBox="0 0 1400 700"
    preserveAspectRatio="xMidYMid slice"
  >
    {LINE_SETS.map((l, i) => (
      <FlowPath key={i} d={l.d} stroke={l.stroke} strokeWidth={l.w} $dur={l.dur} $delay={l.delay} />
    ))}
  </svg>
);

/* ─── Data ──────────────────────────────────────────────── */

const bars = [
  { h: 38, m: 'Ene' }, { h: 50, m: 'Feb' }, { h: 44, m: 'Mar' },
  { h: 63, m: 'Abr' }, { h: 71, m: 'May' }, { h: 100, m: 'Jun', active: true },
];

const VIEWS = [
  {
    id: 'ecommerce',
    Icon: ShoppingCart,
    iconBg: 'rgba(5, 150, 105, 0.12)',
    iconFg: '#059669',
    label: 'Ecommerce · Jun 2026',
    type: 'stat',
  },
  {
    id: 'admin',
    Icon: Clock,
    iconBg: 'var(--accent-light)',
    iconFg: 'var(--accent)',
    label: 'Operaciones',
    type: 'time',
  },
  {
    id: 'costos',
    Icon: ChartLineDown,
    iconBg: 'rgba(5, 150, 105, 0.12)',
    iconFg: '#059669',
    label: 'Eficiencia de costos',
    type: 'line',
  },
  {
    id: 'proyectos',
    Icon: Kanban,
    iconBg: 'var(--accent-light)',
    iconFg: 'var(--accent)',
    label: 'Proyectos activos',
    type: 'projects',
  },
  {
    id: 'chat',
    Icon: Robot,
    iconBg: 'var(--accent-light)',
    iconFg: 'var(--accent)',
    label: 'Chatbot IA',
    type: 'chat',
  },
  {
    id: 'booking',
    Icon: Calendar,
    iconBg: 'rgba(217, 119, 6, 0.12)',
    iconFg: '#d97706',
    label: 'Agenda digital',
    type: 'booking',
  },
  {
    id: 'rating',
    Icon: Star,
    iconBg: 'rgba(245, 158, 11, 0.12)',
    iconFg: '#f59e0b',
    label: 'Satisfacción · 4.9/5',
    type: 'rating',
  },
];

/* ─── Helpers ───────────────────────────────────────────── */

const DescLine = () => (
  <svg viewBox="0 0 160 40" fill="none" style={{ width: '100%', height: 40 }}>
    <defs>
      <linearGradient id="desc-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#059669" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M2 7 C 35 11 60 18 95 26 S 135 34 158 37"
      stroke="#059669" strokeWidth="1.8" strokeLinecap="round" fill="none"
    />
    <path
      d="M2 7 C 35 11 60 18 95 26 S 135 34 158 37 L 158 40 L 2 40 Z"
      fill="url(#desc-grad)"
    />
    <circle cx="2" cy="7" r="2.5" fill="#059669" />
    <circle cx="158" cy="37" r="2.5" fill="#059669" />
  </svg>
);

function WidgetContent({ type }) {
  if (type === 'stat') return (
    <WidgetBody>
      <WHeadline>Pedidos procesados este mes</WHeadline>
      <BigStat>
        340 pedidos
        <GreenBadge>automatizados</GreenBadge>
      </BigStat>
      <StatSub>+47% vs. mes anterior · $84,200 en ingresos</StatSub>
    </WidgetBody>
  );

  if (type === 'time') return (
    <WidgetBody>
      <WHeadline>Tiempo promedio de proceso</WHeadline>
      <TimeRow>
        <TimeBox>
          <TimeNum $strike>48h</TimeNum>
          <TimeLab>antes</TimeLab>
        </TimeBox>
        <ArrowSep>→</ArrowSep>
        <TimeBox>
          <TimeNum $accent>12h</TimeNum>
          <TimeLab>ahora</TimeLab>
        </TimeBox>
      </TimeRow>
      <AutoBadge>
        <Robot size={11} weight="fill" />
        Con automatización inteligente
      </AutoBadge>
    </WidgetBody>
  );

  if (type === 'line') return (
    <WidgetBody>
      <CostRow>
        <CostNum>−25%</CostNum>
        <CostSub>reducción de costos operativos<br />implementado en 3 meses</CostSub>
      </CostRow>
      <DescLine />
    </WidgetBody>
  );

  if (type === 'projects') return (
    <WidgetBody>
      <WHeadline>8 proyectos en desarrollo</WHeadline>
      <ProjItem>
        <ProjRow><span>E-commerce B2B</span><ProjPct>85%</ProjPct></ProjRow>
        <TrackBar><FillBar $pct={85} /></TrackBar>
      </ProjItem>
      <ProjItem>
        <ProjRow><span>ERP Integration</span><ProjPct>60%</ProjPct></ProjRow>
        <TrackBar><FillBar $pct={60} /></TrackBar>
      </ProjItem>
      <ProjItem>
        <ProjRow><span>App Móvil</span><ProjPct>40%</ProjPct></ProjRow>
        <TrackBar><FillBar $pct={40} /></TrackBar>
      </ProjItem>
    </WidgetBody>
  );

  if (type === 'chat') return (
    <WidgetBody>
      <WHeadline>Atención automática 24/7</WHeadline>
      <PctRow>
        <LargePct>80%</LargePct>
        <GreenBadge>sin intervención humana</GreenBadge>
      </PctRow>
      <StatSub>2,340 consultas este mes · respuesta en &lt;3 seg</StatSub>
      <MiniStat>
        <MiniDot $color="#059669" />
        disponible todos los días, sin personal extra
      </MiniStat>
    </WidgetBody>
  );

  if (type === 'booking') return (
    <WidgetBody>
      <WHeadline>Reservas online este mes</WHeadline>
      <BigStat>
        124 citas
        <GreenBadge>sin llamadas</GreenBadge>
      </BigStat>
      <SlotGrid>
        {Array.from({ length: 30 }, (_, i) => {
          const booked = new Set([0,1,3,4,7,8,10,13,14,15,17,18,21,22,24,27,28]).has(i);
          const partial = new Set([5,11,19,25]).has(i);
          return <Slot key={i} $booked={booked} $partial={partial} />;
        })}
      </SlotGrid>
      <StatSub>+68% vs. mes anterior · 0 llamadas telefónicas</StatSub>
    </WidgetBody>
  );

  if (type === 'rating') return (
    <WidgetBody>
      <WHeadline>Satisfacción de clientes</WHeadline>
      <RatingWrap>
        <RatingNum>4.9</RatingNum>
        <RatingInfo>
          <StarDisplay>★★★★★</StarDisplay>
          <StatSub style={{ marginTop: 0 }}>127 valoraciones</StatSub>
        </RatingInfo>
      </RatingWrap>
      <RatingBreak>
        {[{ label: '5★', pct: 89 }, { label: '4★', pct: 8 }, { label: '3★', pct: 3 }].map(r => (
          <RatingLine key={r.label}>
            <RatingLabel>{r.label}</RatingLabel>
            <RatingTrack><RatingFill $pct={r.pct} /></RatingTrack>
            <RatingPct>{r.pct}%</RatingPct>
          </RatingLine>
        ))}
      </RatingBreak>
    </WidgetBody>
  );

  return null;
}

const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

const ent = (reduce, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── Component ─────────────────────────────────────────── */

export default function Hero() {
  const reduce = useReducedMotion();
  const [activeWidget, setActiveWidget] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveWidget(v => (v + 1) % VIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const view = VIEWS[activeWidget];

  const widgetFade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <HeroWrap id="inicio">
      <BgLines />
      <Section>
        <Left>
          <motion.div {...ent(reduce, 0)}>
            <Avail>Empecemos tu proyecto hoy</Avail>
          </motion.div>

          <motion.div {...ent(reduce, 0.08)}>
            <Title>
              Tu negocio,<br />
              digitalizado y<br />
              <em>creciendo</em>
            </Title>
          </motion.div>

          <motion.div {...ent(reduce, 0.16)}>
            <Sub>
              Ayudamos a empresas y emprendedores a modernizar sus operaciones,
              automatizar procesos y vender más a través de soluciones digitales a la medida.
            </Sub>
          </motion.div>

          <motion.div {...ent(reduce, 0.22)}>
            <Btns>
              <Primary href="#portafolio" onClick={e => { e.preventDefault(); scrollTo('#portafolio'); }}>
                Nuestros servicios <ArrowRight size={17} weight="bold" />
              </Primary>
              <Ghost href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }}>
                Hablemos
              </Ghost>
            </Btns>
          </motion.div>
        </Left>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Right>
            <DashWrap>
              <FloatNotif>
                <NotifDot />
                <NotifText>
                  <NotifTitle>Nueva venta — $1,200</NotifTitle>
                  <NotifSub>Hace 3 minutos · procesado automáticamente</NotifSub>
                </NotifText>
              </FloatNotif>

              <DashCard>
                <DashHeader>
                  <DashTitle>
                    <TrendUp size={15} weight="bold" color="var(--accent)" />
                    Resultados de tu negocio
                  </DashTitle>
                  <DashPeriod>Junio 2026</DashPeriod>
                </DashHeader>

                <ChartArea>
                  <ChartLab>Ventas mensuales</ChartLab>
                  <Bars>
                    {bars.map(b => <Bar key={b.m} $h={b.h} $active={b.active} />)}
                  </Bars>
                  <MonthRow>
                    {bars.map(b => <ML key={b.m} $active={b.active}>{b.m}</ML>)}
                  </MonthRow>
                </ChartArea>

                <MetricsGrid>
                  <MetricBox>
                    <MetricVal $green>+47%</MetricVal>
                    <MetricLab>vs. mes anterior</MetricLab>
                  </MetricBox>
                  <MetricBox>
                    <MetricVal>$84,200</MetricVal>
                    <MetricLab>ingresos este mes</MetricLab>
                  </MetricBox>
                </MetricsGrid>
              </DashCard>
            </DashWrap>

            {/* Dynamic Widget — rotates every 5 s */}
            <WidgetCard>
              <WidgetHead>
                <WidgetIconBox $bg={view.iconBg} $fg={view.iconFg}>
                  <view.Icon size={13} weight="fill" />
                </WidgetIconBox>
                <WidgetLabel>{view.label}</WidgetLabel>
                <NavDots>
                  {VIEWS.map((_, i) => (
                    <NavDot
                      key={i}
                      $active={i === activeWidget}
                      onClick={() => setActiveWidget(i)}
                      aria-label={VIEWS[i].label}
                    />
                  ))}
                </NavDots>
              </WidgetHead>

              <AnimatePresence mode="wait">
                <motion.div key={view.id} {...widgetFade}>
                  <WidgetContent type={view.type} />
                </motion.div>
              </AnimatePresence>
            </WidgetCard>

            <StatRow>
              <StatPill><StatDot $color="var(--accent)" />34+ negocios transformados</StatPill>
              <StatPill><StatDot $color="#059669" />19 empresas confían en nosotros</StatPill>
              <StatPill><StatDot $color="#d97706" />3+ años generando resultados</StatPill>
            </StatRow>
          </Right>
        </motion.div>
      </Section>
    </HeroWrap>
  );
}
