import mongoose from 'mongoose'
const { Schema } = mongoose;


const paidSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require:true
    },
    date:{
        type:String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require:true,
    },
    phone: {
        type: String,
        trim: true,
        require:true
    },
    planType:{
        type: String,
        trim: true,
        require:true
    },
    paymentMethod:{
        type: String,
        trim: true,
        require:true
    },
    planName:{
        type: String,
        trim: true,
        require:true
    },
    payingPrice:{
        type: String,
        trim: true,
        require:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    orderId:{
        type: String,
        trim: true,
        require:true
    },
    modeOfPayment:{
        type: String,
        trim: true,
        require:true
    }
});

export default mongoose.model("PaidUsers", paidSchema);

