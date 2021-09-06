import React, { Component } from 'react'
import Modal from "react-modal"
import './App.css'

class Size_Chart extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        show_sizechart:false,
      }
    }

  render() {
    return (
      <div className = "size_chart">
        <button type="button"  className = "size_chart_button" data-toggle="modal" data-target="#myModal">SIZE CHART</button>
        <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">SIZE CHART (in Inches)</h4>
                </div>
                <div class="modal-body">
                <table class="table table-striped">
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
                    <td>Extra - Large</td>
                    <td>44.5</td>
                    <td>29.0</td>
                    <td>18.6</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>

        </div>
        </div>
      </div>
    )
  }
}

export default Size_Chart;