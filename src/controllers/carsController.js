import { Router } from "express";
import carServices from "../services/carServices.js";
import { isAuth } from "../middlewars/authMiddleware.js";
import { getErrorMessage } from "../utils/errorMessage.js";

const carsController = Router();

carsController.get('/all-posts', async (req,res) => {
    let cars = await carServices.getAll();
    res.render('cars/all-posts', {cars})
})

carsController.get('/create', (req, res) => {
    res.render('creatures/create')
});

carsController.post('/create', isAuth, async (req, res) => {
    try {
        await creaturesServices.create({ ...req.body, owner: req.user._id });
        res.redirect('/creatures/all-posts');
    } catch (error) {
        console.log(error);
        res.render('creatures/create', { error: getErrorMessage(error) });
    }
});

carsController.get('/:id/details', async (req, res) => {
    let cars = await carsServices.getOne(req.params.id);
    let carsData = await cars.toObject();

    let isOwner = carsData.owner == req.user?._id;
    let carsOwner = await carsServices.findOwner(cars.owner).lean();
    let creatureInfo = carsData.liked;

    let emails = [];
    creatureInfo.forEach(x => emails.push(x.email));
    emails.join(', ');

    let liked = cars.getLiked();
    let isLiked = req.user && liked.some(c => c._id == req.user?._id);

    res.render('cars/details', { ...carsData, isOwner, isLiked, carsOwner, creatureInfo, emails })
});

async function isOwner(req, res, next) {
    let cars = await carsServices.getOne(req.params.id);

    if (cars.owner == req.user._id) {
        res.redirect(`/cars/${req.params.id}/details`);
    } else {
        next();
    }
}

async function checkIsOwner(req, res, next) {
    let cars = await carsServices.getOne(req.params.id);

    if (cars.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/cars/${req.params.id}/details`);
    }
};

carsController.get('/:id/delete', checkIsOwner, async (req, res) => {
    try {
        await carsServices.delete(req.params.id);

        res.redirect('/cars/all-posts');
    } catch (error) {
        res.render('cars/create', { error: getErrorMessage(error) });
    }

});

carsController.get('/:id/edit', async (req, res) => {
    let cars = await carsServices.getOne(req.params.id);
    console.log(cars);
    res.render('cars/edit', { ...cars.toObject() })
});

carsController.post('/:id/edit', checkIsOwner, async (req, res) => {
    try {
        console.log(await carsServices.updateOne(req.params.id, req.body));

        res.redirect(`/cars/${req.params.id}/details`);
    } catch(error) {
        console.log(getErrorMessage(error));
        res.render('cars/create', { error: getErrorMessage(error) });
    }

});

carsController.get('/:id/liked', isOwner, async (req, res) => {
    let cars = await carsServices.getOne(req.params.id);

    cars.liked.push(req.user);
    await cars.save();

    res.redirect(`/cars/${req.params.id}/details`);

});

export default carsController