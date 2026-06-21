'use client';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle } from '@phosphor-icons/react';
import styled from 'styled-components';

const Wrap = styled.section`
  padding: 7rem 2rem;
  background: var(--bg-raised);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
`;

const ImgSide = styled.div`
  position: relative;
`;

const PhotoFrame = styled.div`
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4 / 5;
  max-width: 420px;
  box-shadow: var(--shadow-md);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(250, 250, 248, 0.5) 0%, transparent 50%);
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const StatStrip = styled.div`
  position: absolute;
  bottom: -20px;
  left: -20px;
  right: 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.4rem 1.8rem;
  display: flex;
  gap: 2rem;
  z-index: 2;
  box-shadow: var(--shadow-md);

  @media (max-width: 480px) { position: static; margin-top: 1rem; }
`;

const Stat = styled.div``;

const StatNum = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--accent);
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.78rem;
  color: var(--text-lo);
  margin-top: 0.2rem;
`;

const TextSide = styled.div``;

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
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.8px;
  line-height: 1.15;
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
  font-size: 0.92rem;
  color: var(--text-mid);
  font-weight: 500;
`;

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
        <ImgSide>
          <motion.div {...ent(0)}>
            <PhotoFrame>
              <img
                src="https://picsum.photos/seed/devlisis-dev-portrait/840/1050"
                alt="Foto del desarrollador"
              />
            </PhotoFrame>
            <StatStrip>
              <Stat>
                <StatNum>34+</StatNum>
                <StatLabel>Negocios digitalizados</StatLabel>
              </Stat>
              <Stat>
                <StatNum>3+</StatNum>
                <StatLabel>Años de resultados</StatLabel>
              </Stat>
              <Stat>
                <StatNum>19</StatNum>
                <StatLabel>Empresas activas</StatLabel>
              </Stat>
            </StatStrip>
          </motion.div>
        </ImgSide>

        <TextSide>
          <motion.div {...ent(0.1)}>
            <Label>¿Quiénes somos?</Label>
            <Title>No vendemos código. Entregamos resultados para tu negocio.</Title>
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
                    size={16}
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
