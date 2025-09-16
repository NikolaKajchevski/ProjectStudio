import Image from 'next/image';
import Link from 'next/link';

export default async function EventsPage() {
  const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
  });
  const zooData = await data.json();


  return (
    <div className="min-h-screen">
        <section className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white" 
               style={{backgroundImage: "url('https://images4.alphacoders.com/783/783592.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl mb-6">
            View and Sign-Up for current and upcoming events at Zoolirante!
          </p>
        </div>
      </section>
      <section className="py-14 bg-orange-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Zoolirante's Events!</h2>
          <p className="text-gray-600 text-lg">
            Come join us at Zoolirante for exciting experiences within the zoo! There's a plethora of available events each tailored towards giving you a thrilling adventure.
          </p>
        </div>
      </section>
      <div className="mx-auto">
      <div className="bg-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl text-black-500 text-center font-bold">Current Events</h1>
        </div>
        <div className="mx-auto lg:px-4 py-3">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
            {zooData.events.map((events: any) => (
              <div key={events.id} className="h-100 w-300 bg-orange-50 rounded-lg shadow-md overflow-hidden border border-gray-300 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-auto">
                <div className="py-10 mx-auto"> 
                  <img className="relative h-80 w-120" style={{ objectFit: 'cover'}} src={events.image_url}></img>
                </div>
                <div className="p-4 py-15 mx-auto">
                  <div className="flex justify-between items-center"> 
                      <h2 className="text-3xl font-bold mb-2">
                        {events.title}
                      </h2>
                      <h2 className="border border-orange-500 font-bold text-orange-500 px-3 py-1 rounded-full text-sm">
                        {events.category}
                      </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-bold mb-2">
                      {events.date} | {events.start_time} - {events.end_time}
                    </p>
                    <p className="border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors">
                      {events.age_restriction}
                    </p>
                  </div>
                  <p className="text-gray-600 font-bold mb-2">
                    {events.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {events.description}
                  </p>
                  <h2 className="font-bold text-gray-600 font-bold">
                    Featured Animals
                  </h2>
                  <div className="py-3 grid grid-cols-4 mb-3">
                    {events.animals_featured.map((Element: any) => {
                        for (var i = 0; i < zooData.animals.length; i++) {
                          if (zooData.animals[i].id == Element) {
                            return (
                                    <Link 
                                      href={`/animals/${zooData.animals[i].id}`}
                                      className="text-center border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors"
                                    >
                                      {zooData.animals[i].name}
                                    </Link>
                              // have this link to the animals page when ready
                                // <button key={zooData.animals[i].id} className="border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors">
                                //   {zooData.animals[i].name}
                                // </button>
                            )
                          }
                        }
                    })}
                  </div>
                  <Link href="/tickets/book">
                    <button className="bg-orange-500 font-bold text-white px-5 py-3 rounded-full text-sm hover:bg-orange-600 transition-colors">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>  
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}