'use client';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import styled from 'styled-components';

/* ─── Layout ──────────────────────────────────────────── */

const HeroWrap = styled.section`
  background:
    radial-gradient(ellipse 55% 45% at 72% 55%, rgba(79, 70, 229, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 20% 30%, rgba(79, 70, 229, 0.03) 0%, transparent 60%),
    var(--bg);
  background-image:
    radial-gradient(ellipse 55% 45% at 72% 55%, rgba(79, 70, 229, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 20% 30%, rgba(79, 70, 229, 0.03) 0%, transparent 60%),
    radial-gradient(circle, rgba(79, 70, 229, 0.045) 1px, transparent 1px);
  background-size: auto, auto, 28px 28px;
  overflow: hidden;
`;

const Section = styled.div`
  min-height: 100dvh;
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

const Avail = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  background: var(--accent-light);
  border: 1px solid rgba(79, 70, 229, 0.2);
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
    animation: pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
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

/* ─── Code Editor ──────────────────────────────────────── */

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const EditorWrap = styled.div`
  width: 100%;
  max-width: 480px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(0, 0, 0, 0.06);
  background: #1e1e2e;
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.2rem;
  background: #181825;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;

  span {
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    &:nth-child(1) { background: #ff5f57; }
    &:nth-child(2) { background: #febc2e; }
    &:nth-child(3) { background: #28c840; }
  }
`;

const TabName = styled.span`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.38);
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
`;

const EditorBody = styled.div`
  padding: 1.2rem 0 1.2rem;
  line-height: 1.85;
`;

const CL = styled.div`
  display: flex;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.775rem;
  white-space: pre;
  padding: 0 1.2rem;

  &:empty { height: 1.85em; }
`;

const LN = styled.span`
  color: rgba(255, 255, 255, 0.18);
  min-width: 1.6rem;
  text-align: right;
  margin-right: 1.4rem;
  user-select: none;
  flex-shrink: 0;
`;

const EditorStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1.2rem;
  background: #181825;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.28);

  span:last-child { color: #a6e3a1; }
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

/* ─── Syntax helpers ─────────────────────────────────────── */
const tk = {
  cm: '#6c7086',
  kw: '#cba6f7',
  fn: '#89b4fa',
  st: '#a6e3a1',
  df: '#cdd6f4',
  pu: '#7f849c',
};

function L({ n, children }) {
  return (
    <CL>
      <LN>{n}</LN>
      {children}
    </CL>
  );
}

function S({ c, children }) {
  return <span style={{ color: c }}>{children}</span>;
}

const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

const ent = (reduce, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <HeroWrap id="inicio">
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
                Ver casos de éxito <ArrowRight size={17} weight="bold" />
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
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Right>
            <EditorWrap>
              <EditorHeader>
                <Dots><span /><span /><span /></Dots>
                <TabName>devlisis.js</TabName>
              </EditorHeader>

              <EditorBody>
                <L n={1}><S c={tk.cm}>{'// full-stack developer · devlisis'}</S></L>
                <CL />
                <L n={3}><S c={tk.kw}>import</S><S c={tk.df}>{' { design, develop, deploy } '}</S><S c={tk.kw}>from</S><S c={tk.st}>{" 'devlisis'"}</S></L>
                <CL />
                <L n={5}><S c={tk.kw}>{'export async function'}</S><S c={tk.fn}>{' build'}</S><S c={tk.pu}>{'(idea) {'}</S></L>
                <L n={6}><S c={tk.df}>{'  '}</S><S c={tk.kw}>const</S><S c={tk.df}>{' plan = '}</S><S c={tk.kw}>await</S><S c={tk.fn}>{' design'}</S><S c={tk.pu}>{'(idea)'}</S></L>
                <L n={7}><S c={tk.df}>{'  '}</S><S c={tk.kw}>const</S><S c={tk.df}>{' app  = '}</S><S c={tk.kw}>await</S><S c={tk.fn}>{' develop'}</S><S c={tk.pu}>{'(plan)'}</S></L>
                <L n={8}><S c={tk.df}>{'  '}</S><S c={tk.kw}>return</S><S c={tk.fn}>{' deploy'}</S><S c={tk.pu}>{'('}</S><S c={tk.df}>app</S><S c={tk.pu}>{', '}</S><S c={tk.st}>{'\'production\''}</S><S c={tk.pu}>{')'}</S></L>
                <L n={9}><S c={tk.pu}>{'}'}</S></L>
                <CL />
                <L n={11}><S c={tk.fn}>build</S><S c={tk.pu}>{'('}</S><S c={tk.st}>{"'tu idea'"}</S><S c={tk.pu}>{')'}</S></L>
              </EditorBody>

              <EditorStatus>
                <span>JavaScript</span>
                <span>UTF-8</span>
                <span>● Listo</span>
              </EditorStatus>
            </EditorWrap>

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
