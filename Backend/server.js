require("dotenv").config(); //to config dotenv,only in main entry point
require("./database").db(); //connecting with mongodb database
const path = require("path");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser"); //required for express to understand json req body
const ACTIONS = require("./actions");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
});
const corsObj = {
  origin: ["http://localhost:3000"],
  credentials: true, //for enable cookies
};

app.use(cors(corsObj));
app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use(cookieParser()); //to parse cookies.
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "8mb" })); // parse application/json , files that are 8mb or less will be able to send.
const port = process.env.PORT || 5050;
app.use("/", require("./routes")); //all the routes are maitained in diffrenet folder
const socketUserMapping = {};
io.on("connection", (socket) => {
  console.log(` new connection ${socket.id}`);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;

    const clientsOnSameRoom = Arrays.from(
      io.sockets.adapter.rooms.get(roomId) || []
    );

    clientsOnSameRoom.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {});
    });

    socket.emit(ACTIONS.ADD_PEER, {});
    socket.join(roomId);
  });
});

server.listen(port, () => {
  console.log(`Server is up http://localhost:${port}`);
});

//As this is backend code running on Node,we will use require and module.exports.While
//at frontend we will use es6 import export syntax.
