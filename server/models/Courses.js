import mongoose from 'mongoose'
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        require:true
    },
    description: {
        type: String,
        trim: true,
        require:true
    },
    isHide:{
        type:Boolean,
        default:false
    },
    isFree:{
        type:Boolean,
        default:false
    },
    coursePrice:{
        type: Number,
        trim: true,
        require:true
    },
    type:{
        type: String,
        trim: true,
        require:true
    },
    videos:[
        {
            file: {
                type: String,
                trim: true,
                require:true
            },
            title:{
                type: String,
                trim: true,
                require:true
            },
            description:{
                type: String,
                trim: true,
                require:true
            },
            thumbnail:{
                type: String,
                trim: true,
                require:true
            },
            isFree:{
                type:Boolean,
                default:false
            },
            playlist:{
                type: String,
                trim: true,
                require:true
            },
            notes:{
                type: String,
                trim: true,
                require:true
            },
            caption:{
                type:String,
                trim:true
            },
            key:{
                type:String,
                trim: true,
                require:true
            },
            pdfKey:{
                type:String,
                trim: true,
                require:true
            },
            captionKey:{
                type:String,
                trim: true,
            }
        }
    ]
});

export default mongoose.model("Courses", courseSchema);

