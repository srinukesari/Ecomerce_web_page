import React, { Component } from 'react'
import img2 from "./pics/images2.jpg";
import img3 from "./pics/images3.jpg";
import img4 from "./pics/images4.jpg";
import img1 from "./pics/images1.jpg";
import './App.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Images extends Component {
  render() {
    return (
        <Carousel>
          <div>
              <img src={img1} />
          </div>
          <div>
              <img src={img2} />
          </div>
          <div>
              <img src={img3} />
          </div>
          <div>
              <img src={img4} />
          </div>
      </Carousel>
    )
  }
}

export default Images;