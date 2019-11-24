'use strict';

module.exports = {
  $ref: 'IDENTITY_SCHEMA',
  orders: {
    type: 'array', // An array of order_id strings
    items: {
      type: 'string'
    }
  },
  address: {
    type: 'object',
    properties: {
      street: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
      state: {
        type: 'string',
      },
      country: {
        type: 'string',
      },
      postal_code: {
        type: 'string',
      }
    }
  },
  contact: {
    name: {
      type: String,
    },
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        country: {
          type: 'string',
        },
        postal_code: {
          type: 'number',
        },
      }
    },
    phone_1: {
      type: 'object',
      properties: {
        number: {
          type: 'string',
          pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
        },
        ext: {
          type: 'sumber',
        },
      }
    },
    phone_2: {
      type: 'object',
      properties: {
        number: {
          type: 'string',
          pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
        },
        ext: {
          type: 'sumber',
        },
      }
    },
    phone_3: {
      type: 'object',
      properties: {
        number: {
          type: 'string',
          pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
        },
        ext: {
          type: 'sumber',
        },
      }
    },
  }
};