'use strict';

const Schema = require('./schema/Schema.js');

class Identity extends Schema{
  constructor(schema, opts = null, mergeOpts = null){
    super(schema, opts, mergeOpts);
  }
}

module.exports = Identity;