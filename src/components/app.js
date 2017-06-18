import React, {Component} from 'react';
import faker from 'faker';
import _ from 'lodash';
import SortedTable from './SortedTable.jsx';

const people = _.times(10, faker.helpers.createCard);

const headings = [
  {
    key: 'name',
    display: true,
    label: 'Name'
  },
  {
    key: 'username',
    display: true,
    label: 'Username'
  },
  {
    key: 'website',
    display: true,
    label: 'Website'
  },
  {
    key: 'email',
    display: true,
    label: 'Email'
  },
  {
    key: 'phone',
    display: true,
    label: 'Phone'
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
