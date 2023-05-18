const winston = require('winston')

const levelsOption = {
    levels:{
        fatal: 0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    }
}
const logger = winston.createLogger({

    transports:[
        new winston.transports.Console({level:'http'}),
        new winston.transports.File({filename:'./error.log',level:'warning'})
    ],
    levels:levelsOption.levels
})


const addLogger = (req,res,next)=>{
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}  `)
    next()
}


module.exports = {addLogger}