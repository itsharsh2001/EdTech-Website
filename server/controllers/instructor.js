import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth";
import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'
import fs from 'fs'
import Query from '../models/query.js'
import Signal from '../models/Signal.js'
import Courses from '../models/Courses.js'
import Webinar from '../models/RecordedWebinar.js'
import MeetLiveWebinar from '../models/meetWebinar.js'
import WebisteLiveWebinar from '../models/websiteWebinar.js'

var emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const checkInstructor = async (req, res) => {
  try {

    const email = req.user.email;
    if (!email) {
      return res.status(200).json({ instructor: false })
    }

    const check = await User.findOne({ email: email })

    if (check.instructor) {
      return res.status(200).json({ instructor: true })
    } else {
      return res.status(200).json({ instructor: false })
    }

  } catch (error) {
    console.log(error)
  }
}


export const currentInstructor = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select('-password').exec();
    if (!user.instructor) {
      return res.sendStatus(403)
    } else {
      return res.status(200).json({ message: true })
    }
  } catch (err) {
    console.log(err)
  }
}

export const changePassword = async (req, res) => {
  const { password, confirmPassword, currentPassword } = req.body;

  if (!password || !confirmPassword || !currentPassword) {
    return res.status(400).json({ message: 'Fill all the Fields' })
  }

  if (password != confirmPassword) {
    return res.status(400).json({ message: 'Password are not matching' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Enter Password of atleast 6 characters' })
  }

  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return res.status(400).json({ message: 'something went wrong! Please Login Again' })
  } else {

    const passwordMatch = await comparePassword(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Your current password is Wrong' })
    } else {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      user.save();
    }

    return res.status(200).json({ message: 'Password Updated' });

  }


}


export const changeEmail = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please Enter Email" })
    }

    if(!emailRegex.test(email)){
      return res.status(400).json({ message: "Please Enter Valid Email" })
    }

    const findEmail = await User.findOne({ email: email });

    if (findEmail) {
      return res.status(400).json({ message: "This Email Already Exist" })
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).json({ message: 'something went wrong! Please Login Again' })
    } else {

      user.email = email;
      user.save();

      res.clearCookie("token");

      return res.status(200).json({ message: 'Email Updated' });

    }
  } catch (err) {
    console.log(err)
  }
}

export const addSignal = async (req, res) => {
  try {
    const { filename } = req.files;

    if (!filename) {
      return res.status(400).json({ message: 'Add Inputs' })
    }

    const params = {
      Bucket: 'souravclient',
      Key: `${nanoid()}.${filename.type.split('/')[1]}`,
      Body: fs.readFileSync(filename.path),
      ACL: 'public-read',
      ContentType: filename.type,
    }

    // upload to s3
    S3.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'error' })
      }

      const findSignal = await Signal.findOne({ index: 0 });

      if (findSignal) {

        const params = {
          Bucket: 'souravclient',
          Key: findSignal.key
        }

        S3.deleteObject(params, async (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          }

        })


        findSignal.signalFile = data.Location,
          findSignal.key = data.key

        await findSignal.save();

      } else {

        const addSignalPdf = new Signal({
          signalFile: data.Location,
          key: data.key,
          index: 0
        })

        await addSignalPdf.save();
      }




      return res.status(200).json({ message: data })
    })
  } catch (err) {
    console.log(err)
  }
}

export const addVideos = async (req, res) => {

  try {

    const { video } = req.files;

    if (!video) {
      return res.status(400).json({ message: 'Please Upload Video' })
    }

    const params = {
      Bucket: 'souravclient',
      Key: `${nanoid()}.${video.type.split('/')[1]}`,
      Body: fs.readFileSync(video.path),
      ACL: 'public-read',
      ContentType: video.type,
    }


    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'error' })
      }
      return res.status(200).json({ link: data.Location, key : data.key })
      
    })
  } catch (error) {
    console.log(error)
  }

}
const awsConfig = {
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
}
const S3 = new AWS.S3(awsConfig)

