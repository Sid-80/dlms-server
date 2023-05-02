const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("../server/routes/userRoutes");
const conRoutes = require("../server/routes/ConversationRoutes");
const mesRoutes = require("../server/routes/MessageRoutes");
mongoose.set('strictQuery',true);
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
require('./db/connection');
app.use(express.json());
app.use("/api/auth/",userRoutes);
app.use("/api/con",conRoutes);
app.use("/api/msg",mesRoutes);

const middleWare = (res,req,next) => {
    console.log("middleware !!");
    next(); //redirect to next page`
}

app.listen('5000',()=>{
    console.log("On port 5000!!");
});