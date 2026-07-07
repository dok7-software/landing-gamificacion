interface PillProps {
  label: string;
  subtitle: string;
}

export function Pill({ label, subtitle }: PillProps) {
  return (
    <div style={{ background: 'rgba(108,58,237,0.15)', border: '1px solid rgba(108,58,237,0.3)', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div>
        <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{label}</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{subtitle}</div>
      </div>
    </div>
  );
}
