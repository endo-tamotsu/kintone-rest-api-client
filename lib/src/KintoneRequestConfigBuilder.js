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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KintoneRequestConfigBuilder = void 0;
var form_data_1 = __importDefault(require("form-data"));
var qs_1 = __importDefault(require("qs"));
var js_base64_1 = require("js-base64");
var platform_1 = require("./platform/");
var DEFAULT_PROXY_PROTOCOL = "http";
var THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE = 4096;
var KintoneRequestConfigBuilder = /** @class */ (function () {
    function KintoneRequestConfigBuilder(options) {
        this.baseUrl = options.baseUrl;
        this.auth = options.auth;
        this.headers = this.buildHeaders({
            basicAuth: options.basicAuth,
            userAgent: options.userAgent,
        });
        if ("httpsAgent" in options) {
            if ("clientCertAuth" in options) {
                throw new Error("Cannot specify clientCertAuth along with httpsAgent.");
            }
            this.httpsAgent = options.httpsAgent;
        }
        else if ("clientCertAuth" in options) {
            this.clientCertAuth = options.clientCertAuth;
        }
        this.proxy = options.proxy;
        this.requestToken = null;
        this.socketTimeout = options.socketTimeout;
    }
    KintoneRequestConfigBuilder.prototype.build = function (method, path, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestConfig, _a, requestUrl, _b, formData, _c, _d, requestUrl, _e, _f;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        requestConfig = __assign(__assign(__assign({ method: method, headers: this.headers, url: "".concat(this.baseUrl).concat(path) }, (options ? options : {})), platform_1.platformDeps.buildPlatformDependentConfig({
                            httpsAgent: this.httpsAgent,
                            clientCertAuth: this.clientCertAuth,
                            socketTimeout: this.socketTimeout,
                        })), { proxy: this.buildProxyConfig(this.proxy) });
                        _a = method;
                        switch (_a) {
                            case "get": return [3 /*break*/, 1];
                            case "post": return [3 /*break*/, 4];
                            case "put": return [3 /*break*/, 8];
                            case "delete": return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 1:
                        requestUrl = this.buildRequestUrl(path, params);
                        if (!(requestUrl.length > THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE)) return [3 /*break*/, 3];
                        _b = [__assign({}, requestConfig)];
                        _g = { method: "post", headers: __assign(__assign({}, this.headers), { "X-HTTP-Method-Override": "GET" }) };
                        return [4 /*yield*/, this.buildData(params)];
                    case 2: return [2 /*return*/, __assign.apply(void 0, _b.concat([(_g.data = _k.sent(), _g)]))];
                    case 3: return [2 /*return*/, __assign(__assign({}, requestConfig), { url: requestUrl })];
                    case 4:
                        if (!(params instanceof form_data_1.default)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.buildData(params)];
                    case 5:
                        formData = _k.sent();
                        return [2 /*return*/, __assign(__assign({}, requestConfig), { headers: 
                                // NOTE: formData.getHeaders does not exist in a browser environment.
                                typeof formData.getHeaders === "function"
                                    ? __assign(__assign({}, this.headers), formData.getHeaders()) : this.headers, data: formData })];
                    case 6:
                        _c = [__assign({}, requestConfig)];
                        _h = {};
                        return [4 /*yield*/, this.buildData(params)];
                    case 7: return [2 /*return*/, __assign.apply(void 0, _c.concat([(_h.data = _k.sent(), _h)]))];
                    case 8:
                        _d = [__assign({}, requestConfig)];
                        _j = {};
                        return [4 /*yield*/, this.buildData(params)];
                    case 9: return [2 /*return*/, __assign.apply(void 0, _d.concat([(_j.data = _k.sent(), _j)]))];
                    case 10:
                        _e = this.buildRequestUrl;
                        _f = [path];
                        return [4 /*yield*/, this.buildData(params)];
                    case 11:
                        requestUrl = _e.apply(this, _f.concat([_k.sent()]));
                        return [2 /*return*/, __assign(__assign({}, requestConfig), { url: requestUrl })];
                    case 12:
                        {
                            throw new Error("".concat(method, " method is not supported"));
                        }
                        _k.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    KintoneRequestConfigBuilder.prototype.buildProxyConfig = function (proxyConfig) {
        var _a;
        if (proxyConfig === undefined) {
            return undefined;
        }
        if (proxyConfig === false) {
            return false;
        }
        var proxy = proxyConfig;
        if (proxy.auth &&
            (proxy.auth.username.length === 0 || proxy.auth.password.length === 0)) {
            proxy.auth = undefined;
        }
        proxy.protocol = (_a = proxy.protocol) !== null && _a !== void 0 ? _a : DEFAULT_PROXY_PROTOCOL;
        return proxy;
    };
    KintoneRequestConfigBuilder.prototype.buildRequestUrl = function (path, params) {
        return "".concat(this.baseUrl).concat(path, "?").concat(qs_1.default.stringify(params));
    };
    KintoneRequestConfigBuilder.prototype.buildData = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var requestToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.auth.type === "session")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRequestToken()];
                    case 1:
                        requestToken = _a.sent();
                        if (params instanceof form_data_1.default) {
                            params.append("__REQUEST_TOKEN__", requestToken);
                            return [2 /*return*/, params];
                        }
                        return [2 /*return*/, __assign({ __REQUEST_TOKEN__: requestToken }, params)];
                    case 2: return [2 /*return*/, params];
                }
            });
        });
    };
    KintoneRequestConfigBuilder.prototype.buildHeaders = function (params) {
        var basicAuth = params.basicAuth, userAgent = params.userAgent;
        var basicAuthHeaders = basicAuth
            ? {
                Authorization: "Basic ".concat(js_base64_1.Base64.encode("".concat(basicAuth.username, ":").concat(basicAuth.password))),
            }
            : {};
        var platformDepsHeaders = platform_1.platformDeps.buildHeaders({ userAgent: userAgent });
        var commonHeaders = __assign(__assign({}, platformDepsHeaders), basicAuthHeaders);
        switch (this.auth.type) {
            case "password": {
                return __assign(__assign({}, commonHeaders), { "X-Cybozu-Authorization": js_base64_1.Base64.encode("".concat(this.auth.username, ":").concat(this.auth.password)) });
            }
            case "apiToken": {
                var apiToken = this.auth.apiToken;
                if (Array.isArray(apiToken)) {
                    return __assign(__assign({}, commonHeaders), { "X-Cybozu-API-Token": apiToken.join(",") });
                }
                return __assign(__assign({}, commonHeaders), { "X-Cybozu-API-Token": apiToken });
            }
            case "oAuthToken": {
                return __assign(__assign({}, commonHeaders), { Authorization: "Bearer ".concat(this.auth.oAuthToken) });
            }
            default: {
                return __assign(__assign({}, commonHeaders), { "X-Requested-With": "XMLHttpRequest" });
            }
        }
    };
    KintoneRequestConfigBuilder.prototype.getRequestToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.requestToken === null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, platform_1.platformDeps.getRequestToken()];
                    case 1:
                        _a.requestToken = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.requestToken];
                }
            });
        });
    };
    return KintoneRequestConfigBuilder;
}());
exports.KintoneRequestConfigBuilder = KintoneRequestConfigBuilder;
//# sourceMappingURL=KintoneRequestConfigBuilder.js.map