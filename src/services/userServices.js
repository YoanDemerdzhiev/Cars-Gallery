import User from "../models/User.js"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/userUtils.js";


export default {
    async register(userData) {
        const { firstname, lastname, email, password, repassword } = userData;
        
        
        if (password !== repassword) {
            throw new Error('Password Missmatch')
        }
        

        const newUser = await User.create(userData)
        const token = generateToken(newUser)
        return token;
    },
    async login(email, password){
        const user = await User.findOne({email})

        if (!user) {
            throw new Error('No such user exsits!')

        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            throw new Error('Invalid email or password!')

        }

        const token = generateToken(user)
        return token
    },
    async getUserById(id) {
        return User.findById(id)
    }
}