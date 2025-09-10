import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top Section */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white" 
               style={{backgroundImage: "url('https://images4.alphacoders.com/783/783592.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Zoolirante</h1>
          <p className="text-xl mb-6">Discover the wonders of wildlife!</p>
          <div className="space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Plan Your Visit
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full font-medium transition-colors">
              Explore Animals
            </button>
          </div>
        </div>
      </section>

      {/* Featured Animals Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Amazing Animals</h2>
            <p className="text-gray-600 text-lg">Get up close with our incredible wildlife from around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Lion */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://tse1.mm.bing.net/th/id/OIP.FsPPulKwUf3gIsS9UrZi4QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3')"}}>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">African Lions</h3>
                <p className="text-gray-600 mb-4">Experience the majesty of the king of the jungle in our spacious African savanna habitat.</p>
                <Link href="/animals/lions" className="text-orange-500 hover:text-orange-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Elephant */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://static.wixstatic.com/media/2fdcf0_799ec75bf4a0438f8f4ef8601a6ebf11~mv2.jpeg/v1/fill/w_980,h_652,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fdcf0_799ec75bf4a0438f8f4ef8601a6ebf11~mv2.jpeg')"}}>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Asian Elephants</h3>
                <p className="text-gray-600 mb-4">Watch these gentle giants in their naturalistic environment with daily keeper talks.</p>
                <Link href="/animals/elephants" className="text-orange-500 hover:text-orange-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Penguins */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://wildnet.org/wp-content/uploads/2018/03/Susan-McConnell-Penguin-3.jpg')"}}>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Little Penguins</h3>
                <p className="text-gray-600 mb-4">Dive into the underwater world of Australia's native little penguins.</p>
                <Link href="/animals/penguins" className="text-orange-500 hover:text-orange-600 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Events & Experiences</h2>
            <p className="text-gray-600 text-lg">Join us for exciting events and educational programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Keeper Talk */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-orange-500 text-sm font-semibold mb-2">DAILY EVENT</div>
              <h3 className="text-xl font-bold mb-2">Lion Keeper Talk</h3>
              <p className="text-gray-600 mb-4">Join our expert keepers for an intimate look into the lives of our magnificent lions.</p>
              <div className="text-sm text-gray-500 mb-4">
                <div>📅 Daily at 11:00 AM & 3:00 PM</div>
                <div>📍 African Savanna Zone</div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors">
                More Info
              </button>
            </div>

            {/* Special Tour */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-orange-500 text-sm font-semibold mb-2">SPECIAL EVENT</div>
              <h3 className="text-xl font-bold mb-2">Twilight Zoo Tour</h3>
              <p className="text-gray-600 mb-4">Experience the zoo after dark and see how our nocturnal animals come to life.</p>
              <div className="text-sm text-gray-500 mb-4">
                <div>📅 25th September, Saturday 6:00 PM</div>
                <div>📍 Main Entrance</div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors">
                Book Now
              </button>
            </div>

            {/* Educational Program */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-orange-500 text-sm font-semibold mb-2">EDUCATION</div>
              <h3 className="text-xl font-bold mb-2">Junior Zookeeper Program</h3>
              <p className="text-gray-600 mb-4">Kids can learn about animal care and conservation through hands-on activities.</p>
              <div className="text-sm text-gray-500 mb-4">
                <div>📅 Weekends 10:00 AM - 12:00 PM</div>
                <div>📍 Education Center</div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="py-16 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Zoo Shop</h2>
            <p className="text-gray-600 text-lg">Take home a piece of Zoolirante with our exclusive merchandise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Plush Toys */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://tse1.mm.bing.net/th/id/OIP.gPW3DT06aHuCVM1DavJEJgHaIG?rs=1&pid=ImgDetMain&o=7&rm=3')"}}>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Plush Animals</h3>
                <p className="text-gray-600 text-sm mb-2">Cuddly replicas of your favorite zoo animals</p>
                <p className="font-bold text-orange-500">$15.99</p>
              </div>
            </div>

            {/* T-Shirts */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://i5.walmartimages.com/seo/Let-s-Get-Wild-Zoo-Animals-Safari-Party-A-Day-At-The-Zoo-T-Shirt_64f0d783-76ca-4671-a671-986fd876cf03.e3e0089944b5309d248c66d58e81aa6f.jpeg')"}}>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Zoo T-Shirts</h3>
                <p className="text-gray-600 text-sm mb-2">Comfortable shirts featuring zoo animals</p>
                <p className="font-bold text-orange-500">$24.99</p>
              </div>
            </div>

            {/* Books */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.cbonrEZhaMhqL9H1BgoX5gHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3')"}}>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Educational Books</h3>
                <p className="text-gray-600 text-sm mb-2">Learn about wildlife and conservation</p>
                <p className="font-bold text-orange-500">$12.99</p>
              </div>
            </div>

            {/* Water Bottles */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-cover bg-center bg-no-repeat" 
                   style={{backgroundImage: "url('https://tse1.mm.bing.net/th/id/OIP.U2MnEkfUp1GmV491H5RcKgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3')"}}>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Reusable Bottles</h3>
                <p className="text-gray-600 text-sm mb-2">Eco-friendly bottles with zoo designs</p>
                <p className="font-bold text-orange-500">$18.99</p>
              </div>
            </div>

          </div>

          <div className="text-center mt-8">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Visit Our Shop
            </button>
          </div>

        </div>
      </section>

      {/* Visit Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Plan Your Visit</h2>
            <p className="text-gray-600 text-lg">Everything you need to know for the perfect zoo experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">🕐</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Daily: 9:00 AM - 5:00 PM<br/>Last entry: 4:00 PM</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-600">123 Wildlife Avenue<br/>Mawson Lakes, SA 5095</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">🎫</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Admission</h3>
              <p className="text-gray-600">Adults: $19.99<br/>Children (12 and under): $9.99<br/>Under 3: Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4">About Zoolirante</h3>
              <p className="text-gray-300 text-sm mb-4">
                We're committed to wildlife conservation and education. Visit us to learn about animals from around the world.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📞 (08) 1234 5678</p>
                <p>✉️ info@zoolirante.com</p>
                <p>📍 123 Wildlife Avenue<br/>Mawson Lakes, SA 5095</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Zoolirante. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}