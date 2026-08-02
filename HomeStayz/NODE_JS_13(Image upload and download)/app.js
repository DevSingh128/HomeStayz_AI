//core module
const path = require('path');

//external module
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const {MongoStore} = require('connect-mongo');
const mongoose = require('mongoose');
const db_path = "mongodb+srv://rootuser:rootuser@cluster1.3hqqkfm.mongodb.net/airbnb?retryWrites=true&w=majority";

//local module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/AuthRouter");
const errorController = require("./controllers/errors");
const rootDir = require("./utils/pathUtil");


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for(let i=0;i<length;i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,path.join(rootDir,'uploads'));
  },
  filename: (req,file,cb) => {
    cb(null,randomString(10) + '-' + file.originalname);
  }
})

const filefilter = (req,file,cb) => {
  if(file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf'){
    cb(null,true);
  } else{
    cb(null,false);
  }
}

const multerOptions = {
  storage,
  fileFilter: filefilter
};


app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded());
//app.use(multer(multerOptions).single('photourl'))
app.use(multer(multerOptions).fields([
  { name: 'photourl', maxCount: 1 },
  { name: 'rulesPdf', maxCount: 1 }
]));

app.use("/uploads",express.static(path.join(rootDir,'uploads')));
app.use("/homes/uploads",express.static(path.join(rootDir,'uploads')));

const mongoStore = MongoStore.create({
  mongoUrl: db_path,
  collectionName: 'sessions',
});

mongoStore.on('error', function (error) {
  console.log('MongoStore Error:', error);
});

app.use(session({
  secret: "dev@123",
  resave: false,
  saveUninitialized: false, // false is actually more correct here — see note below
  store:mongoStore,
}));

app.use((req,res,next)=>{
  req.isLoggedIn = req.session.isLoggedIn,
  req.session.user = req.session.user;
  next();
})

app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);


app.use(errorController.pageNotFound);


const PORT = 3000;

mongoose.connect(db_path).then(()=>{
  console.log('Connected to mongoose')
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to mongoose',err);
})

