import { CheckCircleIcon } from '../icons';

interface CheckListProps {
  items: string[];
}

export function CheckList({ items }: CheckListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CheckCircleIcon />
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}
