import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export function SectionHeader({ icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="dok7-section-header">
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(108,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontSize: 20, fontWeight: 700, color: '#7c5cfc' }}>{title}</span>
      <span className="header-subtitle">{subtitle}</span>
      <div className="header-line" />
    </div>
  );
}
