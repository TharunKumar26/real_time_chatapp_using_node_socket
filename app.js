const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io')

const bodyParser = require('body-parser')


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



const PORT = process.env.PORT || 5000;


httpserver.listen(PORT, console.log(`Server started on port ${PORT}`));