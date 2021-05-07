"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Db = /** @class */ (function () {
    function Db() {
        mongoose_1.default.connect("mongodb://" + process.env.MONGO_IP + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB);
        mongoose_1.default.connection.on("error", function (err) {
            console.log("err", err);
        });
        mongoose_1.default.connection.on("connected", function (err, res) {
            console.log("mongoose is connected");
        });
    }
    return Db;
}());
exports.Db = Db;
