const path = require("path");

const express = require ("express");
const logger = require ("morgan");
const bodyParser = require("body-parser");

const app = express();

const indexRoutes = require ("./routes/index");

const starter = require('./core/inicialicer/inicialicer');

/*const indexStoreRoutes = require ("./routes/indexStore");
const indexForumRoutes = require ("./routes/indexForum");
const indexUserRoutes = require ("./routes/indexUser");*/

//Setting
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

//middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", indexRoutes);
//app.use("/store", indexStoreRoutes);
//app.use("/forum", indexForumRoutes);
//app.use("/user", indexUserRoutes);*/

app.listen(app.get("port"), () => {
    //onsole.log(starter.inicialize);
    console.log("server on port", app.get("port"));
});