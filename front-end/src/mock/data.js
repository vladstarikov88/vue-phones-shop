import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import phones from '@/assets/dummy/phones'
import lodash from 'lodash'
import addresses_resource from '@/assets/dummy/addresses'
const mock = new MockAdapter(axios);
const locale_address = localStorage.getItem('addresses');
let addresses = [];
try {
  const arr = JSON.parse(locale_address);
  if ((typeof arr === 'object') && arr && arr.length) {
    addresses = arr
  } else {
    throw "addresses is not valid"
  }
} catch (e) {
  addresses = addresses_resource;
}

// Mock GET request to /users when param `searchText` is 'John' 
// arguments for reply are (status, data, headers)

mock.onGet('/addresses').reply(200, {addresses});
mock.onGet('/phones').reply(function (config) {
  if(config.query) {
    let result = lodash.filter(phones,
      (phone) => {
        if(config.query.category_name && phone.category_name !== config.query.category_name) {
          return false;
        }
        return lodash.includes(
          phone.name.toLowerCase(), 
          config.query.search_text.toLowerCase(),
          )
    });
    if(config.query.only_available){
      result = lodash.filter(result, {is_available: true})
    }
    return [200, {phones: result}]
  } else {
    return [200, {phones}]
  }
});
mock.onPost('/login').reply(function (config) {
  const {username, password} = JSON.parse(config.data);
  if (username === 'root' && password === 'toor') {
    return [200, {access_token: 'test_access_token' }]
  } else {
    return [401, {msg: 'incorrect login or password'}]
  }
});
mock.onPost('/address').reply(function (config) {
  const address = JSON.parse(config.data);
  const index = lodash.findIndex(addresses, {id: address.id});
  if (~index) {
    addresses.splice(index, 1, address);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    return [200, {addresses}]
  } else {
    return [400, {msg: 'incorrect data'}]
  }
});
mock.onGet('/phone').reply(function (config) {
  const phone = lodash.find(phones, { id: config.id });
  if(phone){
    return [200, phone]
  } else {
    return [400, {message: 'phone not found'}]
  }
});
mock.onGet('/address').reply(function (config) {
  const address = lodash.find(addresses, { id: config.id });
  if(address){
    return [200, address]
  } else {
    return [400, {message: 'address not found'}]
  }
});
export default mock