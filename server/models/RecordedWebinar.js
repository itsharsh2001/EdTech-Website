import mongoose from 'mongoose'
const { Schema } = mongoose;

const webinarSchema = new Schema({
    title: {
        type: String,
        trim: true,
        require:true
    },
    Description: {
        type: String,
        trim: true,
        require:true
    },
    caption: {
        type: String,
        trim: true,
        require:true
    },
    thumbnail: {
        type: String,
        trim: true,
        require:true
    },
    video:{
        type:String,
        trim:true,
        require:true
    },
    videoKey:{
        type:String,
        trim: true,
        require:true
    },
    captionKey:{
        type:String,
        trim: true,
        require:true
    },
    key:{
        type:String,
        trim: true,
        require:true
    },
});

export default mongoose.model("Webinar", webinarSchema);

