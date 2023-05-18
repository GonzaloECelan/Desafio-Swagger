const auth = async (req, res, next) => {
    if (await req.session.user) {
      next();
    }
    else {
      res.send('Debe registrarse para ingresar');
    }
  };
  


  module.exports = {auth};