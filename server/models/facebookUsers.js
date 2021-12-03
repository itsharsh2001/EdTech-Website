import mongoose from 'mongoose'
const { Schema } = mongoose;


const facebookUserSchema = new Schema({
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
    }
});

export default mongoose.model("FacebookUser", facebookUserSchema);

