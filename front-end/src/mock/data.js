import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

// Mock GET request to /users when param `searchText` is 'John' 
// arguments for reply are (status, data, headers)
mock.onGet('/users', { params: { searchText: 'John' } }).reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});
export default mock