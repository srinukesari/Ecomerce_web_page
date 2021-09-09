import './App.css';
import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Addcart from './Addcart';
import Billing from './Billing';
import Images from './Images'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       billing : false,
       user_id : "3939"
    }
  }
  
  gotocart = (event) =>{
    this.setState({
      billing:true
    });
  }
  home = () =>{
    this.setState({
      billing:false
    })
  }
  render(){
    return (
      <Container fluid className = "gocart_web">
        <center>
        <div class="nav_gocart">
          <div className ="title">
              <strong>GO</strong>
              <strong id = "title_color">CART<i class="fa fa-shopping-cart" aria-hidden="true"></i></strong>
          </div>
          <div className = "heading">
            <button className = "home_button_fake">MEN</button>
            <button className = "home_button_fake">WOMEN</button>
            <button className = "home_button_fake">KIDS</button>
            <button className = "home_button_fake">HOME&LIVING</button>
            <button className = "home_button_fake">BEAUTY</button>
            <input type= "text" className = 'search_bar' placeholder="Search for products, brands and more" />

            <button onClick = {this.home} className = "home_button">
              <i class="fa fa-home" aria-hidden="true"></i>HOME</button>


            <button onClick = {this.gotocart } className = "home_button">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>Cart</button>
            
          </div>
        </div>
        </center>
        { this.state.billing ?
        <Billing user = {this.state.user_id}/> :
        <Addcart user = {this.state.user_id} gotocart = {this.gotocart}/> 
        }
        
      </Container>
    );
  }
}


export default App;
