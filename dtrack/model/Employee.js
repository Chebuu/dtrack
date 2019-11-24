'use strict';

const Identity = require('./Identity.js');
const EmployeeSchema = require('./schema/EMPLOYEE_SCHEMA.js');

const genUID = require('uid-safe');

const UID_BYTES = 20;
const UID_LENGTH = 4*(UID_BYTES/3);

class Employee extends Identity {
  constructor(value, opts = null, mergeOpts = null){
    super(EmployeeSchema, opts, mergeOpts);
    value.client_id = value.client_id ? value.client_id : genUID.sync(UID_LENGTH);
    this.value = value;
  }

  get isValid() {
    return this.validate(this.value);
  }
}

module.exports = Employee;
