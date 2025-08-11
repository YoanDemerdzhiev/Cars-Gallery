import { JWT_SECRET } from "../config/index.js";
import jsonwebtoken from "jsonwebtoken"
export function generateToken (user) {
        const payload ={
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,

        }
        
        const token = jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn : "2h"})
        return token;
    }