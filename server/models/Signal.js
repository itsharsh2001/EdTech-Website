import mongoose from 'mongoose'
const { Schema } = mongoose;


const signalSchema = new Schema({
    signalHeading: {
        type: String,
        trim: true,
        require:true
    },
    signalFile: {
        type: String,
        trim: true,
        require:true
    },

    key:{
        type:String,
        trim: true,
        require:true
    },
    index:{
        type:Number,
        require:true
    },
});

export default mongoose.model("Signal", signalSchema);

