import expressjwt from 'express-jwt'
import User from '../models/user'

export const requireSignIn = expressjwt({
    getToken: (req,res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms : ['HS256']
})

export const isInstructor = async (req,res,next) => {
    try{
        const user = await User.findOne({email:req.user.email});
        if(!user.instructor){
            return res.status(403).json({message:'isInstructor failed'});
        }else{
            next();
        }

    }catch(error){
        console.log(error)
    }
}
