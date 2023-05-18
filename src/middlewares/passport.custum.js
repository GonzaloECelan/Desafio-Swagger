const passport = require('./jtw.passport');

const passportCustom = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) {
        return next(error); // Errores especificos
      }
      if (!user) {
        return res.status(401).json({ error: info.messages ?? `${info}`})
      }
      req.user = user;
      next();
    })(req, res, next);
  }
};

module.exports = { passportCustom };