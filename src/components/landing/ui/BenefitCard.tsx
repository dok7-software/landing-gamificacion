interface BenefitCardProps {
  title: string;
  description: string;
  className?: string;
}

export function BenefitCard({ title, description, className = '' }: BenefitCardProps) {
  return (
    <div
      className={`dok7-benefit-card ${className}`.trim()}
      style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <div className="dok7-benefit-card-title">{title}</div>
      <p className="dok7-benefit-card-desc">{description}</p>
    </div>
  );
}
