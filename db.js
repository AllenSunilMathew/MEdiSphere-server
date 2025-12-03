const mongoose=require('mongoose')
// const connectionString=process.env.DBCONNECTIONSTRING
mongoose.connect(process.env.DBCONNECTIONSTRING)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


})
