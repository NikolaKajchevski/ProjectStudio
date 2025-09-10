import Image from "next/image";
import Button from "./components/Button";
import { ImageSlider } from "./components/ImageSlider";



const IMAGES = ['/zoolirante-logo.png', '/window.svg', '/file.svg']

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
    
      {/* Continue from here to add anything else */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500">Zoolirante Homepage</h1>
        <div className = "slider">
          <div className="slides">



            <main>
              <div style = {{maxHeight: '600px', width: '600px', height: '600px', margin: '0 auto'}}>
              <ImageSlider imageUrls={IMAGES}/>
              </div>
            </main>
            </div>
        </div>

      </div>
    </div>
  );
}
