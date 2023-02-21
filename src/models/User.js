import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  email: { 
    type: String, 
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
},
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
