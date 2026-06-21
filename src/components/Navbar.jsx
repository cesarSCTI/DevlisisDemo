'use client';
import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import styled, { css } from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: var(--z-navbar);
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
  border-bottom: 1px solid transparent;
  max-height: 72px;

  ${({ $scrolled }) => $scrolled && css`
    background: rgba(250, 250, 248, 0.94);
    backdrop-filter: blur(16px);
    border-bottom-color: var(--border);
    box-shadow: var(--shadow-sm);
  `}
`;

const Logo = styled.a`
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text-hi);

  span { color: var(--accent); }
`;

const Links = styled.ul`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    background: rgba(250, 250, 248, 0.98);
    gap: 2.5rem;
    font-size: 1.5rem;
    z-index: var(--z-mobile-menu);
  }
`;

const NavLink = styled.a`
  color: ${({ $active }) => ($active ? 'var(--text-hi)' : 'var(--text-mid)')};
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;

  ${({ $active }) => $active && css`
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0; right: 0;
      height: 1.5px;
      background: var(--accent);
      border-radius: 2px;
    }
  `}

  @media (hover: hover) and (pointer: fine) {
    &:hover { color: var(--text-hi); }
  }
`;

const CtaBtn = styled.a`
  padding: 0.45rem 1.2rem;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 700;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-accent);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--accent-dark);
      box-shadow: var(--shadow-accent-lg);
    }
  }
`;

const Burger = styled.button`
  display: none;
  background: none;
  color: var(--text-hi);
  z-index: var(--z-burger);

  @media (max-width: 768px) { display: flex; }
`;

const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

const NAV_SECTIONS = ['servicios', 'sobre-mi', 'portafolio', 'contacto'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 48));

  useEffect(() => {
    const observers = NAV_SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <Nav $scrolled={scrolled}>
      <Logo href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        dev<span>lisis</span>
      </Logo>

      <Burger onClick={() => setOpen(o => !o)} aria-label="Menú">
        {open ? <X size={24} /> : <List size={24} />}
      </Burger>

      <Links $open={open}>
        <li><NavLink href="#servicios" $active={active === 'servicios'} onClick={e => go(e, '#servicios')}>Servicios</NavLink></li>
        <li><NavLink href="#sobre-mi" $active={active === 'sobre-mi'} onClick={e => go(e, '#sobre-mi')}>Sobre mi</NavLink></li>
        <li><NavLink href="#portafolio" $active={active === 'portafolio'} onClick={e => go(e, '#portafolio')}>Portafolio</NavLink></li>
        <li><CtaBtn href="#contacto" onClick={e => go(e, '#contacto')}>Empezar proyecto</CtaBtn></li>
      </Links>
    </Nav>
  );
}
