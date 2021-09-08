import React, { Component } from 'react'
import img1 from "./pics/images1.jpg";
import img2 from "./pics/images2.jpg";
import img3 from "./pics/images3.jpg";
import img4 from "./pics/images4.jpg";
import shirt1 from "./pics/shirt1s.jpg"
import shirt2 from "./pics/shirt2s.jpg"
import shirt3 from "./pics/shirt3s.jpg"
import shirt4 from "./pics/shirt4s.jpg"
import levis1 from "./pics/levis1.jpg"
import levis2 from "./pics/levis2.jpg"
import levis3 from "./pics/levis3.jpg"
import levis4 from "./pics/levis4.jpg"


import './App.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Images extends Component {
  render() {
    if (this.props.item_id == "4536"){ 
    return (
        <Carousel>
          <div>
              <img src={img1} alt = "image not found"/>
          </div>
          <div>
              <img src={img2} alt = "image not found"/>
          </div>
          <div>
              <img src={img3} alt = "image not found"/>
          </div>
          <div>
              <img src={img4} alt = "image not found" />
          </div>
      </Carousel>
    )
    }
    else if (this.props.item_id == "3950"){
      return(
        <Carousel>
          <div>
              <img src={shirt1} alt = "image not found"/>
          </div>
          <div>
              <img src={shirt2} alt = "image not found"/>
          </div>
          <div>
              <img src={shirt3} alt = "image not found"/>
          </div>
          <div>
              <img src={shirt4} alt = "image not found" />
          </div>
        </Carousel>
      )
    }
    else{
      return(
        <Carousel>
          <div>
              <img src={levis1} alt = "image not found"/>
          </div>
          <div>
              <img src={levis2} alt = "image not found"/>
          </div>
          <div>
              <img src={levis3} alt = "image not found"/>
          </div>
          <div>
              <img src={levis4} alt = "image not found" />
          </div>
        </Carousel>
      )
    }
  }
}

export default Images;