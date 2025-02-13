"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppClient = void 0;
var url_1 = require("../url");
var AppClient = /** @class */ (function () {
    function AppClient(client, guestSpaceId) {
        this.client = client;
        this.guestSpaceId = guestSpaceId;
    }
    AppClient.prototype.getFormFields = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/form/fields",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.addFormFields = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/form/fields",
            preview: true,
        });
        return this.client.post(path, params);
    };
    AppClient.prototype.updateFormFields = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/form/fields",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.deleteFormFields = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/form/fields",
            preview: true,
        });
        return this.client.delete(path, params);
    };
    AppClient.prototype.getFormLayout = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/form/layout",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.updateFormLayout = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/form/layout",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getViews = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/views",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updateViews = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/views",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getApp = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app",
        });
        return this.client.get(path, params);
    };
    AppClient.prototype.getApps = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "apps",
        });
        return this.client.get(path, params);
    };
    AppClient.prototype.addApp = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, space, path, spacePath, defaultThread;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = params.name, space = params.space;
                        path = this.buildPathWithGuestSpaceId({
                            endpointName: "app",
                            preview: true,
                        });
                        if (!space) return [3 /*break*/, 2];
                        spacePath = this.buildPathWithGuestSpaceId({
                            endpointName: "space",
                        });
                        return [4 /*yield*/, this.client.get(spacePath, {
                                id: space,
                            })];
                    case 1:
                        defaultThread = (_a.sent()).defaultThread;
                        return [2 /*return*/, this.client.post(path, __assign(__assign({}, params), { thread: defaultThread }))];
                    case 2: return [2 /*return*/, this.client.post(path, { name: name })];
                }
            });
        });
    };
    AppClient.prototype.getAppSettings = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/settings",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updateAppSettings = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/settings",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getProcessManagement = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/status",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updateProcessManagement = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/status",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getDeployStatus = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/deploy",
            preview: true,
        });
        return this.client.get(path, params);
    };
    AppClient.prototype.deployApp = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/deploy",
            preview: true,
        });
        return this.client.post(path, params);
    };
    AppClient.prototype.getFieldAcl = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "field/acl",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.updateFieldAcl = function (params) {
        // NOTE: When executing this API without `preview`,
        // all pre-live app's settings will be deployed to live app.
        // This behavior may not be what the users expected,
        // so we disable it temporarily.
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "field/acl",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getAppAcl = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/acl",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.updateAppAcl = function (params) {
        // NOTE: When executing this API without `preview`,
        // all pre-live app's settings will be deployed to live app.
        // This behavior may not be what the users expected,
        // so we disable it temporarily.
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/acl",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.evaluateRecordsAcl = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records/acl/evaluate",
        });
        return this.client.get(path, params);
    };
    AppClient.prototype.getRecordAcl = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/acl",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.updateRecordAcl = function (params) {
        // NOTE: When executing this API without `preview`,
        // all pre-live app's settings will be deployed to live app.
        // This behavior may not be what the users expected,
        // so we disable it temporarily.
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/acl",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getAppCustomize = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/customize",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.updateAppCustomize = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/customize",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getGeneralNotifications = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/notifications/general",
            preview: preview,
        });
        return this.client.get(path, __assign({}, rest));
    };
    AppClient.prototype.updateGeneralNotifications = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/notifications/general",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getPerRecordNotifications = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/notifications/perRecord",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updatePerRecordNotifications = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/notifications/perRecord",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getReminderNotifications = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/notifications/reminder",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updateReminderNotifications = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/notifications/reminder",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getReports = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/reports",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updateReports = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/reports",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.getAppActions = function (params) {
        var preview = params.preview, rest = __rest(params, ["preview"]);
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/actions",
            preview: preview,
        });
        return this.client.get(path, rest);
    };
    AppClient.prototype.updateAppActions = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "app/actions",
            preview: true,
        });
        return this.client.put(path, params);
    };
    AppClient.prototype.buildPathWithGuestSpaceId = function (params) {
        return (0, url_1.buildPath)(__assign(__assign({}, params), { guestSpaceId: this.guestSpaceId }));
    };
    return AppClient;
}());
exports.AppClient = AppClient;
//# sourceMappingURL=AppClient.js.map