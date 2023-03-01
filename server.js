const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db.js');

dotenv.config({ path: './config/config.env' });
const bootcamps = require('./routes/bootcamps');

connectDB();

const app = express();

//body parser
app.use(express.json());

//Dev loggin middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`) 
);

process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`);
    server.close( () => process.exit(1) )
})