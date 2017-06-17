import React, { Component } from 'react';
import _ from 'lodash';

export default class SortedTable extends Component {

  renderHeadings(headings){
  	return headings.map((col,index) => <th key={index}>{col}</th>);
  }
  
  renderRow(row, rowNum) {
  	return _.map(row, (col) => {
    	return (<td key={`${rowNum}_${col}`}>{col}</td>);
    });
  }
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
	render() {
  	const {data} = this.props;
    const headings = Object.keys(_.head(data));
    return (
    	<div className="sortedTable">
      	<table>
        	<tbody>
          	<tr>
              {this.renderHeadings(headings)}
            </tr>
   						{data.map((row, index) => {
              	return(
                  <tr key={`row_${index}`}>
                		{this.renderRow(row, index)}
                	</tr>
                );
              }
              )}
           </tbody>
         </table>
    	</div>
    );
  }
}
