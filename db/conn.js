const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/loginforms',{
    useNewUrlParser:true
})
var db=mongoose.connection;

db.once('open',function(){
    console.log('db conncted');
})
