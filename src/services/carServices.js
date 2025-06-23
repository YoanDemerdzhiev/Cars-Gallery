import Car from '../models/Cars.js';
import User from '../models/User.js';


export default{
  create (carData)  {
    Car.create(carData)
},
  getAll()  {
    return Car.find().lean()
},
  getOne(carId) {
    return Car.findById(carId).populate('likes')
},
    
  deleteOne(carId) {
    Car.findByIdAndDelete(carId)
},
  findOwner(userId) {
    Car.findById(userId).lean()
},
  getMyCreatedPost(userId)  {
    Car.find({ owner: userId }).lean()
},
  updateOne(carId, carData)  
{
    Car.findByIdAndUpdate(carId, carData)
}
}
