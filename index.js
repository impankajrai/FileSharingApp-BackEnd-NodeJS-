require("dotenv").config();
var cors = require('cors')
const path=require('path');
const express=require("express");
const app=express();
const PORT =process.env.PORT||3000;
const connect=require("./config/dbConfig");
app.use(express.json());

connect();
app.use(cors());

//ejs connection
app.use(express.static('public'));    //static file location like css html
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//routes
app.use("/api/files",require("./routes/files"));
app.use('/files',require('./routes/downloadURL'))
app.use('/files/download', require('./routes/downloadPage'));

app.listen(PORT,()=>console.log(`server listning at port ${PORT}`));