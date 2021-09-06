import './App.css';
import React, { Component } from 'react';
import { Container , Navbar } from 'react-bootstrap';
//import * as AWS from 'aws-sdk'
import axios from 'axios';
import Images from './Images';
import Modal from "react-modal"
import Size_Chart from './Size_Chart';

Modal.setAppElement("#root");
class Addcart extends Component {
  constructor(props) {
    super(props)
    this.state = {
       item_id:"",
       brand:"",
       desc:'',
       size:{},
       rating:'',
       cost:'',
       discount:'',
       dis_cost:'',
       addcart:true,
       selected_size : "",
       size_msg : "",
      quantity_small : false,
      quantity_medium: false,
      quantity_large : false,
      quantity_xlarge : false,
      item_counter:0,
      total_item_list:"",
      previous:false,
      next:false,
   }
  }

  componentDidMount(){
    axios.get('https://notslre7ab.execute-api.us-east-2.amazonaws.com/api_list2/list_item')
        .then(response => { 
            const cart = response.data.Items[0]
            console.log(response.data.Items[0])
            console.log(cart)
            this.setState({
              total_item_list:response.data.Items,
            })
            this.set_item(this.state.item_counter);
        }
    );
  }
  addtocart = async(event) => {
    console.log(this.state.selected_size)
    if(this.state.selected_size){
      this.setState({
        addcart : false
      });
      const cart_item ={
            "user_id": this.props.user,
            "item_list": [
              {
                "size": this.state.selected_size,
                "item_id": this.state.item_id,
                "quantity": 1
              }
            ]
        }
        console.log(cart_item)

        await axios.post("https://notslre7ab.execute-api.us-east-2.amazonaws.com/api_list2/cart_items_put",cart_item)
        .then(response =>{
            console.log(response.data);
        })
    }
    else{
      this.setState({
        size_msg : "Please select a size"
      })
      console.log("nothing selected")
    }

  }

  size_input = (event) =>{

    this.setState({
      selected_size : event.target.id,
      size_msg : ""
    })
  }

  cart = (event) =>{
      console.log("enetering to billing page")
      this.props.gotocart();
  }

  previous_item = () =>{
    console.log(this.state.total_item_list)
    console.log(this.state.total_item_list.length)
    console.log("coming to previous")
    this.set_item(this.state.item_counter - 1);
  }

  next_item = () =>{
    console.log("coming to next")
    this.set_item(this.state.item_counter + 1);
  }

  set_item = (curr_val) =>{
    console.log(curr_val)
    console.log(this.state.total_item_list.length)
    if (-1 < curr_val && curr_val < this.state.total_item_list.length)
    {
      console.log("upto this okay")
      const cart = this.state.total_item_list[curr_val]
      this.setState({
          item_id : cart.item_id,
          brand : cart.item_brand,
          cost : cart.item_cost,
          discount: cart.item_discount ,
          rating : cart.item_rating,
          size : cart.item_size,
          desc : cart.item_desc,
          dis_cost : Math.floor((cart.item_cost*(100 - cart.item_discount))/100),
          addcart:true,
          selected_size : "",
          size_msg : "",
          quantity_small : false,
          quantity_medium: false,
          quantity_large : false,
          quantity_xlarge : false,
          item_counter:curr_val
        });

        if(cart.item_size.small < 1){
          this.setState({
            quantity_small : true 
          });
        }

        if(cart.item_size.medium < 1){
          this.setState({
            quantity_medium : true 
          });
          console.log("disabling the medium radio")
        }
        if(cart.item_size.large < 1){
          this.setState({
            quantity_large : true 
          });
        }
        if(cart.item_size.xlarge < 1){
          this.setState({
            quantity_xlarge : true 
          });
        }
    }
  }
  render() {
    return (
      <div>
        <button  onClick = {this.previous_item} className="prev_button">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </button>
        <button onClick = {this.next_item} className="next_button">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      <Container id = "cart">
        <div class="row">
          <div class="col-md-6" id = "left">
            < Images />
          </div>
          <div class="col-md-5" id = "right">
            <em id = "brand" >{this.state.brand}</em>
            <br></br>
            <em id = "desc">{this.state.desc}</em>
            <br></br>
            <br></br>

            <em id = "rating">Rating : {this.state.rating} 
            <img src="https://img.icons8.com/fluency/18/000000/star.png" alt = "rating star"/></em>

            <div id= "underline"></div>
            <br></br>
            <br></br>
            <em id = "dis_cost"> Rs.{this.state.dis_cost}</em>
            <em id = "cost">Rs. {this.state.cost}</em>
            <em id = "discount"> ({this.state.discount}% OFF)</em>
            <br></br>
            <em id = "taxes">inclusive of all taxes</em>
            <br></br>
            <br></br>
            <br></br>
            <em id="size"> SELECT SIZE  <Size_Chart /> </em>
            <br></br>
            <em id = "err_msg" > {this.state.size_msg}</em>
            <div class='section'>
              <Container>
                  <input type="radio" alt="small" name="item_size" id="small" 
                  onChange = {this.size_input} 
                  disabled = {this.state.quantity_small}/>
                  <label class="small" for="small" >S</label>
                      
                  <input type="radio" alt="medium" name="item_size" id="medium" 
                  onChange = {this.size_input} disabled = {this.state.quantity_medium}/>

                  <label class="medium" for="medium">M</label>

                  <input type="radio" alt="large" name="item_size" id="large"  
                  onChange = {this.size_input}
                  disabled = {this.state.quantity_large} />
                  <label class="large" for="large" >L</label>

                  <input type="radio" alt="xlarge" name="item_size" id="xlarge" 
                  onChange = {this.size_input} 
                  disabled = {this.state.quantity_xlarge}/>
                  <label class="xlarge" for="xlarge" >XL</label>
                </Container>
            </div>
            { this.state.addcart ?
              <button onClick = {this.addtocart} class="addcart"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> ADD TO CART</button>:
              <button onClick = {this.cart} class = "addcart">GO TO CART  <i class="fa fa-arrow-right" aria-hidden="true"></i> </button>
            }
          </div>
        </div>
      </Container>
      </div>
    )
  }
}


export default Addcart;
