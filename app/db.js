"use strict";
exports.__esModule = true;
exports.Db = void 0;
var mongoose_1 = require("mongoose");
var Db = /** @class */ (function () {
    function Db() {
        mongoose_1["default"].connect("mongodb://" + process.env.MONGO_IP + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB);
        mongoose_1["default"].connection.on("error", function (err) {
            console.log("err", err);
        });
        mongoose_1["default"].connection.on("connected", function (err, res) {
            console.log("mongoose is connected");
        });
    }
    return Db;
}());
exports.Db = Db;
