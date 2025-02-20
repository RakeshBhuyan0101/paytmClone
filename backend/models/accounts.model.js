import mongoose, { model } from "mongoose";

const acountSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "user" , required: true},
    balance: { type: Number, required: true }

})

const Account = mongoose.model("Account" , acountSchema)

export default Account