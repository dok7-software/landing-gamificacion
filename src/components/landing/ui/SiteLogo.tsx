import Image from 'next/image';
import { rastrearClicSalida } from '@/lib/analytics/gtm';

const LOGO_SRC = '/Logo-completo_blanco_sin-fondo.png';

export function SiteLogo() {
  return (
    <a
      href="https://dok7.io"
      className="dok7-site-logo"
      aria-label="DOK7"
      onClick={() => rastrearClicSalida('https://dok7.io', 'logo_hero')}
    >
      <Image
        src={LOGO_SRC}
        alt="DOK7"
        width={140}
        height={40}
        className="dok7-site-logo-img"
        priority
      />
    </a>
  );
}
