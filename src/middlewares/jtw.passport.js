const {cookieExtractor} = require('../utils/utils')
const {SECRET_KEY} = require('../constants/constants')
const jwtPassport = require('passport-jwt');
const passport = require('passport');



const JwtStrategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

passport.use(new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: SECRET_KEY,
    },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      }
      catch(error) {
        return done(error);
      }
    }
  ));
  

  module.exports = passport;