'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import styled, { css } from 'styled-components';
import devlisisIcon from '../assets/devlisis-manrope-icono-solo.svg';

/* ─── Desktop nav ─────────────────────────────────────── */

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
  display: flex;
  align-items: center;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text-hi);

  span { color: var(--accent); }

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }
`;

const DesktopLinks = styled.ul`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) { display: none; }
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
  padding: 0.25rem;

  @media (max-width: 768px) { display: flex; }
`;

/* ─── Mobile drawer ────────────────────────────────────── */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3px);
  z-index: calc(var(--z-mobile-menu) - 1);
`;

const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(300px, 82vw);
  background: var(--bg-surface);
  z-index: var(--z-mobile-menu);
  display: flex;
  flex-direction: column;
  padding: 1.4rem 1.6rem 2rem;
  box-shadow: -12px 0 48px rgba(0, 0, 0, 0.1);
`;

const DrawerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const DrawerLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: var(--text-hi);

  span { color: var(--accent); }

  img { width: 24px; height: 24px; }
`;

const CloseBtn = styled.button`
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-mid);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s, background 0.15s;

  @media (hover: hover) and (pointer: fine) {
    &:hover { color: var(--text-hi); background: var(--border); }
  }
`;

const DrawerNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
`;

const DrawerLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${p => p.$active ? 'var(--accent)' : 'var(--text-hi)'};
  background: ${p => p.$active ? 'var(--accent-light)' : 'transparent'};
  border-radius: var(--radius-sm);
  transition: background 0.15s, color 0.15s;
  border: 1px solid ${p => p.$active ? 'rgba(37,99,235,0.15)' : 'transparent'};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--bg-raised);
      color: var(--text-hi);
    }
  }
`;

const DrawerDivider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0;
`;

const DrawerCta = styled.a`
  display: block;
  text-align: center;
  padding: 0.9rem;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.92rem;
  box-shadow: var(--shadow-accent);
  transition: background 0.2s, box-shadow 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--accent-dark);
      box-shadow: var(--shadow-accent-lg);
    }
  }
`;

/* ─── Data ─────────────────────────────────────────────── */

const NAV_LINKS = [
  { id: 'servicios',  label: 'Servicios'  },
  { id: 'sobre-mi',   label: 'Sobre mí'   },
  { id: 'proceso',    label: 'Proceso'    },
  { id: 'portafolio', label: 'Portafolio' },
];

const NAV_SECTIONS = NAV_LINKS.map(l => l.id);

const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

/* ─── Component ─────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 48));

  // Active section tracker
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

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  const logoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="#" onClick={logoClick}>
          <img src={devlisisIcon} alt="" aria-hidden="true" />
          Dev<span>lisis</span>
        </Logo>

        <DesktopLinks>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <NavLink href={`#${id}`} $active={active === id} onClick={e => go(e, `#${id}`)}>
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <CtaBtn href="#contacto" onClick={e => go(e, '#contacto')}>
              Empezar proyecto
            </CtaBtn>
          </li>
        </DesktopLinks>

        <Burger onClick={() => setOpen(o => !o)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          <List size={22} />
        </Burger>
      </Nav>

      <AnimatePresence>
        {open && (
          <>
            <Overlay
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
            />

            <Drawer
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <DrawerHead>
                <DrawerLogo href="#" onClick={logoClick}>
                  <img src={devlisisIcon} alt="" aria-hidden="true" />
                  Dev<span>lisis</span>
                </DrawerLogo>
                <CloseBtn onClick={() => setOpen(false)} aria-label="Cerrar menú">
                  <X size={16} />
                </CloseBtn>
              </DrawerHead>

              <DrawerNav>
                {NAV_LINKS.map(({ id, label }) => (
                  <li key={id}>
                    <DrawerLink
                      href={`#${id}`}
                      $active={active === id}
                      onClick={e => go(e, `#${id}`)}
                    >
                      {label}
                    </DrawerLink>
                  </li>
                ))}
                <DrawerDivider />
              </DrawerNav>

              <DrawerCta href="#contacto" onClick={e => go(e, '#contacto')}>
                Empezar proyecto
              </DrawerCta>
            </Drawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
