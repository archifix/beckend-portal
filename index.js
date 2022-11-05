import express from "express";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";

import {registerValidation} from './validations.js'

mongoose.connect(
  'mongodb://localhost:27017/',
).then(() => {
  console.log('DB OK')
});

const app = express();

app.use(express.json());

app.post('/register', registerValidation, (req, res) => {
  
})

app.get('/', (req, res) => {
  res.send('Hello Wolrd');
})

app.listen(3030, (err) =>{
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});