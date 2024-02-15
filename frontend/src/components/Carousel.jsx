import React, { useState } from 'react'
import Bg from "../images/bg.jpg";
import Bg1 from "../images/bg2.png";
function Carousel() {
    const [currImageInd,setcurrImageInd]=useState(0);
    
    const images=[Bg,Bg1];
    const NextSlide=()=>{
        const newInd=(currImageInd+1)%images.length;
        setcurrImageInd(newInd);
    };
    const PrevSlide=()=>{
       const newInd=(currImageInd-1+images.length)%images.length;
       setcurrImageInd(newInd);
    };

  return (
    <div className="carousel_container">
        <button className='prev' onClick={NextSlide}>Prev</button>
        <img className="img_slider"src={images[currImageInd]} alt="images"  height={400} />
        <button className='next' onClick={PrevSlide}>Next</button>
    </div>
  )
}

export default Carousel;