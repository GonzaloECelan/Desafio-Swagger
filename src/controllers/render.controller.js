
class Render {


    static newPassword = (req,res,next)=>{
        try {
            res.render('newPassword')
        } catch (error) {
            next(error)
        }
    }


    static resetPassword = (req,res,next)=>{
        try {
            res.render('resetPassword')
            
        } catch (error) {
            next(error)
        }
    }

    static loginRender = (req,res,next)=>{
        try {
            res.render('login')

        } catch (error) {
            next(error)
        }

    }

    static registerRender = (req,res,next)=>{
        try {
            res.render('register')

        } catch (error) {
            next(error)
        }

    }
}

module.exports = {Render}