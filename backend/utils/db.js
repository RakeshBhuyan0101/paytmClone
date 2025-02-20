import mongoose from "mongoose";

export const  connectDb = async( ) => {
    try {
       const res =  await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}