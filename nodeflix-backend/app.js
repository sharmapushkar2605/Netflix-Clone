const express = require('express')
const app = express()
const {port} = require('./config')
const appService = require('./app.service')

appService.setupMiddleware(app)
appService.connectToDatabase()
appService.apiSetup(app)

app.listen(port, ()=>{
    console.log('app listening at',port)
})