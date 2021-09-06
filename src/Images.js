import React, { Component } from 'react'
import img2 from "./pics/images2.jpg";
import img3 from "./pics/images3.jpg";
import img4 from "./pics/images4.jpg";
import img1 from "./pics/images1.jpg";
import './App.css'

class Images extends Component {
  render() {
    return (
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="item active">
          <img src = {img1} alt = "puma shoes img" width = {500}/>
          </div>
      
          <div class="item">
          <img src = {img2} alt = "puma shoes img" width = {500} />
          </div>
      
          <div class="item">
          <img src = {img3} alt = "puma shoes img" width = {500} />
          </div>

          <div class="item">
          <img src = {img4} alt = "puma shoes img" width = {500} />
          </div>
        </div>
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    )
  }
}

export default Images;