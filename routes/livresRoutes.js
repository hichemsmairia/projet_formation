const express = require('express')
const Livre = require('../models/livre')
const router =  express.Router()
const passport = require('passport')
require('../passport')(passport)

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) { // [JWT,fe4545efsfsfs.sfsfsf.sfsofhso]
        console.log(parted[1]) // fe4545efsfsfs.sfsfsf.sfsofhso
 
        return parted[1]; // ? return vers quoi ? on va conditionné sur le return
      } else {
        return null;
      }
    } else {
      return null;
    }      
};

router.post('/creer_livre',passport.authenticate('jwt', { session: false}),(req,res)=>{ // on sais que le token existe deja dans les routes
   const token = getToken(req.headers)
   if(token) {
     const data = {
        author:req.body.author,
        publisher:req.body.publisher,
        price:req.body.price,
        quantity:req.body.quantity  
    }

const new_book = new Livre(data)
new_book.save()
res.send('livre ajouté avec succes')  
   }   
    
   else {
    return res.status(403).send({success: false, msg: 'vous n '/ 'ete pas authorisé a ajouté des livres '});

   }


})

router.get('/voir_livres',passport.authenticate('jwt', { session: false}),(req,res)=>{
    const token = getToken(req.headers)
    if(token) {
        Livre.find({}).exec().then(result=>{
            res.send(result)
        })  
    } else {
        return res.status(403).send({success: false, msg: 'vous n '/ 'ete pas authorisé a voir des livres '});

    }

})

router.get('/voir_livre/:id',(req,res)=>{ 
    Livre.find({_id:req.params.id}).exec().then(result=>{
        res.send(result)
       
       
    })
})

router.delete('/supprimer_un_livre/:id',(req,res)=>{
    Livre.deleteOne({_id:req.params.id}).exec().then(result=>{
        res.send('livre supprimé avec succes')
    })
})


router.put('/maj_un_livre/:id',(req,res)=>{

    //le console.log c'est pour tester
    
    console.log(req.body.author)
    console.log(req.params.id)
    console.log(req.body.publisher)
    console.log(req.body.price)
    console.log(req.body.quantity)




    Livre.updateOne({_id:req.params.id},{$set:{
        author:req.body.author,
        publisher:req.body.publisher,
        price:req.body.price,
        quantity:req.body.quantity}}).exec()
    .then(resultat=>{
        res.send('le livre a ete mis a jour')
    })
})




module.exports = router