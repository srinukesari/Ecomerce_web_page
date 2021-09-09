import React, { Component } from 'react'
import axios from "axios"
import img3 from "./pics/images3.jpg";
import { Container,Button } from 'react-bootstrap';
import Modal from 'react-modal';
import Itempic from './Itempic';

Modal.setAppElement('#root');

class Itemdesc extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        user_id:"",
        item_id:"",
        item_exist:true,
        single_item_cost:0,
        single_item_discount:0,
        size:"",
        quantity:0,
        max_quantity:0,
        brand:"",
        desc:"",
        cost:0,
        discount:0,
        dis_amount:0,
        delhivery:"",
        convience_fee:99,
        total_items_list:{},
        stock_msg:false,
      }
    }

    async componentDidMount(){
      console.log(this.props.bag_item)
      this.setState({
        item_id:this.props.bag_item['item_id'],
        user_id : this.props.user
      })
      await axios.post("https://xxysp0vbbi.execute-api.us-east-2.amazonaws.com/api_js/cart_list_item",
      {"item_id":this.props.bag_item['item_id']})
      .then(response =>{
            const item_detail = response.data.Item
            console.log(item_detail)
            this.setState({
              single_item_cost:item_detail.item_cost,
              single_item_discount: Math.ceil((item_detail.item_cost*(item_detail.item_discount))/100),
              brand:item_detail.item_brand,
              desc:item_detail.item_desc,
              max_quantity : item_detail.item_size[this.props.bag_item['size']],
              cost:item_detail.item_cost*this.props.bag_item['quantity'],
              discount:item_detail.item_discount,
              dis_amount: Math.ceil(((item_detail.item_cost*(item_detail.item_discount))/100)*this.props.bag_item['quantity']),
              size:this.props.bag_item['size'],
              quantity:this.props.bag_item['quantity'],
            });
            this.props.cost_prop(this.state.cost ,this.state.dis_amount)
        });
    }
    remove_item = async() =>{
      console.log(this.props.user)
      console.log(this.state.item_id)
      console.log(this.state.size)
      await axios.post("https://xxysp0vbbi.execute-api.us-east-2.amazonaws.com/api_js/remove_item_from_usercart",
      {"user_id":this.props.user,"item_id":this.state.item_id,"size":this.state.size}).
      then(response => {
        console.log(response.data);
        console.log("succesfully deleted");
      });
      this.props.cost_prop(this.state.cost*-1 ,this.state.dis_amount*-1)
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
        item_exist:false,
      })
    }

    increment = async() =>{
      console.log("coming to increment")
      if(this.state.quantity + 1 > this.state.max_quantity){
        this.setState({
          stock_msg:true,
        });
      }
      else{
        this.props.total_item_count(1);
        this.setState({
          cost : this.state.single_item_cost * (this.state.quantity + 1),
          dis_amount:this.state.single_item_discount * (this.state.quantity + 1)
        })
        const cart_item ={
          "user_id": this.state.user_id,
          "item_list":[
            {
              "size": this.state.size,
              "item_id": this.state.item_id,
              "quantity": this.state.quantity + 1
            }
          ]
        }
        await axios.post("https://xxysp0vbbi.execute-api.us-east-2.amazonaws.com/api_js/add_to_cart_",cart_item)
        .then(response =>{
            console.log(response.data);
            console.log("quantity incre added to db")
        })
        this.setState({
          quantity : this.state.quantity + 1,
        });
        this.props.cost_prop(this.state.single_item_cost ,this.state.single_item_discount);
        
      }
    }

    decrement = () =>{
      this.props.total_item_count(-1);
      if(this.state.quantity - 1 > 0){
        this.props.cost_prop(this.state.single_item_cost*-1 ,this.state.single_item_discount*-1);
        this.setState({
          cost : this.state.single_item_cost * (this.state.quantity - 1),
          dis_amount:this.state.single_item_discount * (this.state.quantity - 1)
        })
        this.setState({
          quantity : this.state.quantity - 1,
        });
      }
      else{
        this.remove_item();
      }
    }
  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    return (
      <Container>
      { this.state.item_exist ?
        <div className = "cart_items">
          <div className = "cart_img">
            <Itempic item_id = {this.state.item_id} />
          </div>
          <div className = "cart_item_details">
            <em id="cart_item_brand">{this.state.brand}</em>
            <em id = "cart_item_cost"><i class="fa fa-inr" aria-hidden="true"></i> {this.state.cost - this.state.dis_amount}</em>
            <br></br>
            <em id= "cart_item_desc">{this.state.desc}</em>
            <br></br>
            <em id="cart_item_size">Size : {this.state.size}</em>
            <button className = "quantity_button" onClick = {this.decrement}>-</button>
            <em id="cart_item_quantity">{this.state.quantity}</em>
            <button className="quantity_button" onClick = {this.increment} >+</button>
            <br></br>
            
            <div id = "underline"></div>
            <button className="remove_button" onClick = {this.remove_item}>REMOVE</button>
            <button className="moveto_button" onClick = {this.remove_item}>MOVE TO WISHLIST</button>


            <Modal
            isOpen={this.state.stock_msg}
            onRequestClose={() => { this.setState({stock_msg:false})}}
            style={customStyles}
            contentLabel="Example Modal" >
            <h2 id = "size_head">STOCK MESSAGE </h2>
            <button className = "close" onClick={() => { this.setState({stock_msg:false})}}>X</button>
            <br></br>
            <br></br>
            <br></br>
            <em id ="stock_msg">Selected Quantity is Unavailable</em>
            </Modal>

          </div>
        </div>
      :
        <div>
        </div>
      }
      </Container>
    )
  }
}

export default Itemdesc;