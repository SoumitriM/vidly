const Joi = require('joi');
const {Customer, validateCustomer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const url = 'mongodb://127.0.0.1:27017/vidly';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) res.status(400).send(error.details[0].message);
  let customer = new Customer({ 
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone 
    });
  customer = await customer.save();
  
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
       isGold: req.body.isGold,
       name: req.body.name,
       phone: req.body.phone
    }, 
    {
       new: true
    });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await  Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router;