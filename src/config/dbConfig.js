import mongoose from 'mongoose';

export default async function initDatabase() {

const dbUrl =  `mongodb://localhost:27017`;
const dbName = `project_data`
try{
await mongoose.connect(dbUrl, {dbName})

console.log('DB connected successfully');
} catch (error){
    console.log('DB Connection Failed!');
    console.log(error.message);
    
    
}
}