import styled, { keyframes } from 'styled-components';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiPostgresql, SiMongodb, SiDocker, SiFigma,
  SiGraphql, SiRedis, SiOpenai, SiFastapi,
  SiTailwindcss, SiPrisma, SiVercel, SiGithubactions, SiStripe,
} from 'react-icons/si';
import { CloudArrowUp } from '@phosphor-icons/react';

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Wrap = styled.div`
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  background: var(--bg-raised);
  mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0 1.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-mid);
  letter-spacing: 0.3px;
  white-space: nowrap;
  transition: color 0.2s ease;
  cursor: default;

  &:hover {
    color: var(--text);
  }

  &:hover svg {
    opacity: 1;
    transform: scale(1.15);
  }

  svg {
    width: 1.15rem;
    height: 1.15rem;
    flex-shrink: 0;
    opacity: 0.8;
    transition: opacity 0.2s ease, transform 0.2s ease;
    color: ${({ $color }) => $color};
  }

  &::after {
    content: '';
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--border);
    opacity: 0.6;
    flex-shrink: 0;
    margin-left: 1rem;
  }
`;

const SKILLS = [
  { name: 'React',           icon: SiReact,              color: '#61DAFB' },
  { name: 'Next.js',         icon: SiNextdotjs,          color: '#e2e8f0' },
  { name: 'TypeScript',      icon: SiTypescript,         color: '#3178C6' },
  { name: 'Node.js',         icon: SiNodedotjs,          color: '#6CC24A' },
  { name: 'Python',          icon: SiPython,             color: '#FFD343' },
  { name: 'PostgreSQL',      icon: SiPostgresql,         color: '#4169E1' },
  { name: 'MongoDB',         icon: SiMongodb,            color: '#47A248' },
  { name: 'Docker',          icon: SiDocker,             color: '#2496ED' },
  { name: 'AWS',             icon: CloudArrowUp,         color: '#FF9900' },
  { name: 'Figma',           icon: SiFigma,              color: '#F24E1E' },
  { name: 'React Native',    icon: SiReact,              color: '#61DAFB' },
  { name: 'GraphQL',         icon: SiGraphql,            color: '#E10098' },
  { name: 'Redis',           icon: SiRedis,              color: '#DC382D' },
  { name: 'OpenAI',          icon: SiOpenai,             color: '#e2e8f0' },
  { name: 'FastAPI',         icon: SiFastapi,            color: '#009688' },
  { name: 'Tailwind',        icon: SiTailwindcss,        color: '#06B6D4' },
  { name: 'Prisma',          icon: SiPrisma,             color: '#a5b4fc' },
  { name: 'Vercel',          icon: SiVercel,             color: '#e2e8f0' },
  { name: 'GitHub Actions',  icon: SiGithubactions,      color: '#2088FF' },
  { name: 'Stripe',          icon: SiStripe,             color: '#635BFF' },
];

export default function Marquee() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <Wrap aria-hidden="true">
      <Track>
        {items.map(({ name, icon: Icon, color }, i) => (
          <Item key={i} $color={color}>
            <Icon />
            {name}
          </Item>
        ))}
      </Track>
    </Wrap>
  );
}
