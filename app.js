require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt =require('bcrypt')

const secret = `${process.env.SECRET}`
const cors = require('cors')
const routes = require('./routes/routes')

const app = express()

// config JSON response
 app.use(express.json())
 app.use(cors({
    origin: "*"
 }))

 app.use(routes)


//Models

    const User = require('./models/User')


//open route - public route

app.get('/', (req, res) => {
    res. status(200).json({ msg: 'Bem vindo a nossa API!' })
})


//private route





//credenciais

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.upntppp.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {

    app.listen(3000)
    console.log('Conectou ao banco!')
}).catch((err) => console.log(err))

