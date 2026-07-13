'use client';

import Image from 'next/image';
import { useState, type MouseEvent } from 'react';
import { NAV_ITEMS } from '../data/content';
import { CloseIcon, MenuIcon } from '../icons';
import type { TabId } from '../types';

const LOGO_SRC = '/Logo-completo_blanco_sin-fondo.png';

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onFaqClick: () => void;
}

export function Navbar({ activeTab, onTabChange, onFaqClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, tabId?: TabId, opensFaqChat?: boolean) => {
    if (opensFaqChat) {
      event.preventDefault();
      onFaqClick();
    } else if (tabId) {
      onTabChange(tabId);
    }
    closeMenu();
  };

  return (
    <nav
      className="dok7-nav"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 64px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        background: 'rgba(11,11,26,0.92)',
      }}
    >
      <a href="https://dok7.io" className="dok7-nav-logo" aria-label="DOK7">
        <Image
          src={LOGO_SRC}
          alt="DOK7"
          width={140}
          height={40}
          className="dok7-nav-logo-img"
          priority
        />
      </a>

      <div className="dok7-nav-links">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={item.tabId && activeTab === item.tabId ? 'dok7-nav-link dok7-nav-link--active' : 'dok7-nav-link'}
            style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}
            onClick={(event) => handleNavClick(event, item.tabId, item.opensFaqChat)}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button className="dok7-nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <a href="#contacto" className="dok7-nav-cta" style={{ background: '#6c3aed', border: '2px solid #6c3aed', color: 'white', padding: '12px 28px', borderRadius: 28, fontSize: 15, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
        Contacto
      </a>

      <div className={`dok7-nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={item.tabId && activeTab === item.tabId ? 'dok7-nav-link dok7-nav-link--active' : 'dok7-nav-link'}
            onClick={(event) => handleNavClick(event, item.tabId, item.opensFaqChat)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={closeMenu}
          style={{ background: '#6c3aed', border: 'none', color: 'white', padding: '14px 24px', borderRadius: 28, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 12, width: '100%', textAlign: 'center', textDecoration: 'none' }}
        >
          Contacto
        </a>
      </div>
    </nav>
  );
}
