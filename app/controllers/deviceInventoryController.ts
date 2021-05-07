import * as mongoose from "mongoose";
import {Request, Response} from "express";
import {DeviceInventory} from "../models/deviceInventory";

const deviceInventory = mongoose.model("DeviceInventory", DeviceInventory)

export class DeviceInventoryController {
    static addDevice = async (req: Request, res: Response) => {
        try {
            const deviceDetails = await deviceInventory.findOne({deviceNumber: req.body.deviceNumber});
            if (deviceDetails) {
                return res.status(400).send({message: "Device already exist with same serial number"})
            }
            const newDevice = new deviceInventory(req.body);
            await newDevice.save();
            res.status(200).send({message: "Device added successfully"});
        } catch (e) {
            res.status(500).send({message: "error occurred", error: e});
        }
    }
    static validateDevice = async (req: Request, res: Response) => {
        try {
            let deviceDetails: any = await deviceInventory.findOne({deviceNumber: req.params.deviceNumber});
            if (!deviceDetails) {
                return res.status(400).send({message: "Device not available with this serial number."})
            }
            if (!deviceDetails.available) {
                return res.status(400).send({message: "Device already in use."})
            }
            res.status(200).send({message: "valid device"});
        } catch (e) {
            res.status(500).send({message: "error occurred", error: e});
        }
    }
    static getDeviceByDeviceId = async (req: Request, res: Response) => {
        try {
            const deviceDetails = await deviceInventory.findOne({deviceNumber: req.body.deviceNumber});
            if (!deviceDetails) {
                return res.status(400).send({message: "Provide valid device"})
            }
            res.status(200).send({data: deviceDetails})
        } catch (e) {
            res.status(500).send({message: "error occurred", error: e});
        }
    }
    static getAllDevices = async (req: Request, res: Response) => {
        try {
            const devicesList = await deviceInventory.find({});
            res.status(200).send({data: devicesList})
        } catch (e) {
            res.status(500).send({message: "error occurred", error: e});
        }
    }
    static updateDeviceStatus = async (deviceNumber: any,status:boolean) => {
        await deviceInventory.findOneAndUpdate({deviceNumber: deviceNumber}, {available: status}, {new: true});
    }
}
