'use client';
import { motion, useReducedMotion } from 'motion/react';
import {
  Code, DeviceMobile, Database, PaintBrush,
  CloudArrowUp, Robot
} from '@phosphor-icons/react';
import styled from 'styled-components';

const Wrap = styled.section`
  padding: 7rem 2rem;
  background: var(--bg);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
`;

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
  line-height: 1.1;
  color: var(--text-hi);
  max-width: 480px;
`;

const Desc = styled.p`
  color: var(--text-mid);
  font-size: 1rem;
  max-width: 360px;
  line-height: 1.75;
  align-self: flex-end;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled(motion.div)`
  background: var(--bg-surface);
  padding: 2.4rem 2.8rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  transition: background 0.2s;
  cursor: default;

  @media (hover: hover) and (pointer: fine) {
    &:hover { background: var(--bg-raised); }
  }

  @media (max-width: 768px) {
    padding: 1.8rem;
    gap: 1.2rem;
  }
`;

const IconBox = styled.div`
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemBody = styled.div``;

const ItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-hi);
  margin-bottom: 0.45rem;
`;

const ItemDesc = styled.p`
  color: var(--text-mid);
  font-size: 0.88rem;
  line-height: 1.65;
`;

const services = [
  {
    Icon: Code,
    title: 'Presencia digital profesional',
    description: 'Páginas web y plataformas que se ven modernas, cargan rápido y convierten visitantes en clientes reales.',
    bg: 'rgba(79, 70, 229, 0.1)',
    color: 'var(--accent)',
  },
  {
    Icon: Database,
    title: 'Automatización de procesos',
    description: 'Elimina el trabajo manual repetitivo. Cotizaciones, pedidos, inventarios y reportes funcionando solos.',
    bg: 'rgba(5, 150, 105, 0.1)',
    color: '#059669',
  },
  {
    Icon: DeviceMobile,
    title: 'Tu app en el celular de tus clientes',
    description: 'Llega a donde están tus clientes: su teléfono. Apps para iOS y Android que refuerzan tu marca y fidelizan.',
    bg: 'rgba(217, 119, 6, 0.1)',
    color: '#d97706',
  },
  {
    Icon: PaintBrush,
    title: 'Diseño que genera confianza',
    description: 'Una imagen profesional vende antes de que el cliente lea una sola palabra. Diseñamos para convencer.',
    bg: 'rgba(219, 39, 119, 0.1)',
    color: '#db2777',
  },
  {
    Icon: CloudArrowUp,
    title: 'Tu plataforma siempre disponible',
    description: 'Tus clientes compran o consultan a cualquier hora. Nos aseguramos de que tu sistema esté en línea 24/7.',
    bg: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
  },
  {
    Icon: Robot,
    title: 'Inteligencia artificial aplicada',
    description: 'Chatbots de atención al cliente, análisis automático de datos y reportes que antes tomaban días. La IA como ventaja real.',
    bg: 'rgba(14, 165, 233, 0.1)',
    color: '#0ea5e9',
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <Wrap id="servicios">
      <Inner>
        <Header>
          <div>
            <Label>Lo que hacemos</Label>
            <Title>Soluciones digitales que hacen crecer tu negocio</Title>
          </div>
          <Desc>
            Nos encargamos de la tecnología para que tú te enfoques
            en lo que mejor sabes hacer: tu negocio.
          </Desc>
        </Header>

        <Grid>
          {services.map(({ Icon, title, description, bg, color }, i) => (
            <Item
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <IconBox $bg={bg} $color={color}>
                <Icon size={22} weight="duotone" />
              </IconBox>
              <ItemBody>
                <ItemTitle>{title}</ItemTitle>
                <ItemDesc>{description}</ItemDesc>
              </ItemBody>
            </Item>
          ))}
        </Grid>
      </Inner>
    </Wrap>
  );
}
