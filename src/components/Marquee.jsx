import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Wrap = styled.div`
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 0;
  background: var(--bg-raised);
  mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 32s linear infinite;
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0 1.6rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-mid);
  letter-spacing: 0.5px;
  white-space: nowrap;

  &::after {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.35;
    flex-shrink: 0;
  }
`;

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Figma',
  'React Native', 'GraphQL', 'Redis', 'OpenAI', 'FastAPI',
  'Tailwind', 'Prisma', 'Vercel', 'GitHub Actions', 'Stripe',
];

export default function Marquee() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <Wrap aria-hidden="true">
      <Track>
        {items.map((s, i) => <Item key={i}>{s}</Item>)}
      </Track>
    </Wrap>
  );
}
