const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const imagesRoute = require('./routes/images')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('Connected to DB')
)

app.use(express.json())

app.use(cors({exposedHeaders: ['auth-token']}))

app.use('/api/user', authRoute)
app.use('/api/images', imagesRoute)

app.listen(5000, () => console.log('server started'))