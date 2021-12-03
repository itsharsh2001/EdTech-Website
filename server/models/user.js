import mongoose from 'mongoose'
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require:true
    },
    date:{
        type: Date,
        require:true
    },
    email: {
        type: String,
        trim: true,
        require:true,
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        require:true
    },
    password: {
        type: String,
        require:true,
        min:6,
        max:64,
    },
    isverified: {
        type: Boolean,
        default : false
    },
    instructor:{
        type: Boolean,
        default : false
    }
});

export default mongoose.model("User", userSchema);

