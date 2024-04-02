const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const [password, name, number] = process.argv.slice(2);

// not using MongoDB Atlas, but a docker image launched via `./mongo-db.sh`
const url =
    `mongodb://fullstack:${password}@localhost/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (name && number) {

    new Person({
        name,
        number
    }).save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });

} else {
    console.log('phonebook:');
    Person.find({}).then(peeps => {

        peeps.forEach(({ name, number }) =>
            console.log(`${name} ${number}`));

        mongoose.connection.close();
    });
}
