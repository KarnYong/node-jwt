const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
require('./db/db')
 
const app = express()
 
var cors = require('cors')
app.use(cors())
 
app.use(express.json())
app.use(userRouter)
 
app.listen(port, () => {
    console.log('Server running on port ' + port)
})
