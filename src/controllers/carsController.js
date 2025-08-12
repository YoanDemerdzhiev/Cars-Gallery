import { Router } from "express";
import carServices from "../services/carServices.js";
import { isAuth } from "../middlewars/authMiddleware.js";
import { getErrorMessage } from "../utils/errorMessage.js";
import { AUTH_COOKIE_NAME } from "../config/index.js";
import userServices from "../services/userServices.js";
import Car from "../models/Cars.js";

const carsController = Router();

carsController.get('/all-posts', async (req,res) => {
    let cars = await carServices.getAll();
    
    res.render('cars/all-posts', {cars})
})

carsController.get('/create', (req, res) => {
    res.render('cars/create')
});

carsController.post('/create', isAuth, async (req, res) => {
    const carData = req.body;
    carData.owner = req.user.id;
    try {
        await carServices.create(carData);
        res.redirect('/cars/all-posts');
    } catch (error) {
        console.log(error);
        res.render('cars/create', { error: getErrorMessage(error) , car: carData});
    }
});

carsController.get('/details/:id', async (req, res) => {
    
    const cars = await carServices.getOne(req.params.id);
    const carsData = await cars.toObject();
    
    const isOwner = carsData.owner == req.user.id;
    
    const owner = await userServices.getUserById(carsData.owner);
    const ownerName = `${owner.firstname} ${owner.lastname}`;
    
    
   
    res.render('cars/details', {...carsData,isOwner, ownerName})
    
});


carsController.get('/my-posts', isAuth, async (req, res) => {
    let cars = await carServices.getMyPosts(req.user.id);
    res.render('cars/my-posts', { cars });
});



async function isOwner(req, res, next) {
    let cars = await carServices.getOne(req.params.id);

    if (cars.owner == req.user.id) {
        next();
    } else {
        res.redirect(`/cars/details/${req.params.id}`);
    }
};

carsController.get('/details/:id/liked' , async (req, res) => {
    const car = await carServices.getOne(req.params.id);

    car.likes.push(req.user.id);
    await car.save();

    res.redirect(`/cars/details/${req.params.id}`);
});

// carsController.get('/:id/delete', checkIsOwner, async (req, res) => {
//     try {
//         await carsServices.delete(req.params.id);

//         res.redirect('/cars/all-posts');
//     } catch (error) {
//         res.render('cars/create', { error: getErrorMessage(error) });
//     }

// });

// carsController.get('/:id/edit', async (req, res) => {
//     let cars = await carsServices.getOne(req.params.id);
//     console.log(cars);
//     res.render('cars/edit', { ...cars.toObject() })
// });

// carsController.post('/:id/edit', checkIsOwner, async (req, res) => {
//     try {
//         console.log(await carsServices.updateOne(req.params.id, req.body));

//         res.redirect(`/cars/${req.params.id}/details`);
//     } catch(error) {
//         console.log(getErrorMessage(error));
//         res.render('cars/create', { error: getErrorMessage(error) });
//     }

// });



export default carsController