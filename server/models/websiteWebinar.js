import mongoose from 'mongoose'
const { Schema } = mongoose;

const websiteWebinarSchema = new Schema({

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

        thumbnail: {
            type: String,
            trim: true,
            require:true
        },

        meetingLink:{
            type: String,
            trim: true,
            require:true
        },

        index:{
            type: Number,
            trim: true,
            require:true
        },

        thumbnailKey:{
            type: String,
            trim: true,
            require:true
        }

    }
);

export default mongoose.model("WebsiteWebinar", websiteWebinarSchema);

