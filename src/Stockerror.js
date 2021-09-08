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
        
      </div>
    )
  }
}

export default Stockerror;