export const addVideoRelatedInputs = async (req, res) => {

  try {

    const { title, description, image, video, playlist, isFree, pdfFile, caption, pdfKey, captionKey } = req.body;
    if (!title || !description || !image || !video || !playlist || !pdfFile) {
      return res.status(400).json({ message: 'Fill all Inputs' })
    }

    // we are removing extra part in image
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // we are getting jpeg
    const type = image.split(';')[0].split('/')[1];

    // image params
    const params = {
      Bucket: 'souravclient',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      contentEncoding: 'base64',
      ContentType: `/image/${type}`
    }


    // upload to S3
    S3.upload(params, async (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ message: 'error' })
      }

      const findPlaylist = await Courses.findOne({ title: playlist });

      findPlaylist.videos.push({
        file: video,
        title: title,
        description: description,
        thumbnail: data.Location,
        isFree: isFree,
        playlist: findPlaylist.title,
        notes:pdfFile,
        caption,
        key:data.key,
        pdfKey,
        captionKey
      })

      await findPlaylist.save()


      res.status(200).json({ message: 'video added' })
    })
  } catch (error) {
    console.log(error)
  }

}


export const getPlaylist = async (req, res) => {
  try {

    const playList = await Courses.find({});
    res.status(200).json({ message: playList })

  } catch (error) {
    console.log(error)
  }
}

export const deleteSignal = async (req, res) => {
  try {

    const signal = await Signal.findOne({ index: 0 });

    const params = {
      Bucket: 'souravclient',
      Key: signal.key
    }

    S3.deleteObject(params, async (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }

    })

    await Signal.deleteOne({ index: 0 });

    return res.status(200).json({ message: 'deleted' })

  } catch (error) {
    console.log(error)
  }
}


export const getQueries = async (req, res) => {
  try {

    const queries = await Query.find({});

    return res.status(200).json({ message: queries })

  } catch (error) {
    console.log(error)
  }
}

export const addSignalTitle = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Enter Title" });
  }

  const findSignal = await Signal.findOne({ index: 0 });

  if (!findSignal) {
    return res.status(400).json({ message: "Upload Signal First" })
  }

  findSignal.signalHeading = title;

  findSignal.save();

  res.status(200).json({ message: 'submitted' })
}

export const createPlaylist = async (req, res) => {

  try {

    const { title, description, coursePrice, isFree, type } = req.body;

    if (!title || !coursePrice || !type) {
      return res.status(400).json({ message: 'Fill all The Fields' })
    }

    const findtitle = await Courses.findOne({ title: title });

    if (findtitle) {
      return res.status(400).json({ message: "playlist already exist" })
    }

    const course = new Courses({
      title,
      description,
      coursePrice,
      isFree,
      type
    })

    await course.save();

    return res.status(200).json({ message: 'Playlist Submitted' })

  } catch (error) {
    console.log(error)
  }

}


export const preRecordedWebinar = async (req, res) => {
  try {
    
    const { title, description, caption, image, video, videoKey, captionKey} = req.body;

    console.log(videoKey, captionKey)


    if(!title || !image || !video){
      return res.status(400).json({message:'Fill all the Inputs'})
    }


    // we are removing extra part in image
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // we are getting jpeg
    const type = image.split(';')[0].split('/')[1];

    // image params
    const paramsOfImage = {
      Bucket: 'souravclient',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      contentEncoding: 'base64',
      ContentType: `/image/${type}`
    }

    // upload to S3
    S3.upload(paramsOfImage, async (err, data) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ message: 'error' })
      }

     
      const addWebinar = new Webinar({
        title:title,
        Description : description,
        caption: caption,
        thumbnail:data.Location,
        video:video,
        key:data.key,
        videoKey,
        captionKey
      })

      await addWebinar.save();

      return res.status(200).json({message:'webinar Saved SuccesssFully'})

    })

  } catch (error) {
    console.log(error)
  }
}


