import express from "express";
import cors from "cors";
import fs from 'fs'
import mongoose from 'mongoose';
const morgan = require("morgan");
require('dotenv').config();
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
const csrfProtection = csrf({cookie: true})


// create express app
const app = express();

//db
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("DB CONNECTED")).catch((err)=> console.log('DB CONNECTION ERR =>',err))

// apply middleware
app.use(cors());
app.use(express.json({ extended: false, limit: '2gb' }))
app.use(express.urlencoded({ limit: '2gb', extended: false, parameterLimit: 50000 }))
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());


// route
fs.readdirSync('./routes').map( (route)=> app.use('/api', require(`./routes/${route}`)))


// csrf
app.use(csrfProtection)
app.get('/api/csrf-token',(req,res) =>{
    res.json({csrfToken: req.csrfToken() })
})

// port 
const port = process.env.PORT;  
 
app.listen(port, ()=> console.log(`Server is running on port ${port}`))

