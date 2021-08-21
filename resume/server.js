const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const log =console.log;

const port = process.env.PORT||5000;
//static folder
app.use(express.static('public'));
// static folder end//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
mongoose.connect('mongodb://localhost:27017/mydb',{
    useUnifiedTopology: true ,
    useNewUrlParser: true

});
const db =mongoose.connection;
db.on('error',()=>log('error connecting to database'));
db.once('open',() =>log('connected to database'));

app.get('/contact',(req, res)=>{

    var name = req.body.name;
    var phone = req.body.phone;
    var  email = req.body.email;
    var subject =req.body.subject;
    var message = req.body.message;

    var data ={
        "name": name,
        "phone": phone,
        "email": email,
        "subject": subject,
        "message": message,
    }
    db.collection('users').insertOne(data,(err, collection)=>{
        if(err){
            throw error
        }else{
            log('Record inserted successfully');
        }
    });
   return res.redirect('signUp_success.html');
});

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-orgin": '*'
    })
    return res.redirect('/index.html');
})
app.listen(port, ()=>{
log('Server is listening on port ' + port);
})

// Schema Creation.
const ContactSchema =mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
});


const  Contact = module.exports=mongoose.model('users', ContactSchema);
