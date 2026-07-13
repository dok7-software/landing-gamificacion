import Image from 'next/image';

const LOGO_SRC = '/Logo-completo_blanco_sin-fondo.png';

export function FixedLogo() {
  return (
    <a href="https://dok7.io" className="dok7-fixed-logo" aria-label="DOK7">
      <Image
        src={LOGO_SRC}
        alt="DOK7"
        width={140}
        height={40}
        className="dok7-fixed-logo-img"
        priority
      />
    </a>
  );
}
