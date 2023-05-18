const {getDAO} = require('../models/dao/mongo/index.js')


const {ticketsDao} = getDAO()


class ticketService  {

    createTicket = async ( payload)=>{
        const {code,amount,email} = payload
        const ticket = {
            code,
            purchase_datetime: new Date.now(),
            amount,
            email
        }

        const response = await ticketsDao.createTicket(ticket)
        return response
}
}

module.exports = {ticketService}