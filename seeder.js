const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env'});

// Load models
const Bootcamp =require('./models/Bootcamp');

//mongo connect
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewURLPARSER: true,
});

// Read Json files
const bootcamp = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

//import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamp);
        console.log('Data Imported...'.green.inverse);
        process.exit();

    }catch (err){
        console.log(err);
    }
}

const deleteData = async() => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit();

    }catch (err){
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d'){
    deleteData();
}