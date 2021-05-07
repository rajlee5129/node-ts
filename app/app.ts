// lib/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import Dotenv from 'dotenv'
const cors = require('cors')
Dotenv.config();
import {Db} from "./db";
import {DeviceInventoryRoutes} from "./routes/deviceInventoryRoutes";

new Db();
// Create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function (req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// init routes
app.use(cors())
DeviceInventoryRoutes.initRoutes(app);
app.listen(Number(process.env.EXPRESS_PORT), function () {
    console.log(`Server app listening on port ${process.env.EXPRESS_PORT}`);
});
