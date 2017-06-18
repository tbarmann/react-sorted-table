import React, {Component, PropTypes} from 'react';
import {head, map, orderBy} from 'lodash';

export default class SortedTable extends Component {

 constructor(props) {
    super(props);
    this.state = {
      headings: {},
      sortKey: '',
      sortDirection: '',
      tableDataSorted: []
    };
  }

  static propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headings: PropTypes.object
  };
  /**
   * lifecycle method
   * Sort the tableData array according to the key and direction set
   * in the intial state, and store the sorted array in local state
   */
  componentWillMount() {
    const {sortKey, sortDirection} = this.state;
    const {tableData, headings} = this.props;
    const columnNames = Object.keys(head(tableData));
    this.setState({
      tableDataSorted: this.sortRows(tableData, sortKey, sortDirection),
      headings: headings || this.createDefaultHeadings(columnNames)
    });
  }

  createDefaultHeadings = (columnNames) => {
    const headings = _.zipObject(columnNames, _.map(columnNames, (name, index) => {
      return { display: true, label: name, order: index};
      }));
    return headings;
  }

  /**
   * sort array of objects by a given key and direction (ascending or descending)
   * @param  {array} rows - array of objects, each contaning a row
   * @param  {string} sortKey - key in row object to sort by
   * @param  {string} sortDirection - either 'asc' or 'desc'
   * @return {array} sorted array of objects
   */
  sortRows = (rows, sortKey, sortDirection) => {
    return orderBy(rows, [sortKey], [sortDirection]);
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

  renderHeadings(){
    const {headings} = this.state;
  	return map(headings, (heading, key) => {
      return(
        <th key={key}>
          <a onClick={this.handleHeadingClick(key)}>
            {heading.label}
          </a>
        </th>
      );
    });
  }
  
  renderRow(row, rowNum) {
  	return map(row, (col, index) => {
    	return (<td key={`${rowNum}_${index}`}>{col || ''}</td>);
    });
  }
   
  render() {
    const {tableDataSorted} = this.state;
    return (
      <div>
        <table className="sortedTable">
          <tbody>
            <tr>
              {this.renderHeadings()}
            </tr>
            {tableDataSorted.map((row, index) => {
              return(
                <tr key={`row_${index}`}>
                  {this.renderRow(row, index)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
