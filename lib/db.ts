import mongoose, { mongo } from "mongoose";
import { log } from "node:console";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        
            await mongoose.connect(process.env.MONGO_URI!);
            console.log("connected to Db");
            

    } catch (error:any) {
        console.log(error);
        process.exit(1);
        
    }


}

export default connectDB