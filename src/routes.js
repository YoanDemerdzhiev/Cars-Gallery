import {Router} from "express";
import homeControllet from "./controllers/homeController.js";
import userConstroller from "./controllers/userController.js";
import carsController from "./controllers/carsController.js";

 const routes = Router();

 routes.use(homeControllet)
 routes.use('/users',userConstroller)
 routes.use('/cars', carsController);
 routes.all('*url', (req, res) => {
    res.render('user/404')
 })
 export default routes;