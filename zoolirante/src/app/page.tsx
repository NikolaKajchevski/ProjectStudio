import Image from "next/image";
import Link from "next/link";


export default async function Home() {
  const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
  });
  const zooData = await data.json();
  
  // Filter specific animals: lion, gorilla, and antelope
  const featuredAnimals = zooData.animals.filter((animal: any) => 
    ['002', '005', '003'].includes(animal.id)
  );

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
            <Link href="/tickets">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
                Plan Your Visit
              </button>
            </Link>
            
            <Link href="/animals">
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full font-medium transition-colors">
                Explore Animals
              </button>
            </Link>
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
            {featuredAnimals.map((animal: any) => (
              <div key={animal.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={animal.image_url}
                    alt={animal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{animal.name}</h3>
                  <p className="text-gray-600 mb-4">{animal.description}</p>
                  <Link href={`/animals/${animal.id}`} className="text-orange-500 hover:text-orange-600 font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
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
            {zooData.events.slice(0, 3).map((event: any) => {
              return (
                <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-orange-500 text-xl font-semibold mb-2">
                    {event.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    <div>📅 {event.date} | {event.start_time} - {event.end_time}</div>
                    <div>📍 {event.location}</div>
                  </div>
                  <Link href={`/events`}>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors">
                      More Info
                    </button>
                  </Link>
                </div>
              )
            })}
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
                   style={{backgroundImage: "url('https://auroragift.com/cdn/shop/files/50264.jpg?v=1753990279')"}}>
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
            <Link href="/shop">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
                Visit Our Shop
              </button>
            </Link>
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
      
    </div>
  );
}