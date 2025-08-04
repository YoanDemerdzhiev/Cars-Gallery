import e from "express";
import mongoose, { Schema, model } from "mongoose";

const carSchema = new Schema({
    model : {
        type: String,
        required: [true,"Model is required!"],
        minLength: [2, 'Model should be at least 2 characters!']
    },
    manufacturer: {
        type: String,
        required: [true,"Manufacturer is required!"],
        minLength: [3, 'Manufacturer should be at least 3 characters!'],
       
    },
    engine: {
        type: String,
        required: [true,"Engine is required!"],
        minLength: [3, 'Engine should be at least 3 characters!'],
        
    },
    topspeed: {
        type: Number,
        required: [true,"Top speed is required!"],
        min: [2, 'Top speed should be at least 2 characters!'],
        
    },
    image: {
        type: String,
        required: [true,"Image is required!"],
        validate: [/^https?:\/\//i, 'Invalid image format']
    },
    description: {
        type: String,
        required: [true,"Description is required!"],
        minLength: [5, 'Description should be at least 5 characters!'],
        maxLength: [500, 'Description should max 500 characters!']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    
})

carSchema.method('getLiked', async function () {
    return this.voted.map(x=> x._id)
})

const Car = model('Car', carSchema);
export default Car