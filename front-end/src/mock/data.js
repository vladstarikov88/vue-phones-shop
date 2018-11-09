import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import phones from '@/assets/dummy/phones'
import lodash from 'lodash'
const mock = new MockAdapter(axios);

// Mock GET request to /users when param `searchText` is 'John' 
// arguments for reply are (status, data, headers)
mock.onGet('/phones').reply(200, {
  phones
});
mock.onPost('/check').reply(function (config) {
  console.log(config.headers)
  return [200, {}]
})
mock.onPost('/login').reply(function (config) {
  const {username, password} = JSON.parse(config.data);
  if (username === 'root' && password === 'toor') {
    return [200, {access_token: 'test_access_token' }]
  } else {
    return [401, {msg: 'incorrect login or password'}]
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
export default mock