const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('customer', new mongoose.Schema({
    isGold: Boolean,
    phone: String,
    name: {
      type: String,
      required: true,
      minlength: 5
    }
}));

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.Customer = Customer;
  exports.validateCustomer = validateCustomer;