export const meetWebinar= async (req,res)=>{
  try{

    const {title, Description, googleMeetLink, image} = req.body;

    if(!title || !Description || !googleMeetLink || !image){
      return res.status(400).json({message:'Fill All The Fields'});
    }
    
    
    const findWebinar = await MeetLiveWebinar.findOne({index:0});
    if(findWebinar){
      return res.status(400).json({message:'Please Delete Previous Meet Webinar'})
    }

    const findWebWebinar = await WebisteLiveWebinar.findOne({index:0});

    if(findWebWebinar){
      return res.status(400).json({message:'Please Delete Previous Website Webinar'})
    }
    
     // we are removing extra part in image
     const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

     // we are getting jpeg
     const type = image.split(';')[0].split('/')[1];
 
     // image params
     const paramsOfImage = {
       Bucket: 'souravclient',
       Key: `${nanoid()}.${type}`,
       Body: base64Data,
       ACL: 'public-read',
       contentEncoding: 'base64',
       ContentType: `/image/${type}`
     }
 
     // upload to S3
     S3.upload(paramsOfImage, async (err, data) => {
       if (err) {
         console.log(err)
         return res.status(400).json({ message: 'error' })
       }
 
       const liveWebinar = new MeetLiveWebinar({
        title:title,
        Description:Description,
        googleMeetLink:googleMeetLink,
        thumbnail:data.Location,
        index:0,
        thumbnailKey:data.key
       })

       await liveWebinar.save();
 
       return res.status(200).json({message:'webinar Saved SuccesssFully'})
 
     })

  }catch(error){
    console.log(error)
  }
}


export const websiteWebinar = async(req,res)=>{
  try{

    const { title,Description, image, meetingLink } = req.body;

    if(!title || !Description || !image  || !meetingLink){
      return res.status(400).json({message:'Fill All The Inputs'})
    }

    const findWebinar = await WebisteLiveWebinar.findOne({index:0});
    if(findWebinar){
      return res.status(400).json({message:'Please Delete Previous Webiste Webinar'})
    }

    const findMeetWebinar = await MeetLiveWebinar.findOne({index:0});
    if(findMeetWebinar){
      return res.status(400).json({message:'Please Delete Previous Meet Webinar'})
    }


      // we are removing extra part in image
      const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      // we are getting jpeg
      const type = image.split(';')[0].split('/')[1];
  
      // image params
      const paramsOfImage = {
        Bucket: 'souravclient',
        Key: `${nanoid()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        contentEncoding: 'base64',
        ContentType: `/image/${type}`
      }
  
      // upload to S3
      S3.upload(paramsOfImage, async (err, data) => {
        if (err) {
          console.log(err)
          return res.status(400).json({ message: 'error' })
        }
  
        const LiveWebinar = new WebisteLiveWebinar({
         title:title,
         Description:Description,
         thumbnail:data.Location,
         meetingLink:meetingLink,
         index:0,
         thumbnailKey:data.key
        })
 
        await LiveWebinar.save();
  
        return res.status(200).json({message:'webinar Saved SuccesssFully'})
  
      })


  }catch(error){
    console.log(error)
  }
}


export const deleteVideo = async(req,res)=>{
  try{

    const { type, title, videoName} = req.body;

    const videoCourses = await Courses.findOne({type:type,title:title})



    for(let i = 0; i<videoCourses.videos.length; i++){
      if( videoCourses.videos[i].title == videoName ){

        const params = {
          Bucket: 'souravclient',
          Key: videoCourses.videos[i].key
        }
    
        S3.deleteObject(params, async (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          }
    
        })

        const params2 = {
          Bucket: 'souravclient',
          Key: videoCourses.videos[i].pdfKey
        }
    
        S3.deleteObject(params2, async (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          }
    
        })

        const params3 = {
          Bucket: 'souravclient',
          Key: videoCourses.videos[i].captionKey
        }
    
        S3.deleteObject(params3, async (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          }
    
        })

       await videoCourses.videos.remove(videoCourses.videos[i]);

       await videoCourses.save();

       return res.status(200).json({message:'done'})
      }

    }


  }catch(error){
    console.log(error)
  }
}