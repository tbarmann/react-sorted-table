import React, {Component} from 'react';
import faker from 'faker';
import _ from 'lodash';
import SortedTable from './SortedTable.jsx';

//create 10 rows of fake data
const people = _.times(10, (index) => {
  return {
    index: index,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
    state: faker.address.state(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  }
});

console.log(faker.helpers.createCard());

const headings = [
  { 
    key: 'index',
    display: true,
    label: 'index'
  },
  {
    key: 'firstName',
    display: true,
    label: 'First name'
  },
  {
    key: 'lastName',
    display: true,
    label: 'Last name'
  },
  {
    key: 'city',
    display: true,
    label: 'City'
  },
  {
    key: 'state',
    display: true,
    label: 'State'
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
        <SortedTable tableData={people} headings={headings}/>
    );
  }
}
