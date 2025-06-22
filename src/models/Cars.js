import mongoose, { Schema, model } from "mongoose";

const carSchema = new Schema({
    model : {
        type: String,
        required: true,
        minLength: [2, 'Product should be at least 2 characters!']
    },
    manufacturer: {
        type: String,
        required: true,
        minLength: [3, 'Product should be at least 3 characters!'],
       
    },
    engine: {
        type: String,
        required: true,
        minLength: [3, 'Product should be at least 3 characters!'],
        
    },
    topspeed: {
        type: Number,
        required: true,
        minLength: [2, 'Product should be at least 2 characters!'],
        
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'Product should be at least 5 characters!'],
        maxLength: [500, 'Product should max 500 characters!']
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