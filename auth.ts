import NextAuth, { CredentialsSignin } from "next-auth"
 import Credentials from "next-auth/providers/credentials"
import { log } from "node:console"
import connectDB from "./lib/db";
import { User } from "./models/user";
import { compareSync } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        name:"Credentials",
        // these are the fields
        credentials:{
            email:{type:"email",label:"Email",placeholder:"Email"},
            password:{type:"password",label:"Password",placeholder:"Password"},

        },
        
     authorize: async (credentials) => {
        let email = credentials?.email as string| undefined;
        let password = credentials?.password as string | undefined;

        if (!email || !password) {
            throw new CredentialsSignin('Credentials are required!');
        }

        await connectDB();

            const user = await User.findOne({ email }).select('+password +role');
            if(!user) throw new CredentialsSignin('No user found with the email provided');

const isMatched = await compareSync(password, user.password);
if(!isMatched) throw new CredentialsSignin('Password is incorrect');

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user._id
        }

        return userData;
    }
    })
  ],
  pages:{
    signIn:"/login"
  }
}) 