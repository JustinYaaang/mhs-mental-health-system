//Set up default mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://178.128.34.125/mht';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;
