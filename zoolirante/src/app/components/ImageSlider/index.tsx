"use client"
import { useState } from "react"

import "./image-slider.css"


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
 //overflow: "hidden"
    return  <div style = {{width:'50%', height: "50%", position: "relative", overflow: "hidden"}}>

        
      

        <div style={{width:'100%', height: "100%", display: "flex"} } >
            <div>
                <img src={imageUrls[imageIndex]}className="img-slider-img"/>
                <button onClick={prevImage} style={{left:0}} className="next bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors img-slider-btn">{'\u2190'}</button>
                <button onClick={nextImage} style={{right:0}} className="next bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors img-slider-btn">{'\u2192'}</button>
            </div>
            {imageUrls.map(url => (
            <img key={url} src= {url} className="img-slider-img" style={{translate: `${-100 * imageIndex}%`  }} />
            ))}
        </div>
    
    </div>

}