import  Express  from "express"; 
import cors from 'cors'; 
import dotev from "dotenv";
import mongoose  from "mongoose";
import bodyParser from "body-parser";

import event_rout from "./routes/event_route.js"
import creatError from 'http-errors';
const app = Express();
dotev.config();


mongoose.Promise = global.Promise; 


mongoose.connect(process.env.MONGO,{
useNewUrlParser  :true

}).then(()=>{
    console.log("database connection is successfully");
},
error=>{
    console.log("not connected" + error);

})


app.use(bodyParser.json({limit:"30mb" ,extended: "true"}));
app.use(bodyParser.urlencoded({limit:"30mb" ,extended: "true"}));

app.use(cors());


app.use('/newuser', event_rout); 

const port = process.env.port || 4000; 

const server = app.listen(port , ()=>{
    console.log("port connection succesfully " + port);
})

app.use((req, res , next)=>{
    next(creatError(404));
})

app.get('/', (req, res)=>{
    res.send('invalid ');
})

//error handling 

app.use(function (err, req, res, next){
    if(!err.statusCode ) err.statusCode =500; 
    res.status(err.statusCode).send(err.message);
})