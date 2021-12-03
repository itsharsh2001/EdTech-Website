import Courses from '../models/Courses.js'
import PaidClients from '../models/paidClients.js'

export const getCourses = async (req,res)=>{
    try{

        const {type} = req.body;

        const findCourse = await Courses.find({type:type});

        if(findCourse.length==0){
            return res.status(400).json({message: 'not found'})
        }

        return res.status(200).json({message: findCourse})


    }catch(error){
      console.log(error)
    }
  }


export const getVideo= async (req,res)=>{
   try{

    const { type, title, videoName} = req.body;

    const videoCourses = await Courses.findOne({type:type,title:title})

    for(let i = 0; i<videoCourses.videos.length; i++){
      if( videoCourses.videos[i].title == videoName ){
       return res.status(200).json({message:videoCourses.videos[i]})
      }

    }


    }catch(error){
      console.log(error)
    }
}

export const checkPaidClient= async (req,res)=>{
  try{

    const email = req.user.email;
        
        const findPaidClient = await PaidClients.findOne({
          email:email,
          isPaid:true
      })

      console.log(findPaidClient)

      if(!findPaidClient){
          return res.status(200).json({message:false});
      }
      else{
          return res.status(200).json({message:true, student:findPaidClient});
      }

  }catch(error){
    console.log(error)
  }
}


export const getPaidClient = async(req,res)=>{
  try{

    const paidClient = await PaidClients.find({isPaid:true});
    
    return res.status(200).json({message:paidClient})

  }catch(error){
    console.log(error)
  }
}


export const getAllCourses = async (req,res)=>{
  try{

    const findCourse = await Courses.find({});

    return res.status(200).json({message: findCourse})

  }catch(error){
    console.log(error)
  }
}


export const getPlanDetails= async(req,res)=>{
  try{

    const {type} = req.body;

    const findCourse = await Courses.findOne({type:type});

    return res.status(200).json({message: findCourse})

  }catch(error){
    console.log(error)
  }
}


export const checkStudent = async(req,res)=>{
  try{

    const email = req.user.email;

    const {type} = req.body;

    const findPaidClient = await PaidClients.findOne({
      email:email,
      isPaid:true,
      planType:type
  })
    if(!findPaidClient){
      return res.status(200).json({message:false});
    }
  else{
      return res.status(200).json({message:true});
  }

  }catch(error){
    console.log(error)
  }
}
