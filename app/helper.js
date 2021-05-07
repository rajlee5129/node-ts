"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Helper = void 0;
var TimerController_1 = require("./controllers/TimerController");
var schedule = require('node-schedule');
var moment_1 = require("moment");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.currentDayTimersList = [];
    Helper.getCurrentDayTimers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var currentDay, dayOffset, timersList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDay = moment_1["default"](new Date()).format('ddd');
                    dayOffset = moment_1["default"]().isoWeekday();
                    return [4 /*yield*/, TimerController_1.TimerController.getTimersByDay(currentDay.toUpperCase())];
                case 1:
                    timersList = _a.sent();
                    Helper.currentDayTimersList = [];
                    for (i = 0; i <= timersList['data'].length - 1; i++) {
                        Object.assign(timersList['data'][i], { 'stopped': true, 'started': false });
                        Helper.currentDayTimersList.push(timersList['data'][i]);
                    }
                    //console.log(Helper.currentDayTimersList);
                    Helper.initScheduleJob();
                    return [2 /*return*/];
            }
        });
    }); };
    Helper.initScheduleJob = function () {
        var job = schedule.scheduleJob('*/10 * * * * *', function (fireDate) {
            var currentTime = moment_1["default"]().format("HH:mm");
            //console.log('currentTime', currentTime)
            for (var i = 0; i <= Helper.currentDayTimersList.length - 1; i++) {
                if (currentTime == Helper.currentDayTimersList[i]['startTime']) {
                    if (Helper.mqttClient) {
                        if (!Helper.currentDayTimersList[i]['started'] && Helper.currentDayTimersList[i]['stopped']) {
                            Object.assign(Helper.currentDayTimersList[i], { 'started': true, 'stopped': false });
                            Helper.mqttClient.publishDataToDevice({
                                topic: Helper.currentDayTimersList[i]['deviceNumber'] + "/client/esp32/onoff",
                                data: "ON"
                            });
                        }
                    }
                    else {
                    }
                }
                else if (currentTime == Helper.currentDayTimersList[i]['stopTime']) {
                    if (Helper.mqttClient) {
                        if (!Helper.currentDayTimersList[i]['stopped'] && Helper.currentDayTimersList[i]['started']) {
                            Object.assign(Helper.currentDayTimersList[i], { 'stopped': true, 'started': false });
                            Helper.mqttClient.publishDataToDevice({
                                topic: Helper.currentDayTimersList[i]['deviceNumber'] + "/client/esp32/onoff",
                                data: "OFF"
                            });
                        }
                    }
                    else {
                        //console.log("no mqtt connection")
                    }
                }
            }
        });
    };
    Helper.setMqttClientConn = function (mqttClient) {
        Helper.mqttClient = mqttClient;
    };
    Helper.updateTimerList = function (timerObj, type) {
        var dayOffset = moment_1["default"]().isoWeekday();
        if (dayOffset == 7) {
            dayOffset = 0;
        }
        if (type == 'add') {
            if (timerObj['status'] && timerObj['days'][dayOffset]['checked']) {
                Helper.currentDayTimersList.push({
                    "_id": timerObj['_id'],
                    "deviceNumber": timerObj['deviceNumber'],
                    "startTime": timerObj['startTime'],
                    "stopTime": timerObj['stopTime'],
                    'stopped': true,
                    'started': false
                });
                //console.log("added")
            }
        }
        else if (type == 'update') {
            //console.log('in update')
            if (!timerObj['status'] || !timerObj['days'][dayOffset]['checked']) {
                for (var i = 0; i <= Helper.currentDayTimersList.length - 1; i++) {
                    if (Helper.currentDayTimersList[i]['_id'].toString() == timerObj['_id'].toString()) {
                        Helper.currentDayTimersList.splice(i, 1);
                        //console.log("removed")
                        break;
                    }
                }
            }
            else if (timerObj['status'] && timerObj['days'][dayOffset]['checked']) {
                //console.log('in update else', Helper.currentDayTimersList)
                var recordExist = false;
                for (var i = 0; i <= Helper.currentDayTimersList.length - 1; i++) {
                    //console.log('in update for', Helper.currentDayTimersList[i]['_id'], timerObj['_id'])
                    if (Helper.currentDayTimersList[i]['_id'].toString() == timerObj['_id'].toString()) {
                        //console.log('in update if')
                        Helper.currentDayTimersList[i] = {
                            "_id": timerObj['_id'],
                            "deviceNumber": timerObj['deviceNumber'],
                            "startTime": timerObj['startTime'],
                            "stopTime": timerObj['stopTime'],
                            'stopped': true,
                            'started': false
                        };
                        recordExist = true;
                        //console.log("updated")
                        break;
                    }
                }
                if (!recordExist) {
                    Helper.currentDayTimersList.push({
                        "_id": timerObj['_id'],
                        "deviceNumber": timerObj['deviceNumber'],
                        "startTime": timerObj['startTime'],
                        "stopTime": timerObj['stopTime']
                    });
                }
            }
        }
        else if (type == 'delete') {
            for (var i = 0; i <= Helper.currentDayTimersList.length - 1; i++) {
                if (Helper.currentDayTimersList[i]['_id'].toString() == timerObj['_id'].toString()) {
                    Helper.currentDayTimersList.splice(i, 1);
                    //console.log("removed")
                    break;
                }
            }
        }
    };
    return Helper;
}());
exports.Helper = Helper;
