export default function AnimalsPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500 mb-6">
          Zoolirante Animals Page
        </h1>

        {/* Embed Canva interactive map */}
        <div className="w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
          <iframe
            loading="lazy"
            src="https://www.canva.com/design/DAGyRU8ZMAg/oSfNM4lcG89WaGBCSHXGbA/view?embed"
            title="Zoo Map"
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
