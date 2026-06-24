'use client';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle } from '@phosphor-icons/react';
import styled from 'styled-components';

const Wrap = styled.section`
  padding: 7rem 2rem;
  background: var(--bg-raised);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
`;

const VisualSide = styled.div``;

const VisualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const QuoteCard = styled.div`
  grid-column: 1 / -1;
  background: #1c1914;
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: 2.2rem 2.6rem;
`;

const QuoteTag = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  margin-bottom: 1rem;
`;

const QuoteText = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.6;
  letter-spacing: -0.1px;
`;

const MetricCard = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem 1.6rem;
`;

const MetricNum = styled.div`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.4rem;
`;

const MetricLabel = styled.div`
  font-size: 0.82rem;
  color: var(--text-mid);
  line-height: 1.4;
`;

const TextSide = styled.div``;

const Label = styled.span`
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.8rem;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.2;
  color: var(--text-hi);
  margin-bottom: 1.2rem;
`;

const Body = styled.p`
  color: var(--text-mid);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  max-width: 500px;
`;

const SkillList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1rem;
  margin-top: 1.8rem;
`;

const Skill = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-mid);
`;

const metrics = [
  { num: '34+', label: 'Negocios digitalizados' },
  { num: '3+', label: 'Años entregando resultados' },
  { num: '19', label: 'Empresas activas' },
  { num: '24/7', label: 'Soporte y disponibilidad' },
];

const skills = [
  'Tiendas online y e-commerce', 'Automatización de operaciones',
  'Apps para iOS y Android', 'Inteligencia artificial aplicada',
  'Gestión de datos y reportes', 'Plataformas en la nube',
  'Diseño de experiencia digital', 'Integraciones con otros sistemas',
];

export default function About() {
  const reduce = useReducedMotion();

  const ent = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <Wrap id="sobre-mi">
      <Inner>
        <VisualSide>
          <motion.div {...ent(0)}>
            <VisualGrid>
              <QuoteCard>
                <QuoteTag>devlisis</QuoteTag>
                <QuoteText>
                  No vendemos código.<br />
                  Entregamos resultados<br />
                  para tu negocio.
                </QuoteText>
              </QuoteCard>

              {metrics.map(({ num, label }) => (
                <MetricCard key={label}>
                  <MetricNum>{num}</MetricNum>
                  <MetricLabel>{label}</MetricLabel>
                </MetricCard>
              ))}
            </VisualGrid>
          </motion.div>
        </VisualSide>

        <TextSide>
          <motion.div {...ent(0.1)}>
            <Label>¿Quiénes somos?</Label>
            <Title>Tecnología de alto nivel, al alcance de tu negocio.</Title>
          </motion.div>

          <motion.div {...ent(0.18)}>
            <Body>
              Creamos devlisis para que empresas de cualquier tamaño puedan acceder a
              tecnología de primer nivel sin complicaciones. Primero entendemos tu negocio
              y tus objetivos — después viene la tecnología.
            </Body>
            <Body>
              Hemos ayudado a negocios a digitalizar sus ventas, a emprendedores a
              lanzar su primer producto y a empresas establecidas a automatizar procesos
              que antes les costaban horas de trabajo cada día.
            </Body>
          </motion.div>

          <motion.div {...ent(0.24)}>
            <SkillList>
              {skills.map(s => (
                <Skill key={s}>
                  <CheckCircle
                    size={15}
                    weight="fill"
                    style={{ color: 'var(--accent)', flexShrink: 0 }}
                  />
                  {s}
                </Skill>
              ))}
            </SkillList>
          </motion.div>
        </TextSide>
      </Inner>
    </Wrap>
  );
}
