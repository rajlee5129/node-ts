"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors = require('cors');
dotenv_1.default.config();
var db_1 = require("./db");
var deviceInventoryRoutes_1 = require("./routes/deviceInventoryRoutes");
new db_1.Db();
// Create a new express application instance
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// init routes
app.use(cors());
deviceInventoryRoutes_1.DeviceInventoryRoutes.initRoutes(app);
app.listen(Number(process.env.EXPRESS_PORT), function () {
    console.log("Server app listening on port " + process.env.EXPRESS_PORT);
});
