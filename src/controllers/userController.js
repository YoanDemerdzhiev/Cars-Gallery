import { Router } from "express";
import userServices from "../services/userServices.js";
import { AUTH_COOKIE_NAME } from "../config/index.js";
import { isAuth, isGuest } from "../middlewars/authMiddleware.js";
import { getErrorMessage } from "../utils/errorMessage.js";

const userConstroller = Router();

userConstroller.get('/register', isGuest, (req,res) => {
        
        
        res.render('user/register')
})

userConstroller.post('/register', isGuest, async (req, res) => {
        const userData = req.body;
        
        try {

        const token = await userServices.register(userData)
        res.cookie(AUTH_COOKIE_NAME,token)
        res.redirect('/')

        } catch (err) {
                res.render('user/register', {error: getErrorMessage(err), user: userData})
        }
})

userConstroller.get('/login', isGuest, (req,res) => {
        res.render('user/login')
})

userConstroller.post('/login', isGuest, async (req, res) => {
        console.log(req.body);
        const {email, password} = req.body
        try {
        const token = await userServices.login(email, password)

        res.cookie(AUTH_COOKIE_NAME, token)
        res.redirect('/')

        } catch (err) {
                res.render('user/login', {error: getErrorMessage(err), user: email})
        }
})

userConstroller.get('/logout', isAuth ,(req, res) => {
        res.clearCookie(AUTH_COOKIE_NAME)
        res.redirect('/')
})

export default userConstroller