import mongoose from "mongoose";

export const DeviceInventory = new mongoose.Schema({
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
})
