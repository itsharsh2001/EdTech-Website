import mongoose from 'mongoose'
const { Schema } = mongoose;


const querySchema = new Schema({
    name: {
        type: String,
        trim: true,
        require:true
    },
    date:{
        type: String,
        require:true
    },
    email: {
        type: String,
        trim: true,
        require:true,
    },
    phone:{
        type: String,
        trim: true,
        require:true,
    },
    query:{
        type: String,
        trim: true,
        require:true
    }
});

export default mongoose.model("query", querySchema);

