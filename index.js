const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person=require('./models/mongo')

app.use(cors())

app.use(bodyParser.json())

let persons = [

]
app.use(express.static('build'))

app.get('/',(req, res) => {
  res.sendfile(__dirname + '/build/index.html');
}); 
  
app.get('/info', (req, res) => {
  res.send('<div>puhelinluettelossa '+persons.length.toString()+' henkilon tiedot<div>')
})

  app.get('/api/persons', (req, res) => {
      Person
      .find({})
      .then(persons=>{
    res.json(persons)
      })
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(request.params.id)
    .then(person =>
        {
            if ( person ) {
                response.json(person)
              } else {
                response.status(404).end()
              }
        }
        )
        .catch(error => {
            console.log(error)
        })
  
 
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
Person.remove({id:id},function(err){
if (!err)
{
    response.status(204).end()
}
else
{
    return response.status(400).json({error: 'poistaminen ei onnistunut'})
}
    })
    .catch(error => {
        console.log(error)
    })
    
  
    
  })

  const generateId = () => {
  
    return Math.floor(Math.random() * Math.floor(999999));
  }
  

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  if (body.name === undefined) {
    return response.status(400).json({error: 'Nimi puuttuu'})
  }

  if (body.number === undefined) {
    return response.status(400).json({error: 'Puhelinnumero puuttuu'})
  }

  let listallajo=persons.filter(person => person.name === body.name)

  if (listallajo.length>0){
    return response.status(400).json({error: 'Nimi pitää olla yksilöllinen'})
  }

  const person = new Person({
    name: body.name,
    number:body.number,
    id: generateId()
  })

  person
.save()
.then(savedPerson=>{
    persons = persons.concat(savedPerson)

    response.json(savedPerson)
}
    )
    .catch(error => {
        console.log(error)
    })
})

const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(morgan)

app.use(error)
  const PORT = process.env.PORT || 3001



  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

