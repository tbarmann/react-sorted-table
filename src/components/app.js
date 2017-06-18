import React, {Component} from 'react';
import faker from 'faker';
import _ from 'lodash';
import SortedTable from './SortedTable.jsx';

//create 10 rows of fake data
const people = _.times(10, () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
    state: faker.address.state(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  }
});

const headings = {
  firstName: {
    display: true,
    label: 'First name',
    order: 1
  },
  lastName: {
    display: true,
    label: 'Last name',
    order: 2
  },
   city: {
    display: true,
    label: 'City',
    order: 3
  },
  state: {
    display: true,
    label: 'State',
    order: 4
  },
  email: {
    display: true,
    label: 'Email',
    order: 5
  },
  phone: {
    display: true,
    label: 'Phone',
    order: 6
  }    
};

export default class App extends Component {
  render() {
    return (
        <SortedTable tableData={people} headings={headings}/>
    );
  }
}
