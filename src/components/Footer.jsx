import { GithubLogo, LinkedinLogo, TwitterLogo, InstagramLogo } from '@phosphor-icons/react';
import styled from 'styled-components';

const FooterEl = styled.footer`
  border-top: 1px solid var(--border);
  padding: 2.5rem 2rem 1.8rem;
  background: var(--bg-surface);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Logo = styled.a`
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--text-hi);

  span { color: var(--accent); }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const NavLink = styled.a`
  color: var(--text-mid);
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover { color: var(--text-hi); }
  }
`;

const Social = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SocialBtn = styled.a`
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-mid);
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.15s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      background: var(--accent-light);
      transform: translateY(-2px);
    }
  }
`;

const Copy = styled.p`
  color: var(--text-lo);
  font-size: 0.82rem;
  text-align: right;

  @media (max-width: 640px) { text-align: left; }
`;

const Legal = styled.div`
  border-top: 1px solid var(--border);
  margin-top: 1.5rem;
  padding-top: 1.2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: var(--text-lo);
    font-size: 0.78rem;
    transition: color 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &:hover { color: var(--text-mid); }
    }
  }

  @media (max-width: 640px) { flex-wrap: wrap; gap: 1rem; }
`;

const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

const links = [
  ['#servicios', 'Servicios'],
  ['#sobre-mi', 'Sobre mí'],
  ['#portafolio', 'Portafolio'],
  ['#contacto', 'Contacto'],
];

export default function Footer() {
  return (
    <FooterEl>
      <Inner>
        <Logo href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          dev<span>lisis</span>
        </Logo>

        <Nav>
          {links.map(([href, label]) => (
            <NavLink key={href} href={href} onClick={e => { e.preventDefault(); scrollTo(href); }}>
              {label}
            </NavLink>
          ))}
        </Nav>

        <Social>
          <SocialBtn href="#" aria-label="GitHub"><GithubLogo size={16} /></SocialBtn>
          <SocialBtn href="#" aria-label="LinkedIn"><LinkedinLogo size={16} /></SocialBtn>
          <SocialBtn href="#" aria-label="Twitter"><TwitterLogo size={16} /></SocialBtn>
          <SocialBtn href="#" aria-label="Instagram"><InstagramLogo size={16} /></SocialBtn>
        </Social>

        <Copy>© 2026 devlisis.</Copy>
      </Inner>

      <Legal>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos de servicio</a>
      </Legal>
    </FooterEl>
  );
}
