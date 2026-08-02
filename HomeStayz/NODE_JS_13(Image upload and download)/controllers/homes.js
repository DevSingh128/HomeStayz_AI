const home = require("../models/home")
const User = require("../models/user")
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');


exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', {
    pageTitle: 'Add Home to airbnb',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user || null,
    editing: false
  });
};

/*exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating,description } =
    req.body;
  console.log(houseName, price, location, rating, description);
  console.log(req.file);

  if(!req.file){
    return res.status(422).send("No Image");
  }

  const photourl = req.file.filename;

  const Home = new home({
    houseName,
    price,
    location,
    rating,
    photourl,
    description,
  });
  Home.save().then(() => {
    console.log("Home Saved successfully");
  });

  res.redirect("/host/host-home-list");
};*/

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;

  if(!req.files || !req.files.photourl){
    return res.status(422).send("No Image");
  }

  const photourl = req.files.photourl[0].filename;
  const rulesPdf = req.files.rulesPdf ? req.files.rulesPdf[0].filename : null;

  const Home = new home({
    houseName,
    price,
    location,
    rating,
    photourl,
    rulesPdf,
    description,
  });
  Home.save().then(() => {
    console.log("Home Saved successfully");
  });

  res.redirect("/host/host-home-list");
};


exports.getHomes = (req, res,  next) => {
  home.find().then(registeredHomes=>{
    res.render('store/home-list', {
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user || null,
      pageTitle: 'airbnb Homes-list'
    })
  });
}

exports.getBookings = (req, res,  next) => {
    res.render('store/bookings', {
      pageTitle: 'Bookings',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user || null,
    })
}


exports.getIndex = (req, res,  next) => {
  console.log("seesion value", req.session)
  home.find().then(registeredHomes=>{
      res.render('store/index', {
        registeredHomes: registeredHomes,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null,
        pageTitle: 'index'
      });
  });
}

exports.getHostHomes = (req, res,  next) => {
  home.find().then(registeredHomes=>{
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user || null,
      pageTitle: 'Host Homes-list'
    })
  });
}


exports.getHomeDetails = (req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("At home details page",homeId);
  home.findById(homeId).then(gethomes => {
    if(!gethomes){
      console.log("Home not Found");
      res.redirect("/homes");
    }
    else{
      console.log("home details found");
      res.render('store/home-details', {
        home: gethomes,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null,
        pageTitle: 'Home Details'
      });
    }
  })
}


exports.getEditHome = (req,res,next) => {
  console.log("problem in get");
  const homeId =  req.params.homeId;
  const editing = req.query.editing === 'true';

  home.findById(homeId)
    .then(gethomes => {
      if (!gethomes) {
        console.log("edit home failed")
        return res.redirect('/host/host-home-list');
      }

      res.render("host/edit-home", {
        home: gethomes,
        pageTitle: "Edit your Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user || null,
        editing: editing,
      });
    })
    .catch(err => console.log(err));
}


exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } =
    req.body;
  home.findById(id).then((Home) => {
    Home.houseName = houseName;
    Home.price = price;  
    Home.location = location;
    Home.rating = rating;
    Home.description = description;

    if(req.files && req.files.photourl){
      fs.unlink(path.join(rootDir, 'uploads', Home.photourl), (err) => {
        if(err){
          console.log("Error deleting image", err)
        }
      })
      Home.photourl = req.files.photourl[0].filename;
    }

    if(req.files && req.files.rulesPdf){
      Home.rulesPdf = req.files.rulesPdf[0].filename;
    }

    Home.save().then((result) => {
      console.log("Home updated ", result);
    }).catch(err => {
      console.log("Error while updating ", err);
    })
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while finding home ", err);
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.body.homeId || req.params.homeId;

  console.log('came to delete',homeId);
  home.findByIdAndDelete(homeId).then(()=>{
    res.redirect("/host/host-home-list")
  })
  .catch(error => {
      console.log('Error status',error);
  })
};

exports.postRemoveFromFavourite = async(req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/favourite-list");
};


exports.getFavouriteList = async(req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async(req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourite-list");
};