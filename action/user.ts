"use server"

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { log } from "node:console"

export const register = async (formData:FormData) => {
        const firstName=formData.get('firstname') as string;
        const lastName=formData.get('lastname') as string;
        const email=formData.get('email') as string;
        const password=formData.get('password') as string;

    //TODO:  Add validation and Error
        

    await connectDB();


    //existing user
    const exisitingUser=  await User.findOne({email});
    if(exisitingUser) throw new Error("user already exists");

    const user =await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    })

    console.log("User Created");
    
}
