import './App.css';
import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Addcart from './Addcart';
import Billing from './Billing';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       billing : false,
       checking : "srinu it is working",
       user_id : "3939"
    }
  }
  
  gotocart = (event) =>{
    this.setState({
      billing:true
    });
  }

  render(){
    return (
      <Container fluid>
        <div class = 'navbar'>
          <strong>GO</strong><strong id = "title_color">CART<i class="fa fa-shopping-cart" aria-hidden="true"></i></strong>
        </div>
        { this.state.billing ?
        <Billing user = {this.state.user_id}/> :
        <Addcart user = {this.state.user_id} gotocart = {this.gotocart}/> 
        }
      </Container>
    );
  }
}


export default App;
