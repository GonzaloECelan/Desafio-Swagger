const dotenv = require('dotenv');

dotenv.config({
    path:'./.env'
});



const ENV_CONFIG = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  SESSION_KEY: process.env.SESSION_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  PERSISTENCE: process.env.PERSISTENCE,
  EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER,
  PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER


}
 

module.exports = {ENV_CONFIG}