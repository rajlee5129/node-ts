import mongoose from 'mongoose';

export class Db {
    constructor() {
        mongoose.connect(`mongodb://${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
        mongoose.connection.on("error", err => {
            console.log("err", err)
        })
        mongoose.connection.on("connected", (err, res) => {
            console.log("mongoose is connected")
        })
    }
}

