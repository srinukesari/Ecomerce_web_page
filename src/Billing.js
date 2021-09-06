import axios from 'axios';
import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import './App.css';
import img4 from "./pics/img4.jpg";

class Billing extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        item_id:"",
        item_cost:0,
        item_discount:0,
        size:"",
        quantity:0,
        brand:"",
        desc:"",
        cost:0,
        discount:0,
        dis_amount:0,
        delhivery:""
      }
    }
    
    async componentDidMount(){
        const data = {
          "user_id":this.props.user
        }
        await axios.post('https://notslre7ab.execute-api.us-east-2.amazonaws.com/api_list2/cart_item_get',data)
        .then(response =>{
                console.log("checking")
                console.log(this.props.user)
                console.log(response.data);
                const  user = response.data.Item['item_list'][0]
                console.log(user)
                this.setState({
                  item_id:user['item_id'],
                  size:user['size'],
                  quantity:user['quantity']
                })
                console.log(this.state.item_id)
                if(this.state.item_id){
                  this.item_bill(this.state.item_id)
                }
        });
    }

    item_bill = async(id) =>{
      console.log(id);
      await axios.post("https://notslre7ab.execute-api.us-east-2.amazonaws.com/api_list2/list_item_detail",{"item_id":id})
      .then(response =>{
            const item_detail = response.data.Item
            console.log(item_detail)
            this.setState({
              brand:item_detail.item_brand,
              desc:item_detail.item_desc,
              cost:item_detail.item_cost,
              item_cost:item_detail.item_cost,
              discount:item_detail.item_discount,
              dis_amount: Math.ceil((item_detail.item_cost*(item_detail.item_discount))/100),
              item_discount:Math.ceil((item_detail.item_cost*(item_detail.item_discount))/100),

            })

            if(this.state.cost - this.state.dis_amount > 400){
              this.setState({
                delhivery:"FREE"
              })
            }
            console.log(this.state.brand);
            console.log(this.state.cost);
            console.log(this.state.dis_amount)
            console.log(this.state.discount)
      })

    }
    increment = () =>{
      this.setState({
        cost:this.state.item_cost*(this.state.quantity + 1),
        dis_amount:this.state.item_discount*(this.state.quantity + 1),
        quantity:this.state.quantity + 1
      })

    }
    decrement = () =>{
      if (this.state.quantity-1){
        this.setState({
          cost:this.state.item_cost*(this.state.quantity - 1),
          dis_amount:this.state.item_discount*(this.state.quantity + 1),
          quantity:this.state.quantity - 1
        })
      }
      else{
        this.remove_item();
      }
    }
    remove_item = async() =>{
      await axios.post("https://notslre7ab.execute-api.us-east-2.amazonaws.com/api_list2/remove_cart_item",
      {"user_id":this.props.user}).
      then(response => {
        console.log(response.data);
        console.log("succesfully deleted");
      });
      this.setState({
        item_cost:0,
        item_discount:0,
        size:"",
        quantity:0,
        brand:"",
        desc:"",
        cost:0,
        discount:0,
        dis_amount:0,
        delhivery:""
      })
    }
  render() {
    return (
      <Container>
        <h4 id= "mycart_title">My Cart</h4>
        {this.state.cost?
        <div className ="cart_items">
          <div className = "cart_img">
            <img src = {img4} alt = "puma shoes img" width = {160} height ={200} />
          </div>
          <div className = "cart_item_details">
            <em id="cart_item_brand">{this.state.brand}</em>
            <em id = "cart_item_cost">Rs.{this.state.cost - this.state.dis_amount}</em>
            <br></br>
            <em id= "cart_item_desc">{this.state.desc}</em>
            <br></br>
            <br></br>
            <em id="cart_item_size">Size : {this.state.size}</em>
            <button className = "quantity_button" onClick = {this.decrement}>-</button>
            <em id="cart_item_quantity">{this.state.quantity}</em>
            <button className="quantity_button" onClick = {this.increment} >+</button>
            <br></br><br></br><br></br>
            <button className="remove_button" onClick = {this.remove_item}>Remove</button>
          </div>
        </div>:
        <div className="empty_cart">
          <h1>cart is empty</h1>
        </div>
        }
        <div className = "bill">
            <h3>Price Details</h3>
            <em id="left_bill" >Total MRP</em>
            <em id= "right_bill">Rs. {this.state.cost}</em>
            <br></br>
            <em id="left_bill">Discount on MRP</em>
            <em id="dis_amount">-Rs.{this.state.dis_amount}</em>
            <br></br>
            <em id="left_bill">Convenience Fee</em>
            {this.state.delhivery?
            <em id="right_bill"><s>Rs. 99 </s> <em id="free_tag"> {this.state.delhivery}</em></em>:
            <em id="right_bill">Rs.99</em>
            }
            <br></br>
            <br></br>
            <br></br>
            <em id="left_bill"><strong>Total Amount</strong></em>
            <em id="right_bill"><strong>Rs.{this.state.cost - this.state.dis_amount}</strong></em>
            <br></br>
            <br></br>
            <button class= "check_out_button">CHECK OUT</button>
        </div>
      </Container>
    )
  }
}

export default Billing;