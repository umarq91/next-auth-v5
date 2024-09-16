import mongoose from "mongoose";

const connectDB = async () => {
    // if (mongoose.connection.readyState >= 1) {
    //     return;
    // }

    try {
            console.log("connecting to Db");            
            await mongoose.connect(process.env.MONGO_URI!);
            console.log("connected to Db");
            

    } catch (error:any) {
        console.log(error);
        process.exit(1);   
    }
}

export default connectDB