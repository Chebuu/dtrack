'use strict';

const Schema = require('./schema/Schema.js');
const ProductSchema = require('./schema/PRODUCT_SCHEMA.js');

const genUID = require('uid-safe');

const UID_BYTES = 20;
const UID_LENGTH = 4*(UID_BYTES/3);

class Product extends Schema {
  constructor(value, opts = null, mergeOpts = null){
    super(ProductSchema, opts, mergeOpts);
    value.product_id = value.product_id ? value.product_id : genUID.sync(UID_LENGTH);
    this.value = value;
  }
  get isValid() {
    return this.validate(this.value);
  }
}

module.exports = Product;