'use strict';

module.exports = {
  order_id: {
    type: 'string'
  },
  product_id: {
    type: 'string'
  },
  client_id: {
    type: 'string'
  },
  date: {
    type: 'date-time' // The date the order was approved
  },
  payment: {
    principle: {
      date: {
        type: 'date-time'
      },
      ammount: {
        type: 'number'
      }
    },
    received: {
      type: 'array', // TODO:: may receive multiple installments
    },
    refund: {
      type: 'number'
    }
  },
  schedule: {
    type: 'object',
    arrive: {
      type: 'date-time' // The *expected* date the order will arrive
    },
    complete: {
      type: 'date-time' // The *expected* date of completion
    }
  },
  procedures: {
    type: 'array'
  },
  status: {
    type: 'object',
    properties: {
      dispute: {
        type: 'object',
        properties: {
          date: {
            type: 'date-time'
            // TODO::
          }
        }
      },
      resolve: {
        type: 'object',
        properties: {
          date: {
            type: 'date-time'
            // TODO::
          }
        }
      }
    }
  }
};
