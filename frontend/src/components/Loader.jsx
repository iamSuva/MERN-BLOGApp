import React from 'react'
import loadingGif from "../images/loader.gif";
function Loader() {
  return (
    <div className='loader'>
        <div className="loader_image">
            <img src={loadingGif} alt="loading giff" />
        </div>
    </div>
  )
}

export default Loader