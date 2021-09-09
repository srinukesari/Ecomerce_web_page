import React, { Component } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Stockerror extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         show_modal :false
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
      <div>
        <div className = "size_chart">
        <button className = "size_chart_button" onClick = {this.show_modal}>SIZE CHART</button>
        <Modal
        isOpen={this.props.stock_msg}
        onRequestClose={() => { this.setState({show_sizechart:false})}}
        style={customStyles}
        contentLabel="Example Modal" >
        <h2 id = "size_head">Size Chart (in Inches)</h2>
        <button className = "close" onClick={() => { this.setState({show_sizechart:false})}}>X</button>
        </Modal>
      </div>
      </div>
    )
  }
}

export default Stockerror;