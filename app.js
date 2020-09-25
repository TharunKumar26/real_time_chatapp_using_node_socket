const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io')

const bodyParser = require('body-parser')
/*
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const User = require('./models/user.model');
const Admin = require('./models/admin');
const Vendor = require('./models/Vendor');
*/

const app = express();
var httpserver = http.createServer(app)



// cors middleware
app.use(cors()); 
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));


// Static content
app.use(express.static( __dirname + "/public" ) );


//Routes
app.get('/', (req, res)=>{

    res.render('main')
});

app.post('/chat',(req,res)=>{
  const username = req.body.name;
  res.render('chat',{name: username })
})

const io = socket(httpserver)

io.on("connection",(socket)=>{
    currid = socket.id
  io.emit("connected",currid)
    console.log(socket.id)
  io.emit("as", "test")
  socket.on("message",(sid,data,name)=>{
    console.log(sid,data,name)
    
    io.emit("send_msg",sid,data,name)

  })


  }


)





/*

// Express Session
app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,
}));



// Passport config
require('./config/passport')(passport);



// DB Config
const db = require('./config/keys').mongoURI; 

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// EJS

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// User
app.use((req, res, next) => {
    if(!req.session.user){
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
      })
  });
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

  // Admin
  app.use((req, res, next) => {
    if(!req.session.user){
      return next();
    }
    Admin.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
      })
  });
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

  // Vendor
  app.use((req, res, next) => {
    if(!req.session.user){
      return next();
    }
    Vendor.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
      })
  });
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/vendor', require('./routes/vendor'));
app.use('/admin', require('./routes/admin'));
app.use('/chat', require('./routes/chat'));



*/
const PORT = process.env.PORT || 3000;


httpserver.listen(PORT, console.log(`Server started on port ${PORT}`));