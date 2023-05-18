class productDTO{

    constructor(payload){
        this.title = payload.title,
        this.description = payload.description,
        this.price = payload.price,
        this.code = payload.code,
        this.stock = payload.stock,
        this.category = payload.category

    }
}
module.exports = {productDTO}