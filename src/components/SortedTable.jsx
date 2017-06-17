import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class SortedTable extends Component {

 constructor(props) {
    super(props);
    this.state = {
      sortKey: 'key',
      sortDirection: 'asc',
      tableDataSorted: []
    };
  }

  static propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired
  };
  /**
   * lifecycle method
   * Sort the tableData array according to the key and direction set
   * in the intial state, and store the sorted array in local state
   */
  componentWillMount() {
    const {sortKey, sortDirection} = this.state;
    const {tableData} = this.props;
    this.setState({tableDataSorted: this.sortRows(tableData, sortKey, sortDirection)});
  }

  /**
   * sort array of objects by a given key and direction (ascending or descending)
   * @param  {array} rows - array of objects, each contaning a row
   * @param  {string} sortKey - key in row object to sort by
   * @param  {string} sortDirection - either 'asc' or 'desc'
   * @return {array} sorted array of objects
   */
  sortRows = (rows, sortKey, sortDirection) => {
    return _.orderBy(rows, [sortKey], [sortDirection]);
  }

  /**
   * dispatches the sort function with the appropriate params
   * if heading clicked is the same key that is currently used to sort,
   * then reverse the sort order
   * store sorted rows array in local state
   * @param  {string} newSortKey - new key to sort by
   */
  handleHeadingClick = (newSortKey) => {
    return (() => {
      const {tableDataSorted, sortKey} = this.state;
      let sortDirection = this.state.sortDirection;
      if (newSortKey === sortKey) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.setState({
        sortDirection,
        sortKey: newSortKey,
        tableDataSorted: this.sortRows(tableDataSorted, newSortKey, sortDirection)
      });
    });
  }

  renderHeadings(headings){
  	return headings.map((heading, index) => {
      return(
        <th key={index}>
          <a onClick={this.handleHeadingClick(heading)}>
            {heading}
          </a>
        </th>
      );
    });
  }
  
  renderRow(row, rowNum) {
  	return _.map(row, (col, index) => {
    	return (<td key={`${rowNum}_${index}`}>{col || ''}</td>);
    });
  }
   
	render() {
  	const {tableDataSorted} = this.state;
    const headings = Object.keys(_.head(tableDataSorted));
    return (
    	<div >
      	<table className="sortedTable">
        	<tbody>
          	<tr>
              {this.renderHeadings(headings)}
            </tr>
   						{tableDataSorted.map((row, index) => {
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
