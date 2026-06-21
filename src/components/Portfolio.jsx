'use client';
import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight, Storefront, ChartBar,
  Truck, Robot, Stethoscope, ArrowsClockwise, Warehouse
} from '@phosphor-icons/react';
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

  /* Subtle grid overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* Bottom fade */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.2) 100%);
  }
`;

const ThumbIcon = styled.div`
  color: rgba(255, 255, 255, 0.85);
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25));
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
    Icon: Storefront,
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
    Icon: ChartBar,
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
    Icon: Truck,
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
    Icon: Robot,
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
    Icon: Stethoscope,
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
    Icon: ArrowsClockwise,
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
    Icon: Warehouse,
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
                <ThumbIcon>
                  <p.Icon size={52} weight="duotone" />
                </ThumbIcon>
              </Thumb>
              <CardBody>
                <CardCat>{p.category}</CardCat>
                <CardTitle>{p.title}</CardTitle>
                <CardDesc>{p.description}</CardDesc>
                <Tags>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
                <ComingSoon>
                  <ArrowUpRight size={14} weight="bold" />
                  Próximamente
                </ComingSoon>
              </CardBody>
            </Card>
          ))}
        </AnimatePresence>
      </Grid>
    </Wrap>
  );
}
