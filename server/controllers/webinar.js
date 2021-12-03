import MeetLiveWebinar from '../models/meetWebinar.js'
import WebisteLiveWebinar from '../models/websiteWebinar.js'
import RecordedWebinar from '../models/RecordedWebinar.js'
import AWS from 'aws-sdk'
const awsConfig = {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
  }
  const S3 = new AWS.S3(awsConfig)

export const getEmail = async(req,res)=>{
    try{

        const email = req.user.email;

        if(!email){
            return res.status(400).json({message:'not authenticated'})
        }

        const findUser = await User.findOne({email: email});

        findUser.password = undefined;

        return res.status(200).json({message:findUser, email:findUser.email})

    }catch(error){
        console.log(error)
    }
}

export const getWebinar = async (req,res)=>{
    try{

        const meetWebinar = await MeetLiveWebinar.findOne({index:0})

        const websiteWebinar = await WebisteLiveWebinar.findOne({index:0});

        if(!meetWebinar && !websiteWebinar){
            return res.status(200).json({webinar: false, meetwebinarStatus:'', websiteWeb:false, meetWeb:false,websiteWebinarStatus:''});
        }

        if(!websiteWebinar){
            return res.status(200).json({webinar: true, websiteWeb:false,meetWeb:true, meetwebinarStatus:meetWebinar,websiteWebinarStatus:''});
        }

        if(!meetWebinar){
            return res.status(200).json({webinar: true, websiteWeb:true,meetWeb:false, meetwebinarStatus:'',websiteWebinarStatus:websiteWebinar});
        }

        return res.status(200).json({webinar : true, websiteWeb:true, meetWeb:true, meetwebinarStatus: meetWebinar, websiteWebinarStatus:websiteWebinar})
 
    }catch(error){
        console.log(error)
    }
}


export const deleteMeetWebinar = async(req,res)=>{
    try{

        const webinar = await MeetLiveWebinar.findOne({index:0})  
        const params = {
            Bucket: 'souravclient',
            Key: webinar.thumbnailKey
          }
      
          S3.deleteObject(params, async (err, data) => {
            if (err) {
              console.log(err);
              res.sendStatus(400);
            }
      
          })
      
          await MeetLiveWebinar.deleteOne({ index: 0 });
      
          return res.status(200).json({ message: 'deleted' })   

    }catch(error){
        console.log(error)
    }
}

export const deleteWebsiteWebinar = async(req,res)=>{
    try{

        const webinar = await WebisteLiveWebinar.findOne({index:0})  
    
        const params = {
            Bucket: 'souravclient',
            Key: webinar.thumbnailKey
          }
      
          S3.deleteObject(params, async (err, data) => {
            if (err) {
              console.log(err);
              res.sendStatus(400);
            }
      
          })
      
          await WebisteLiveWebinar.deleteOne({ index: 0 });
      
          return res.status(200).json({ message: 'deleted' })   

    }catch(error){
        console.log(error)
    }
}


export const getFinalWEbinar = async(req,res)=>{
    try{

        const websiteWebinar = await WebisteLiveWebinar.findOne({index:0});

        if(!websiteWebinar){
            const meetWebinar = await MeetLiveWebinar.findOne({index:0});

            if(!meetWebinar){
                return res.status(200).json({message:false, webinar:null, meet:false, web:false})
            }

            return res.status(200).json({message:true, meet:true, webinar:meetWebinar, web:false})

        }

        
            return res.status(200).json({message:true,meet:false, webinar:websiteWebinar, web:true})

    }catch(error){
        console.log(error)
    }
}

export const getRecordedWebinars= async (req,res)=>{
    try{

        const webinar = await RecordedWebinar.find({});
        console.log(webinar)
        res.status(200).json({message:webinar});


    }catch(error){
        console.log(error)
    }
}


export const particularWebinar = async(req,res)=>{
    try{

        const {title} = req.body;
 
        const webinar = await RecordedWebinar.findOne({title:title});
        console.log(webinar)
        res.status(200).json({webinar:webinar});

    }catch(error){
        console.log(error)
    }
}


export const deleteWebinar = async(req,res) => {
    try{

        const {title} = req.body;
        const webinar = await RecordedWebinar.findOne({title:title});

        
        const params = {
            Bucket: 'souravclient',
            Key: webinar.key
          }
      
          S3.deleteObject(params, async (err, data) => {
            if (err) {
              console.log(err);
              res.sendStatus(400);
            }
      
          })

          const params2 = {
            Bucket: 'souravclient',
            Key: webinar.captionKey
          }

          S3.deleteObject(params2, async (err, data) => {
            if (err) {
              console.log(err);
              res.sendStatus(400);
            }
      
          })
      

          await RecordedWebinar.deleteOne({title:title});


           return res.status(200).json({message:'done'})

    }catch(error){
        console.log(error)
    }
}