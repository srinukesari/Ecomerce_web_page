import axios from 'axios';
import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import './App.css';
import Itemdesc from './Itemdesc';

class Billing extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        total_items_count:0,
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
                  total_items_list: response.data.Item['item_list'],
                  total_items_count : response.data.Item["item_list"].length,
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

    set_item_count = (count) =>{
      this.setState({
        total_items_count : this.state.total_items_count + count
      })
    }
  render() {
      const items = []
      
      this.state.total_items_list.forEach((element) => {
        items.push(< Itemdesc key = {element['item_id']+element['size']} 
        bag_item = {element} user = {this.props.user} cost_prop = {this.total_cost_balance}  
        total_item_count = {this.set_item_count} />)
      });

    return (
      <Container>
          <br></br>
          <br></br>
          <em id = "my_cart_title">My Shopping Cart ( {this.state.total_items_count} Items ) </em>
          <em id = "total_billing_amount">Total: <i class="fa fa-inr" aria-hidden="true"></i> {this.state.total_mrp - this.state.total_discount}</em>
        <div className = "row">
        {this.state.cart_full ?
          <div className = "col-md-*" id ='left_bill'>
            {items}
          </div>:
          <div className = "col-md-*" id ="cart_empty" >
            <em>Cart is Empty</em>
          </div>
        }
          <div className = "col-md-*">
          <div className = "bill">
            <h3>Price Details</h3>
            <em id="left_bill" >Total MRP</em>
            <em id= "right_bill"><i class="fa fa-inr" aria-hidden="true"></i> {this.state.total_mrp}</em>
            <br></br>
            <em id="left_bill">Discount on MRP</em>
            <em id="dis_amount">-<i class="fa fa-inr" aria-hidden="true"></i> {this.state.total_discount}</em>
            <br></br>
            <em id="left_bill">Convenience Fee</em>
            {this.state.delhivery?
            <em id="right_bill"><s><i class="fa fa-inr" aria-hidden="true"></i> {this.state.convience_fee}</s> <em id="free_tag"> {this.state.delhivery}</em></em>:
            <em id="right_bill"><i class="fa fa-inr" aria-hidden="true"></i> {this.state.convience_fee}</em>
            }
            <br></br>
            <br></br>
            <br></br>
            <em id="left_bill"><strong>Total Amount</strong></em>
            <em id="right_bill"><strong><i class="fa fa-inr" aria-hidden="true"></i> {this.state.total_mrp - this.state.total_discount}</strong></em>
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