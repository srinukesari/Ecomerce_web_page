import React, { Component } from 'react'

import img3 from "./pics/images3.jpg";
import shirt3 from "./pics/shirt3s.jpg"
import levis3 from "./pics/levis3.jpg"

class Itempic extends Component {
  render() {
    if(this.props.item_id === "4536"){ 
        return (
            <div>
                <img src = {img3} alt = "puma shoes img" width = {150} height ={100} />
            </div>
        )
    }
    else if(this.props.item_id === "3950")
    {
        return (
            <div>
                <img src = {shirt3} alt = "wrogn shirt img" width = {120} height ={100} />
            </div>
        )
    }
    else{
        return (
            <div>
                <img src = {levis3} alt = "levis jean img" width = {140} height ={100} />
            </div>
        )
    }
  }
}

export default Itempic;