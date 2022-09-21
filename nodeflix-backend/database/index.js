const mongoose = require('mongoose')

const connectToDatabase = (MONGO_URI)=>{
    mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('Database connected')
})
.catch(()=>{
    console.log('Connection failed')
})
}
module.exports = {
    connectToDatabase
}