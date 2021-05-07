"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInventory = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.DeviceInventory = new mongoose_1.default.Schema({
    deviceNumber: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
