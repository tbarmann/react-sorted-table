import React, {Component} from 'react';
import faker from 'faker';
import _ from 'lodash';
import SortedTable from './SortedTable.jsx';

const people = _.times(10, faker.helpers.createCard);

const headings = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'username',
    label: 'Username',
    sortable: false
  },
  {
    key: 'website',
    label: 'Website'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'phone',
    display: true,
    label: 'Phone',
    sortable: false
  }    
];

export default class App extends Component {
  render() {
    return (
        <SortedTable
          tableData={people}
          headings={headings}
          initialSortKey="username"
          initialSortDirection="desc"
        />
    );
  }
}
