
class userDTO{

    constructor(payload){
        this.first_name = payload.first_name,
        this.last_name = payload.last_name,
        this.age = payload.age,
        this.email = payload.email,
        this.password = payload.password

    }
}


module.exports = {userDTO}