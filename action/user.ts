"use server"

import { signIn } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/user";

import {hash} from "bcryptjs"
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
export const register = async (formData:FormData) => {
        const firstName=formData.get('firstname') as string;
        const lastName=formData.get('lastname') as string;
        const email=formData.get('email') as string;
        const password=formData.get('password') as string;

    //TODO:  Add validation and Error
try {
    
    await connectDB();


   // existing user
   const existingUser = await User.findOne({ email });
   if (existingUser) throw new Error("User already exists");
 
   const hashedPassword = await hash(password, 12);
 
   await User.create({ firstName, lastName, email, password: hashedPassword });
   console.log(`User created successfully 🥂`);
   redirect("/login");


} catch (error:any) {
    console.log(error);
    
}        
    
}


export const login = async (formData:FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email,
        password,
      });
    } catch (error) {
      const someError = error as CredentialsSignin;
      return someError.cause;
    }
    redirect("/");
}