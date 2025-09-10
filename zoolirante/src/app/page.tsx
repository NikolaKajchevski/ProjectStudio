import Image from "next/image";
import Button from "./components/Button";



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
    
      {/* Continue from here to add anything else */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500">Zoolirante Homepage</h1>
        <div className = "slider">
          <div className="slides">

              <Image
                src="/zoolirante-logo.png"
                alt="image 1"
                className="slide"
                width={60}
                height={20}
                priority
              />
              <Image
                src="/window.svg"
                alt="image 2"
                className="slide"
                width={60}
                height={20}
                priority
              />
              <Image
                src="/file.svg"
                alt="image 3"
                className="slide"
                width={60}
                height={20}
                priority
              />
            <main>
              <Button handleClick={() => console.log("test") }>
                click me
              </Button>
            </main>
            <button className="next bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">{'\u2192'}</button>
            </div>
        </div>

      </div>
    </div>
  );
}
