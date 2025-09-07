import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Nav bar section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Logo TODO: Can make it a clickable link that takes you back to home page*/}
            <div className="flex items-center space-x-2">
              {/* Logo (Image can be found in public folder) */}
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
            </div>

            {/* Nav bar that can be clicked on to go to other pages */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Animals</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Experiences</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Tickets</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Membership</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">About Us</a>
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

      {/* Continue from here to add anything else */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500">Zoolirante Homepage</h1>
      </div>
    </div>
  );
}