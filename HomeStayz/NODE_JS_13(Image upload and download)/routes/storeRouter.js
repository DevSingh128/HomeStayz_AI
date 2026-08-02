const path = require('path');
const express = require('express');
const storeRouter = express.Router();

const homesControllers = require("../controllers/homes");

storeRouter.get("/", homesControllers.getIndex);
storeRouter.get("/homes", homesControllers.getHomes);
storeRouter.get("/bookings", homesControllers.getBookings);
storeRouter.get("/favourite-list", homesControllers.getFavouriteList);   
storeRouter.get("/homes/:homeId", homesControllers.getHomeDetails);
storeRouter.post("/favourites", homesControllers.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", homesControllers.postRemoveFromFavourite); // fixed name
module.exports = storeRouter;