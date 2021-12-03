import Query from '../models/query.js'
import Signal from '../models/Signal.js'

var emailRegex =
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const querySubmit = async (req,res)=>{
    try{
        const {name, email, query, phone} = req.body;

        if(!name || !email || !query || !phone){
            return res.status(400).json({message:'Fill all the Fields'})
        }

        if(name.length < 3){
            return res.status(400).json({message:'Enter Valid Name'})
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({message:'Enter Valid Email'})
        }

        if(phone.length != 10){
            return res.status(400).json({message:'Enter Valid Phone Number'})
        }

        var currentdate = new Date();
        var date = currentdate.getDay() + "/" + currentdate.getMonth() 
        + "/" + currentdate.getFullYear() + " @ " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        const queryDB = new Query({
            name,
            date,
            email,
            phone,
            query
        })

        await queryDB.save();

        return res.status(200).json({message:`You'll receive a call or mail soon.`})

    }catch(error){
        console.log(error)
    }
}


export const getSignal = async (req,res)=>{
    try{

      const signal = await Signal.findOne({index:0});
      return res.status(200).json({message:signal})

    }catch(error){
      console.log(error)
    }
  }
