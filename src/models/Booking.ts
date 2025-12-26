import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    providerID:{type:String,default:null},
    status:{type:String,enum:['PENDING','REJECTED','CONFIRM','DELIVERED'],default:'PENDING'},
    catogery:{type:String},
    location:{type:String},
    desc:{type:String},
    sheduleAt:{type:String},
},{timestamps:true});


const Booking = mongoose.model("Bookign",bookingSchema);
 export default Booking;