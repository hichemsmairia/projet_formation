const express = require('express')
const router = express.Router()
const User = require ('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/login',(req,res)=>{
    User.find({email:req.body.email}).exec().then(user=>{
       if(user.length<1) {
        res.status(401).send({message:'addresse email n existe pas'})
       } else {
          bcrypt.compare(req.body.password,user[0].password,(err,result)=>{ //req.body.password est en plein text
              if(result) {    
              const token = jwt.sign(user[0].toJSON(),'secret_key')                                                     
                  res.json({
                      message:"bienvenue",
                      token : 'JWT ' + token
                  })
              } else {
                res.status(505).send({message:'email et mot de passe sont incorrecte '})
              } }) 

       }
    })

    })

router.post('/register',(req,res)=>{  
User.find({email:req.body.email}).exec().then(user=>{
    if(user.length>=1){
        res.status(505).send({message:'addresse email deja utilisé'})
    } else { //bcrypt : c'est un package pour hasher notre mot de passe 

    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) {
            return(err)  
        } else {
            const new_user = new User ({
                email:req.body.email,
                password:hash
            })
            new_user.save()
            res.send('ajouté avec succes')
        }
    })     }
})  })


module.exports = router