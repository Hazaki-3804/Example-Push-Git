import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDBNode";
require('dotenv').config();
let app = express();

//config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log("Backend is running on the port " + port);
})
