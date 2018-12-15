const mongoose = require('mongoose')


const url = 'mongodb://fullstakki:aisjfijf@ds237868.mlab.com:37868/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

// const person = new Person({
//   name: 'Testi Testi',
//   number: '044-1234567',
// })


  module.exports = Person