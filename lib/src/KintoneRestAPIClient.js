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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KintoneRestAPIClient = void 0;
var BulkRequestClient_1 = require("./client/BulkRequestClient");
var AppClient_1 = require("./client/AppClient");
var RecordClient_1 = require("./client/RecordClient");
var FileClient_1 = require("./client/FileClient");
var http_1 = require("./http/");
var KintoneRequestConfigBuilder_1 = require("./KintoneRequestConfigBuilder");
var KintoneResponseHandler_1 = require("./KintoneResponseHandler");
var platform_1 = require("./platform");
var UnsupportedPlatformError_1 = require("./platform/UnsupportedPlatformError");
var buildDiscriminatedAuth = function (auth) {
    if ("username" in auth) {
        return __assign({ type: "password" }, auth);
    }
    if ("apiToken" in auth) {
        return __assign({ type: "apiToken" }, auth);
    }
    if ("oAuthToken" in auth) {
        return __assign({ type: "oAuthToken" }, auth);
    }
    try {
        return platform_1.platformDeps.getDefaultAuth();
    }
    catch (e) {
        if (e instanceof UnsupportedPlatformError_1.UnsupportedPlatformError) {
            throw new Error("session authentication is not supported in ".concat(e.platform, " environment."));
        }
        throw e;
    }
};
var KintoneRestAPIClient = /** @class */ (function () {
    function KintoneRestAPIClient(options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c;
        validateOptions(options);
        this.baseUrl = platform_1.platformDeps
            .buildBaseUrl(options.baseUrl)
            .replace(/\/+$/, ""); // Remove trailing slash
        var auth = buildDiscriminatedAuth((_a = options.auth) !== null && _a !== void 0 ? _a : {});
        var requestConfigBuilder = new KintoneRequestConfigBuilder_1.KintoneRequestConfigBuilder(__assign(__assign({}, options), { baseUrl: this.baseUrl, auth: auth }));
        var responseHandler = new KintoneResponseHandler_1.KintoneResponseHandler({
            enableAbortSearchError: (_c = (_b = options.featureFlags) === null || _b === void 0 ? void 0 : _b.enableAbortSearchError) !== null && _c !== void 0 ? _c : false,
        });
        var httpClient = new http_1.DefaultHttpClient({
            responseHandler: responseHandler,
            requestConfigBuilder: requestConfigBuilder,
        });
        var guestSpaceId = options.guestSpaceId;
        this.bulkRequest_ = new BulkRequestClient_1.BulkRequestClient(httpClient, guestSpaceId);
        this.record = new RecordClient_1.RecordClient(httpClient, this.bulkRequest_, guestSpaceId);
        this.app = new AppClient_1.AppClient(httpClient, guestSpaceId);
        this.file = new FileClient_1.FileClient(httpClient, guestSpaceId);
    }
    Object.defineProperty(KintoneRestAPIClient, "version", {
        get: function () {
            return platform_1.platformDeps.getVersion();
        },
        enumerable: false,
        configurable: true
    });
    KintoneRestAPIClient.prototype.getBaseUrl = function () {
        return this.baseUrl;
    };
    KintoneRestAPIClient.prototype.bulkRequest = function (params) {
        return this.bulkRequest_.send(params);
    };
    return KintoneRestAPIClient;
}());
exports.KintoneRestAPIClient = KintoneRestAPIClient;
var validateOptions = function (options) {
    validateBaseUrl(options.baseUrl);
    validateGuestSpaceId(options.guestSpaceId);
    validateSocketTimeout(options.socketTimeout);
};
var validateBaseUrl = function (baseUrl) {
    if (baseUrl === undefined) {
        return;
    }
    var url = new URL(baseUrl);
    if (url.hostname !== "localhost" && url.protocol !== "https:") {
        throw new Error('The protocol of baseUrl must be "https".');
    }
};
var validateGuestSpaceId = function (guestSpaceId) {
    if (guestSpaceId === "" || guestSpaceId === null) {
        throw new Error("invalid guestSpaceId: got [".concat(guestSpaceId, "]"));
    }
};
var validateSocketTimeout = function (socketTimeout) {
    if (socketTimeout === undefined) {
        return;
    }
    var number = parseFloat(socketTimeout.toString());
    if (isNaN(number) || number < 0) {
        throw new Error("Invalid socketTimeout. Must be a positive number.");
    }
};
//# sourceMappingURL=KintoneRestAPIClient.js.map