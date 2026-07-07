interface BenefitCardProps {
  title: string;
  description: string;
}

export function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</div>
      <p style={{ margin: 0, fontSize: 14, color: 'rgba(15,23,42,0.6)', lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}
