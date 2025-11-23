const mongoose=require('mongoose')
const connectionString=process.env.DBCONNECTIONSTRING
mongoose.connect(connectionString).then(res=>{
    console.log("database connection Succesful");
    
}).catch(error=>{
console.log("db connection Failed");
console.log(error);

})
