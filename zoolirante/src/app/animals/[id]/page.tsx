import Image from "next/image";
import data from "../../data/zooliranteData.json";

export default function AnimalDetailsPage({ params }: { params: { id: string } }) {
  // Find the selected animal
  const animal = data.animals.find(a => a.id === params.id);

  if (!animal) {
    return <p className="text-center text-red-500 mt-10">Animal not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Main Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg bg-black">
        <Image
          src={animal.image_url}
          alt={animal.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Basic Info */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold text-black">{animal.name}</h1>
        <p className="text-lg text-gray-600 italic">{animal.species}</p>
        <p className="text-md text-gray-500">{animal.scientific_name}</p>

        <div className="mt-4 flex gap-6 text-sm text-gray-700">
          <span><strong>Age:</strong> {animal.age}</span>
          <span><strong>Gender:</strong> {animal.gender}</span>
          <span><strong>Habitat:</strong> {animal.habitat}</span>
          <span><strong>Zone:</strong> {animal.location.zone}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <p className="text-gray-700 text-lg">{animal.description}</p>
      </div>

      {/* Conservation Status */}
      <div className="mt-4">
        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
          {animal.conservation_status}
        </span>
      </div>

      {/* Fun Facts */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Fun Facts</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {animal.fun_facts.map((fact, idx) => (
            <li key={idx}>{fact}</li>
          ))}
        </ul>
      </div>

      {/* Feeding Times */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Feeding Times</h2>
        <div className="flex gap-3 flex-wrap">
          {animal.feeding_times.map((time, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {animal.gallery.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-64 rounded-lg overflow-hidden shadow bg-black"
            >
              <Image
                src={img}
                alt={`${animal.name} gallery ${idx + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
