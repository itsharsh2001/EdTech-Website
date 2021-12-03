import mongoose from 'mongoose'
const { Schema } = mongoose;


const googleUserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require:true
    },
    email: {
        type: String,
        trim: true,
        require:true,
        unique: true
    },
    emailVerified:{
        type: Boolean,
        require:true
    }
});

export default mongoose.model("GoogleUser", googleUserSchema);

