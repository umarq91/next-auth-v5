import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: {type:String, select: false},
// to protect the routes
role:{type:String,default:'user'},
image:String,
// this will come from Google & Github Providers
authProviderId:{type:String}
})


export const User = mongoose.models?.User || mongoose.model('User', userSchema)