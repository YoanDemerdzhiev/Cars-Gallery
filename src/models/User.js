import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    
    firstname: {
        type: String,
        required: [true, 'Firstname is required!'],
        minLength: [3, 'Firstname should be at least 3 characters!']
        

    } ,
    lastname : {
        type: String,
        required: [true, 'Lastname is required!'],
        minLength: [3, 'Lastname should be at least 3 characters!']
    } ,
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 characters!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters!']
    }
})

userSchema.pre('save', async function () {
    this.password =  await bcrypt.hash(this.password, 10)
})

const User = model('User', userSchema);
export default User