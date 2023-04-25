import mongoose  from "mongoose";
const eventschema = new mongoose.Schema( {
    eventname:String,
    location:String,
    requirements:String,
    price:String,
    cover_img:String,
    details:String,
    gender:String,
   
});

export default mongoose.model("event",eventschema);