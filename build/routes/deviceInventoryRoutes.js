"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInventoryRoutes = void 0;
var deviceInventoryController_1 = require("../controllers/deviceInventoryController");
var DeviceInventoryRoutes = /** @class */ (function () {
    function DeviceInventoryRoutes() {
    }
    DeviceInventoryRoutes.initRoutes = function (app) {
        app.route('/deviceInventory')
            .post(deviceInventoryController_1.DeviceInventoryController.addDevice)
            .get(deviceInventoryController_1.DeviceInventoryController.getAllDevices);
        app.route('/deviceInventory/:deviceNumber')
            .get(deviceInventoryController_1.DeviceInventoryController.getDeviceByDeviceId);
        app.route('/deviceInventory/validateDevice/:deviceNumber')
            .get(deviceInventoryController_1.DeviceInventoryController.validateDevice);
    };
    return DeviceInventoryRoutes;
}());
exports.DeviceInventoryRoutes = DeviceInventoryRoutes;
