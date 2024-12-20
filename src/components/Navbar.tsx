import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="TypeZap Logo"
            width={136}
            height={30}
            priority
          />
        </Link>
      </div>
    </nav>
  );
} 