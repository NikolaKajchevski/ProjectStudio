"use client"
import { useState } from "react"

import Image from "next/image";



type ImageSliderProps = {
    imageUrls: string[]
}
//        <img src={imageUrls[imageIndex]}/>

export function ImageSlider({imageUrls}:ImageSliderProps){
    const [imageIndex, setImageIndex] = useState(0)

    function nextImage(){
            setImageIndex(index=>{
            if (index == imageUrls.length - 1) 
                return 0 // loop back
            return index+1
        })
    }

    function prevImage(){
            setImageIndex(index=>{
            if (index == 0) 
                return imageUrls.length - 1 // loop back
            return index-1
        })
    }

    return <div>
        <div style = {{width:'50%', height: "50%", position: "relative"}}>
                      <Image
                        src={imageUrls[imageIndex]}
                        alt="image 2"
                        className="slide"
                        width={200}
                        height={200}
                        priority
                      />
        <button onClick={prevImage} className="next bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">{'\u2190'}</button>
        <button onClick={nextImage} className="next bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">{'\u2192'}</button>
        </div>
    </div>
}