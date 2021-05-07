import {DeviceInventoryController} from "../controllers/deviceInventoryController";

export class DeviceInventoryRoutes {
    public static initRoutes = (app: any) => {
        app.route('/deviceInventory')
            .post(DeviceInventoryController.addDevice)
            .get(DeviceInventoryController.getAllDevices);
        app.route('/deviceInventory/:deviceNumber')
            .get(DeviceInventoryController.getDeviceByDeviceId);
        app.route('/deviceInventory/validateDevice/:deviceNumber')
            .get(DeviceInventoryController.validateDevice)

    }
}
