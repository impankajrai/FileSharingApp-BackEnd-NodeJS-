require("dotenv").config();
const mongoose=require("mongoose");

function connectDB(){
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
mongoose.connect(process.env.CONSTRING,connectionParams)
  .then( () => {
      console.log('Connected to database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
  })
}
module.exports=connectDB;