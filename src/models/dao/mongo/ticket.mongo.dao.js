const {ticketModel} = require('../../schemas/ticket.model.js')


class ticketDao {

    createTicket = async (payload)=>{
const response = await ticketModel.create(payload)
return response
    }

    getTicket = async (id) =>{
        const response = await ticketModel.findById(id)
        return response
    }

}

module.exports = {ticketDao}