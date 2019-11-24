'use strict'

const Identity = require('./Identity.js')
const ClientSchema = require('./schema/Schema.js');

const genUID = require('uid-safe');

const UID_BYTES = 20;
const UID_LENGTH = 4*(UID_BYTES/3);

module.exports = class Client extends Identity{
  constructor(value, opts = null, mergeOpts = null){
    super(ClientSchema, opts, mergeOpts);
    value.client_id = value.client_id ? value.client_id : genUID.sync(UID_LENGTH);
    this.value = value;
  }

  get isValid() {
    return this.validate(this.value);
  }
};