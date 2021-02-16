const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes')
const livresRouter = require('./routes/livresRoutes')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// le cors ici permet de ne pas blocker les requetes de axios 
//parceque axios contact un service exterieure au front end (express)

mongoose.connect("mongodb+srv://hichemsmairia:hichemsmairia@cluster0.oimg4.mongodb.net/<dbname>?retryWrites=true&w=majority",{useUnifiedTopology: true,useNewUrlParser: true})
.then(()=>console.log("base de donneés connecté"))

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use('/api/livres',livresRouter)
app.use('/api/auth',authRouter)

app.listen(5000,console.log("serveur en marche"))