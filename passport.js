// le role du passport-jwt c'est de verifier l'intergralité 
// du notre jeton d'access , c'est a dire , est ce que le jeton d'access
// correspond reellement a un utilisateur dans la base de d. ou bien nn 

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// importation du model (pour verifier dans la base de d. l'existance de l'utilisateur)
const User = require('./models/user');

 // c'est un module qui export une fonction
module.exports = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("bearer");
  opts.secretOrKey = "secret_key";
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              console.log('pas utilisateur avec le token')
              return done(err, false);
          }
          if (user) {
              console.log('existe un utilisateur')
              done(null, user);
          } else {
              console.log('token est modifié')
              done(null, false);
          }
      });
  }));
};