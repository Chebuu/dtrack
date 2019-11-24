/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Schema = require('../src/schema/Schema.js');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Schema constructor', () => {
  const OBJECT_SCHEMA = { test: { type: 'string' } };
  const JSON_SCHEMA = '{ "test": { "type": "string" } }';
  const schema = new Schema(OBJECT_SCHEMA);
  it('Should instantiate with a validator property', () => {
    expect(schema.validator).to.be.an('object')
      .and.to.have.property()
  });
  it('Should validate a valid schema', () => {
    schema.validate({ test: 'TEST' }).should.be.tr
  });
})