'use client';

import { useState } from 'react';
import { NAV_ITEMS } from '../data/content';
import { CloseIcon, MenuIcon } from '../icons';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
      <a href="#" className="dok7-nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <div style={{ width: 40, height: 40, background: '#6c3aed', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 14 }}>
          D7
        </div>
        <span style={{ fontWeight: 700, fontSize: 20, color: 'white', letterSpacing: 0.5 }}>DOK7</span>
      </a>

      <div className="dok7-nav-links">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>
            {item.label}
          </a>
        ))}
      </div>

      <button className="dok7-nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <a href="#contacto" className="dok7-nav-cta" style={{ background: '#6c3aed', border: '2px solid #6c3aed', color: 'white', padding: '12px 28px', borderRadius: 28, fontSize: 15, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
        Solicitar propuesta
      </a>

      <div className={`dok7-nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={closeMenu}
          style={{ background: '#6c3aed', border: 'none', color: 'white', padding: '14px 24px', borderRadius: 28, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 12, width: '100%', textAlign: 'center', textDecoration: 'none' }}
        >
          Solicitar propuesta
        </a>
      </div>
    </nav>
  );
}
