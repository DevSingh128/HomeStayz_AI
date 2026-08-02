// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const homesControllers = require("../controllers/homes");

hostRouter.get("/add-home",  homesControllers.getAddHome)

hostRouter.post("/add-home", homesControllers.postAddHome)

hostRouter.get("/host-home-list",  homesControllers.getHostHomes)

hostRouter.get("/edit-home/:homeId",homesControllers.getEditHome)

hostRouter.post("/edit-home", homesControllers.postEditHome)

hostRouter.post("/delete-home/:homeId",
homesControllers.postDeleteHome
)

module.exports = hostRouter;
