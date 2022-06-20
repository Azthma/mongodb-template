require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

Promise = require('bluebird');

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true })

const db = mongoose.connection
db.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

const consign = require('consign');

app.use(express.json())

consign().include('./routes')
    .into(app);

app.listen(port, function() {
    console.log('listening at port ' + port);
});