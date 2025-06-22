import {Router} from "express";

const homeControllet = Router();

homeControllet.get('/', (req,res) => {
    res.render('home')
});

export default homeControllet;