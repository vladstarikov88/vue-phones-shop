export default {

    ['GET */example'] (pathMatch, query, request) {
      let body = {
        collection1: [
          { id: 1, name: 'name1' },
          { id: 2, name: 'name2' },
        ]
      }
  
      return {
        body: body,
        status: 200
      }
    }
  }