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
mock.onGet('/phone').reply(function (config) {
  const phone = lodash.find(phones, { id: config.id });
  if(phone){
    return [200, phone]
  } else {
    return [400, {message: 'phone not found'}]
  }
});
export default mock