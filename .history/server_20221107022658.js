const mongoose = require("mongoose");
const express = require("express");
const app = express();
var cors = require("cors");
// var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

// all routes
var apiRoutes = require("./routes/api");
var teacherRoutes = require("./routes/teacher");
var studentRoutes = require("./routes/student");
var adminRoutes = require("./routes/admin");

const DB =
  "mongodb+srv://Harshida:Shaily@19210@cluster0.xw2wwzd.mongodb.net/quiz?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successfull.`);
  })
  .catch((err) => console.log(`no connection`));

// some dependency
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// {
//     "origin": "http://localhost:4200",
//     'allowedHeaders': ['Authorization', 'Content-Type'],
// }
// {
// 'allowedHeaders': ['Authorization', 'Content-Type'],
// }
// app.options('*', cors())

//database connection
// const db = require("./database/db");
// db();
// app.use(function (req, res, next) {
// res.header("Access-Control-Allow-Headers", "*")
// res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
// })

// socket
var server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.set("io", io);
io.on("connection", (socket) => {
  console.log("new  sockeet connection...");
  socket.emit("test event", "hey utsav");
});

// for testing purpose
app.get("/", (req, res) => {
  res.send("Hello Harshida from quiz Server");
});

// use all routes
app.use("/", apiRoutes);
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

// for debugging
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
