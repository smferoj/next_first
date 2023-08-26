import mongoose from "mongoose";

const dbConnect = async()=>{
    if(mongoose.connection.readyState>=1){
        return;
    }
    mongoose.connect(process.env.DB_URI);
    console.log("DB connected successfully")
}

export default dbConnect;