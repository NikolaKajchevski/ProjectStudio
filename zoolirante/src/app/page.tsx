import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
    
      {/* Continue from here to add anything else */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500">Zoolirante Homepage</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
        <Image
          src="/zoolirante-logo.png"
          alt="Zoolirante Logo"
          width={60}
          height={20}
          priority
        />
       </div>
      </div>
    </div>
  );
}