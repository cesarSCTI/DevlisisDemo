'use client';
import { motion, useReducedMotion } from 'motion/react';
import { MagnifyingGlass, FileText, Code, RocketLaunch, Headset } from '@phosphor-icons/react';
import styled from 'styled-components';

const steps = [
  {
    num: '01',
    Icon: MagnifyingGlass,
    title: 'Diagnóstico',
    desc: 'Analizamos tu negocio, procesos y objetivos antes de proponer cualquier solución.',
    color: 'var(--accent)',
    bg: 'rgba(37,99,235,0.08)',
  },
  {
    num: '02',
    Icon: FileText,
    title: 'Propuesta',
    desc: 'Diseñamos una solución a medida con alcance, tiempos y costos definidos desde el inicio.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
  },
  {
    num: '03',
    Icon: Code,
    title: 'Desarrollo',
    desc: 'Construimos tu producto con entregas frecuentes y tu retroalimentación en cada etapa.',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    num: '04',
    Icon: RocketLaunch,
    title: 'Entrega',
    desc: 'Lanzamos tu solución lista para producción, con pruebas y capacitación incluidas.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
  },
  {
    num: '05',
    Icon: Headset,
    title: 'Soporte',
    desc: 'Te acompañamos tras el lanzamiento para que todo funcione sin interrupciones.',
    color: '#db2777',
    bg: 'rgba(219,39,119,0.08)',
  },
];

const Wrap = styled.section`
  padding: 7rem 2rem;
  background: var(--bg);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div``;

const SectionLabel = styled.span`
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
`;

const Sub = styled.p`
  color: var(--text-mid);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 320px;
  align-self: flex-end;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-top: 3px solid ${p => p.$color};
  border-radius: var(--radius);
  padding: 1.6rem 1.8rem;
`;

const Num = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: rgba(0, 0, 0, 0.07);
  line-height: 1;
  margin-bottom: 1.1rem;
`;

const IconBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: ${p => p.$bg};
  color: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text-hi);
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.84rem;
  color: var(--text-mid);
  line-height: 1.65;
`;

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <Wrap id="proceso">
      <Inner>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Header>
            <HeaderLeft>
              <SectionLabel>Cómo trabajamos</SectionLabel>
              <Title>De la idea al producto,<br />paso a paso.</Title>
            </HeaderLeft>
            <Sub>
              Un proceso claro y transparente para que siempre
              sepas en qué etapa está tu proyecto.
            </Sub>
          </Header>
        </motion.div>

        <Grid>
          {steps.map(({ num, Icon, title, desc, color, bg }, i) => (
            <Card
              key={num}
              $color={color}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Num>{num}</Num>
              <IconBox $bg={bg} $color={color}>
                <Icon size={18} weight="duotone" />
              </IconBox>
              <StepTitle>{title}</StepTitle>
              <StepDesc>{desc}</StepDesc>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Wrap>
  );
}
