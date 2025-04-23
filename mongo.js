const mongoose = require('mongoose');
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://pagutierrezu:${password}@cluster0.ljbijf7.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Person = mongoose.model('Person', personSchema);



if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save().then(() => {
        console.log('person saved!');
        mongoose.connection.close();
    });

} else {
    console.log('phonebook: ');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
}



