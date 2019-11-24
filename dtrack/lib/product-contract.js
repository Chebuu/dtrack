/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

const Employee = require('../model/Employee');
const Product = require('../model/Product');
const Client = require('../model/Client');
const Order = require('../model/Order');

class ProductContract extends Contract {

  async productExists(ctx, productId) {
    const buffer = await ctx.stub.getState(productId);
    return (!!buffer && buffer.length > 0);
  }

  async createProduct(ctx, value) {
    const product = new Product(value);
    if(!product.isValid){
      return {
        success: false,
        message: 'The values entered do not yield a valid product'
      };
    }
    const productId = product.value.product_id;
    const exists = await this.productExists(ctx, productId);
    if (exists) {
      return {
        success: false,
        message: `A product with product_id: ${productId} already exists.`
      };
    }
    const asset = product.value;
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(productId, buffer);
    return {
      success: true,
      message: 'Success'
    };
  }

  async readProduct(ctx, productId) {
    const exists = await this.productExists(ctx, productId);
    if (!exists) {
      throw new Error(`The product ${productId} does not exist`);
    }
    const buffer = await ctx.stub.getState(productId);
    const asset = JSON.parse(buffer.toString());
    return asset;
  }

  async updateProduct(ctx, productId, newValue) {
    const exists = await this.productExists(ctx, productId);
    if (!exists) {
      throw new Error(`The product ${productId} does not exist`);
    }
    const asset = { value: newValue };
    const buffer = Buffer.from(JSON.stringify(asset));
    await ctx.stub.putState(productId, buffer);
  }

  async deleteProduct(ctx, productId) {
    const exists = await this.productExists(ctx, productId);
    if (!exists) {
      throw new Error(`The product ${productId} does not exist`);
    }
    await ctx.stub.deleteState(productId);
  }

  async registerClient(ctx, value) {
    const data = await ctx.stub.getState('clients');
    if (!data) {
      return {
        success: false,
        message: 'Clients not found'
      };
    }

    const client = new Client(value);
    if(!client.isValid){
      return {
        success: false,
        message: 'The values entered do not yield a valid product'
      };
    }

    const clientId = client.client_id;
    const clientJSON = client.toJSON();
    await ctx.stub.putState(clientId, Buffer.from(clientJSON));

    const clientData = JSON.parse(data.toString());
    const clientDataJSON = JSON.stringify([ clientId, ...clientData ]);
    await ctx.stub.putState('clients', Buffer.from(clientDataJSON));

    return {
      success: true,
      message: `Client added successfully with client_id ${ clientId }`
    };
  }

  async registerEmployee(ctx, value) {
    const data = await ctx.stub.getState('employees');
    if (!data) {
      return {
        success: false,
        message: 'Employees not found'
      };
    }

    const employee = new Employee(value);
    if(!employee.isValid){
      return {
        success: false,
        message: 'The values entered do not yield a valid employee'
      };
    }

    const employeeId = employee.employee_id;
    const employeeJSON = employee.toJSON();
    await ctx.stub.putState(employeeId, Buffer.from(employeeJSON));

    const employeeData = JSON.parse(data.toString());
    const employeeDataJSON = JSON.stringify([ employeeId, ...employeeData ]);
    await ctx.stub.putState('employees', Buffer.from(employeeDataJSON));

    return {
      success: true,
      message: `Employee added successfully with employee_id ${ employeeId }`
    };
  }

  async createOrder(ctx, value) {

    const order = new Order(value);
    if(!order.isValid){
      return {
        success: false,
        message: 'The values entered do not yield a valid order'
      };
    }

    const orderId = order.value.order_id;
    const exists = await this.productExists(orderId);
    if(exists){
      return {
        success: false,
        message: 'An order with that order_id already exists'
      };
    }

    const clientId = order.value.client_id;
    const clientData = await ctx.stub.getState(clientId);
    if (!clientData) {
      return {
        success: false,
        message: 'Client not found'
      };
    }

    const client = JSON.parse(clientData.toString());
    client.orders.push(orderId);
    await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(client)));
    await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order.value)));
    return {
      success: true,
      message: `Order created successfully with orderId ${orderId}`
    };
  }
}

module.exports = ProductContract;