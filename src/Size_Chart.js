import React, { Component } from 'react'
import './App.css'
import {Button} from 'react-bootstrap'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Size_Chart extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        show_sizechart:false,
      }
    }

    show_modal =() =>{
      this.setState({
        show_sizechart:true
      });
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
      <div className = "size_chart">
        <button className = "size_chart_button" onClick = {this.show_modal}>SIZE CHART</button>
        <Modal
        isOpen={this.state.show_sizechart}
        onRequestClose={() => { this.setState({show_sizechart:false})}}
        style={customStyles}
        contentLabel="Example Modal" >
        <h2 id = "size_head">Size Chart (in Inches)</h2>
        <button className = "close" onClick={() => { this.setState({show_sizechart:false})}}>X</button>
        <table class="table table-striped" id = "sizechart_table">
                <thead>
                    <tr>
                    <th>Size</th>
                    <th>Chest(in)</th>    
                    <th>Front Length(in)</th>
                    <th>Across Shoulder(in)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Small</td>
                    <td>38.0</td>
                    <td>27.5</td>
                    <td>16.3</td>
                    </tr>
                    <tr>
                    <td>Medium</td>
                    <td>40.0</td>
                    <td>28.0</td>
                    <td>17.0</td>
                    </tr>
                    <tr>
                    <td>Large</td>
                    <td>42.0</td>
                    <td>28.5</td>
                    <td>17.8</td>
                    </tr>
                    <tr>
                    <td>X-Large</td>
                    <td>44.5</td>
                    <td>29.0</td>
                    <td>18.6</td>
                    </tr>
                </tbody>
            </table>
        </Modal>
      </div>
    )
  }
}

export default Size_Chart;