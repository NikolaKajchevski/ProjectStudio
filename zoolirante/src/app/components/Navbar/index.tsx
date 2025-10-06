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
            <Link href="/map" className="text-gray-600 hover:text-gray-900 font-medium">Map</Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900 font-medium">Events</Link>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900 font-medium">Shop</Link>
            <Link href="/tickets" className="text-gray-600 hover:text-gray-900 font-medium">Tickets</Link>
            <Link href="/membership" className="text-gray-600 hover:text-gray-900 font-medium">Membership</Link>
            <Link href="/aboutUs" className="text-gray-600 hover:text-gray-900 font-medium">About Us</Link>
          </nav>
          
          {/* Buttons to purchase tickets and for a login */}
          <div className="flex space-x-3">
            <Link href="/tickets">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Buy Tickets
              </button>
            </Link>
            
            <Link href="membership">
              <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-full font-medium transition-colors">
                Become a Member
              </button>
            </Link>
            

          </div>
        </div>
      </div>
    </header>
  );
}
