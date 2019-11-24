// https://json-schema.org/understanding-json-schema/reference/regular_expressions.html

'use strict';

const Ajv = require('ajv');
const mergeSchemas = require('json-schema-merge-allof');

const isString = (object) => {
  return typeof object === 'string' ||
    object instanceof String;
};

const isJSON = (object) => {
  if (!isString(object)) { return false; }
  try { return !!JSON.parse(object); }
  catch (error) { return false; }
};

const compileSafe = (schema, validator) => {
  try { return validator.compile(schema); }
  catch (error) { return validator; }
};

module.exports = class Schema {
  constructor(schema, opts = null, mergeOpts = null) {
    const validator = new Ajv(opts);
    this.validator = compileSafe(schema, validator);
    this.mergeOpts = mergeOpts;
    this.opts = opts;
  }

  _isValidJSON(string) {
    const object = JSON.parse(string);
    return this.isValid(object);
  }

  _isValidObject(schema) {
    return this.isValid(schema);
  }

  _isValid(object) {
    return !this.validator.validate(object) ||
      !!this.validator.errors;
  }

  validate(object) {
    return isJSON(object) ?
      this._isValidJSON(object) :
      this._isValidObject(object);
  }

  setSchema(schema) {
    const validator = new Ajv(this.opts);
    const sobject = isJSON(schema) ? JSON.parse(schema) : schema;
    this.validator = compileSafe(validator, sobject);
    return this.validator;
  }

  addSchema() {
    // TODO::
    // Also, add params to validate() to validate by schema identifier
  }

  getSchema(identifier = null) {
    return this.validator.getSchema(identifier);
  }

  mergeWith(allOf, mergeOpts = this.mergeOpts) {
    // TODO::
    // Param mergeOpts not used
    const parent = this.getSchema();
    parent.allOf = Array.isArray(allOf) ? allOf : [allOf];
    const merged = mergeSchemas(parent);
    return this.setSchema(merged);
  }
};
