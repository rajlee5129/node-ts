"use strict";
exports.__esModule = true;
exports.DeviceInventory = void 0;
var mongoose_1 = require("mongoose");
exports.DeviceInventory = new mongoose_1["default"].Schema({
    deviceNumber: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        "default": true,
        required: true
    },
    created_date: {
        type: Date,
        "default": Date.now
    }
});
