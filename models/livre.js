const mongoose = require('mongoose')

const livreSchema = new mongoose.Schema({
    author:String,
    publisher:String,
    price:Number,
    quantity:Number
})

const Livre = mongoose.model('livre',livreSchema)

module.exports = Livre

// le shema est pour decrire de quoi on y est besoin exactement 


// j'ai creer un model pour stocker les differents variables 


//embded tree 
/*

const Voiture = new mongoose.Schema({
    marque:string ,
    date_du_sortie : Number ,
    pays_de_distrubution : [
        _id: // c'est l'id d'un autre document dans une autre collection elle peu contenir l'id du takoua 
    ]
})


*/
