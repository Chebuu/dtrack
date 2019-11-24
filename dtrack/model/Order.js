'use strict';

const genUID = require('uid-safe');

const Schema = require('./schema/Schema.js');
const OrderSchema = require('./schema/ORDER_SCHEMA.js');

const UID_BYTES = 20;
const UID_LENGTH = 4*(UID_BYTES/3);

module.exports = class Order extends Schema {
  constructor(value, opts = null, mergeOpts = null){
    super(OrderSchema, opts, mergeOpts);
    value.order_id = value.order_id ? value.order_id : genUID.sync(UID_LENGTH);
    this.value = value;
  }
  get isValid() {
    return this.validate(this.value);
  }
};