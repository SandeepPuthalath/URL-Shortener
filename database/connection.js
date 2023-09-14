const mongoose = require("mongoose")
function connectDB(){
  mongoose.connect(`mongodb://localhost/urlShortener`, {
    useNewUrlParser:true, useUnifiedTopology:true
  }).then(() =>{
    console.log("Database connect successfully")
  }).catch((err) =>{
    console.error(err)
  })
}


module.exports =  connectDB