import axios from 'axios';
import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import './App.css';
import Itemdesc from './Itemdesc';

class Billing extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        delhivery:"",
        convience_fee:99,
        total_items_list:[],
        total_mrp:0,
        total_discount:0,
        mrp_after_discount:0,
        cart_full:true,
      }
    }
    
    componentDidMount(){
        const data = {
          "user_id":this.props.user
        }
        axios.post('https://xxysp0vbbi.execute-api.us-east-2.amazonaws.com/api_js/get_usercart_by_userid',data)
        .then(response =>{
                console.log(response.data.Item["item_list"].length)
                if (response.data.Item["item_list"].length) {
                this.setState({
                  total_items_list: response.data.Item['item_list']
                });
                console.log("check here")
                console.log(this.state.total_items_list);
              }
              else{
                this.setState({
                  delhivery:"",
                  convience_fee:0,
                  cart_full:false

                })
              }
        });
    }

    total_cost_balance = (mrp,discount) =>{
      console.log(mrp,discount);
      console.log(this.state.total_mrp,this.state.total_discount)
      this.setState({
        total_mrp : this.state.total_mrp + mrp,
        total_discount : this.state.total_discount + discount
      })
      console.log(this.state.total_mrp,this.state.total_discount);
      if(this.state.total_mrp > 499){
        this.setState({ 
          delhivery:"Free",
          convience_fee:99,
        })
      }
      if(this.state.total_mrp === 0){
        this.setState({
          delhivery:"",
          convience_fee:0,
          cart_full:false
        })
      }

    }
  render() {
      const items = []
      
      this.state.total_items_list.forEach((element) => {
        items.push(< Itemdesc key = {element['item_id']+element['size']} 
        bag_item = {element} user = {this.props.user} cost_prop = {this.total_cost_balance}  />)
      });

    return (
      <Container>
        <em id = "my_cart_title">My Cart </em>
        <em id = "total_billing_amount">Total: Rs.{this.state.total_mrp - this.state.total_discount}</em>
        <div className = "row" id = "check">
        {this.state.cart_full ?
          <div className = "col-md-8" id ='left_bill'>
            {items}
          </div>:
          <div className = "col-md-8">
            <em id ="cart_empty" >Cart is Empty</em>
          </div>
        }
          <div className = "col-md-4">
          <div className = "bill">
            <h3>Price Details</h3>
            <em id="left_bill" >Total MRP</em>
            <em id= "right_bill">Rs. {this.state.total_mrp}</em>
            <br></br>
            <em id="left_bill">Discount on MRP</em>
            <em id="dis_amount">-Rs.{this.state.total_discount}</em>
            <br></br>
            <em id="left_bill">Convenience Fee</em>
            {this.state.delhivery?
            <em id="right_bill"><s>Rs. {this.state.convience_fee}</s> <em id="free_tag"> {this.state.delhivery}</em></em>:
            <em id="right_bill">Rs. {this.state.convience_fee}</em>
            }
            <br></br>
            <br></br>
            <br></br>
            <em id="left_bill"><strong>Total Amount</strong></em>
            <em id="right_bill"><strong>Rs.{this.state.total_mrp - this.state.total_discount}</strong></em>
            <br></br>
            <br></br>
            <button class= "check_out_button">CHECK OUT</button>
        </div>
        </div>
        </div>
      </Container>
    )
  }
}

export default Billing;