import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  firstName: { type: String, require: true , trim : true , maxLength:50 },
  lastName: { type: String, require: true  , trim : true , maxLength: 50 },
  password : { type: String, require: true  , minLength : 6},
});

const User = mongoose.model( "User", userSchema);
export default User
