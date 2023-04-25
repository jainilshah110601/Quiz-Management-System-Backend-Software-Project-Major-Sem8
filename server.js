import express, { urlencoded, json } from 'express'
const app = express()
import cors from 'cors'
// var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000


// all routes
import apiRoutes from './routes/api'
import teacherRoutes from './routes/teacher'
import studentRoutes from './routes/student'
import adminRoutes from './routes/admin'

// some dependency
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors())

// {
//     "origin": "http://localhost:4200",
//     'allowedHeaders': ['Authorization', 'Content-Type'],
// }
// {
    // 'allowedHeaders': ['Authorization', 'Content-Type'],
// }
// app.options('*', cors())

//database connection
import db from './database/db'
db()
// app.use(function (req, res, next) {
// res.header("Access-Control-Allow-Headers", "*")
// res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
// })

// socket 
var server = require('http').Server(app);
var io = require('socket.io')(server,
    {
        cors:
        {
            origin: '*',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
app.set('io', io);
io.on('connection', socket => {

    console.log("new  sockeet connection...");
    socket.emit("test event", "hey utsav");

});


// for testing purpose
app.get('/', (req, res) => {
    res.send("Hello User from quiz Server")
})


// use all routes
app.use('/', apiRoutes)
app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)


// for debugging
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


