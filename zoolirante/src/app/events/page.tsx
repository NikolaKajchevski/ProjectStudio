export default async function EventsPage() {
  const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
  });
  const zooData = await data.json();
  
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-3 py-3">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl text-black-500 text-center font-bold">Upcoming Events</h1>
        </div>
        <div className="mx-auto lg:px-4 py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-7">
            {zooData.events.map((events: any) => (
              <div key={events.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-500">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{events.title}</h2>
                  <p className="text-gray-600 mb-2">{events.date}</p>
                  <p className="text-sm text-gray-500 mb-4">{events.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">
                      {events.start_time} - {events.end_time}
                    </span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}