import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-3">
              <Image
                src="/zoolirante-logo.png"
                alt="Zoolirante Logo"
                width={60}
                height={20}
                priority
              />
            </div>
            <span className="text-xl font-bold text-orange-500">Zoolirante</span>
          </Link>

          {/* Nav bar that can be clicked on to go to other pages */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/animals" className="text-gray-600 hover:text-gray-900 font-medium">Animals</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Experiences</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Tickets</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">Membership</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">About Us</Link>
          </nav>
          
          {/* Buttons to purchase tickets and for a login */}
          <div className="flex space-x-3">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Buy Tickets
            </button>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-full font-medium transition-colors">
              Become a Member
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
