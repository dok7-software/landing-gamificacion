interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionTitle({ children, className = '', light = false }: SectionTitleProps) {
  return (
    <h2
      className={className}
      style={{
        textAlign: 'center',
        fontWeight: 800,
        color: light ? 'white' : '#0f172a',
        margin: '0 0 8px',
      }}
    >
      {children}
    </h2>
  );
}

export function SectionDivider() {
  return <div style={{ width: 48, height: 4, background: '#6c3aed', margin: '0 auto 60px', borderRadius: 2 }} />;
}

export function SectionDividerCompact() {
  return <div style={{ width: 48, height: 4, background: '#6c3aed', margin: '0 auto 16px', borderRadius: 2 }} />;
}
