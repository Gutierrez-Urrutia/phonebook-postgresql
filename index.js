require('dotenv').config();
const express = require('express');
const Person = require('./models/person');
const { connectToDatabase } = require('./models/db');
const app = express();
app.use(express.json());
app.use(express.static('dist'));

(async () =>{
    await connectToDatabase();
    await Person.sync({alter: true});
})();

app.get('/', (request, response) =>{
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons/', async (request, response) => {
   const persons = await Person.findAll();
   response.json(persons);  
});


app.get('/api/persons/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const person = await Person.findByPk(id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).send({ error: 'Person not found' });
    };
});

app.delete('/api/persons/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    await Person.destroy({ 
        where: { 
            id: id 
        } 
    });
    response.status(204).end();
});

app.post('/api/persons', async (request, response) => {
    const { name, number } = request.body;
    if (!name || !number) {
        return response.status(400).json({ error: 'Name or number is missing' });
    }
    
    try{
        const newPerson = await Person.create({ name, number });
        response.status(201).json(newPerson);
    } catch (error){
        response.status(500).json({ error: error.message });
    };
});

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});