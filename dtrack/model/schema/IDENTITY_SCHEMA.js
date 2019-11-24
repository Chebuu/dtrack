'use strict';

module.exports = {
  class: {
    type: 'string'
  },
  name: {
    type: 'object',
    properties: {
      first: {
        type: 'string'
      },
      last: {
        type: 'string'
      }
    }
  },
  email: {
    type: 'string',
  },
  username: {
    type: 'string'
  }
};