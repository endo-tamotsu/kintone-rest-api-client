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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordClient = void 0;
var url_1 = require("./../url");
var KintoneAllRecordsError_1 = require("../error/KintoneAllRecordsError");
var ADD_RECORDS_LIMIT = 100;
var UPDATE_RECORDS_LIMIT = 100;
var DELETE_RECORDS_LIMIT = 100;
var RecordClient = /** @class */ (function () {
    function RecordClient(client, bulkRequestClient, guestSpaceId) {
        this.client = client;
        this.bulkRequestClient = bulkRequestClient;
        this.guestSpaceId = guestSpaceId;
        this.didWarnMaximumOffsetValue = false;
    }
    RecordClient.prototype.getRecord = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record",
        });
        return this.client.get(path, params);
    };
    RecordClient.prototype.addRecord = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record",
        });
        return this.client.post(path, params);
    };
    RecordClient.prototype.updateRecord = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record",
        });
        return this.client.put(path, params);
    };
    RecordClient.prototype.upsertRecord = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var app, updateKey, record, records, revision;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        app = params.app, updateKey = params.updateKey, record = params.record;
                        return [4 /*yield*/, this.getRecords({
                                app: app,
                                query: "".concat(updateKey.field, " = \"").concat(updateKey.value, "\""),
                            })];
                    case 1:
                        records = (_b.sent()).records;
                        if (!(records.length > 0)) return [3 /*break*/, 4];
                        if (!(records[0].$id.type === "__ID__")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateRecord(params)];
                    case 2:
                        revision = (_b.sent()).revision;
                        return [2 /*return*/, { id: records[0].$id.value, revision: revision }];
                    case 3: throw new Error("Missing `$id` in `getRecords` response. This error is likely caused by a bug in Kintone REST API Client. Please file an issue.");
                    case 4: return [2 /*return*/, this.addRecord({
                            app: app,
                            record: Object.assign({}, record, (_a = {},
                                _a[updateKey.field] = { value: updateKey.value },
                                _a)),
                        })];
                }
            });
        });
    };
    // TODO: `records` type in return type should be filtered by `fields`.
    RecordClient.prototype.getRecords = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.buildPathWithGuestSpaceId({
                            endpointName: "records",
                        });
                        return [4 /*yield*/, this.client.get(path, params)];
                    case 1:
                        response = _a.sent();
                        this.warnMaximumOffsetValueIfNeeded(params.query);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    RecordClient.prototype.warnMaximumOffsetValueIfNeeded = function (query) {
        if (query) {
            var regexp = /offset\s+(\d+)/i;
            var result = query.match(regexp);
            if (!this.didWarnMaximumOffsetValue &&
                result &&
                Number(result[1]) > 10000) {
                this.didWarnMaximumOffsetValue = true;
                console.warn("Warning: The maximum offset value will be limited to 10,000 in the future. Please use `createCursor()` and `getRecordsByCursor()` instead.");
            }
        }
    };
    RecordClient.prototype.addRecords = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _a, ids, revisions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        path = this.buildPathWithGuestSpaceId({
                            endpointName: "records",
                        });
                        return [4 /*yield*/, this.client.post(path, params)];
                    case 1:
                        _a = _b.sent(), ids = _a.ids, revisions = _a.revisions;
                        return [2 /*return*/, {
                                ids: ids,
                                revisions: revisions,
                                records: ids.map(function (id, i) { return ({ id: id, revision: revisions[i] }); }),
                            }];
                }
            });
        });
    };
    RecordClient.prototype.updateRecords = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records",
        });
        return this.client.put(path, params);
    };
    RecordClient.prototype.deleteRecords = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records",
        });
        return this.client.delete(path, params);
    };
    RecordClient.prototype.createCursor = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records/cursor",
        });
        return this.client.post(path, params);
    };
    RecordClient.prototype.getRecordsByCursor = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records/cursor",
        });
        return this.client.get(path, params);
    };
    RecordClient.prototype.deleteCursor = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records/cursor",
        });
        return this.client.delete(path, params);
    };
    RecordClient.prototype.getAllRecords = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, orderBy, _a, withCursor, rest, conditionQuery, query;
            return __generator(this, function (_b) {
                condition = params.condition, orderBy = params.orderBy, _a = params.withCursor, withCursor = _a === void 0 ? true : _a, rest = __rest(params, ["condition", "orderBy", "withCursor"]);
                if (!orderBy) {
                    return [2 /*return*/, this.getAllRecordsWithId(__assign(__assign({}, rest), { condition: condition }))];
                }
                if (withCursor) {
                    conditionQuery = condition ? "".concat(condition, " ") : "";
                    query = "".concat(conditionQuery).concat(orderBy ? "order by ".concat(orderBy) : "");
                    return [2 /*return*/, this.getAllRecordsWithCursor(__assign(__assign({}, rest), { query: query }))];
                }
                return [2 /*return*/, this.getAllRecordsWithOffset(__assign(__assign({}, rest), { orderBy: orderBy, condition: condition }))];
            });
        });
    };
    RecordClient.prototype.getAllRecordsWithId = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var originalFields, rest, fields;
            return __generator(this, function (_a) {
                originalFields = params.fields, rest = __rest(params, ["fields"]);
                fields = originalFields;
                // Append $id if $id doesn't exist in fields
                if (fields && fields.length > 0 && fields.indexOf("$id") === -1) {
                    fields = __spreadArray(__spreadArray([], fields, true), ["$id"], false);
                }
                return [2 /*return*/, this.getAllRecordsRecursiveWithId(__assign(__assign({}, rest), { fields: fields }), "0", [])];
            });
        });
    };
    RecordClient.prototype.getAllRecordsRecursiveWithId = function (params, id, records) {
        return __awaiter(this, void 0, void 0, function () {
            var GET_RECORDS_LIMIT, condition, rest, conditionQuery, query, result, allRecords, lastRecord, lastId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        GET_RECORDS_LIMIT = 500;
                        condition = params.condition, rest = __rest(params, ["condition"]);
                        conditionQuery = condition ? "(".concat(condition, ") and ") : "";
                        query = "".concat(conditionQuery, "$id > ").concat(id, " order by $id asc limit ").concat(GET_RECORDS_LIMIT);
                        return [4 /*yield*/, this.getRecords(__assign(__assign({}, rest), { query: query }))];
                    case 1:
                        result = _a.sent();
                        allRecords = records.concat(result.records);
                        if (result.records.length < GET_RECORDS_LIMIT) {
                            return [2 /*return*/, allRecords];
                        }
                        lastRecord = result.records[result.records.length - 1];
                        if (lastRecord.$id.type === "__ID__") {
                            lastId = lastRecord.$id.value;
                            return [2 /*return*/, this.getAllRecordsRecursiveWithId(params, lastId, allRecords)];
                        }
                        throw new Error("Missing `$id` in `getRecords` response. This error is likely caused by a bug in Kintone REST API Client. Please file an issue.");
                }
            });
        });
    };
    RecordClient.prototype.getAllRecordsWithOffset = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getAllRecordsRecursiveWithOffset(params, 0, [])];
            });
        });
    };
    RecordClient.prototype.getAllRecordsRecursiveWithOffset = function (params, offset, records) {
        return __awaiter(this, void 0, void 0, function () {
            var GET_RECORDS_LIMIT, condition, orderBy, rest, conditionQuery, query, result, allRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        GET_RECORDS_LIMIT = 500;
                        condition = params.condition, orderBy = params.orderBy, rest = __rest(params, ["condition", "orderBy"]);
                        conditionQuery = condition ? "".concat(condition, " ") : "";
                        query = "".concat(conditionQuery).concat(orderBy ? "order by ".concat(orderBy, " ") : "", "limit ").concat(GET_RECORDS_LIMIT, " offset ").concat(offset);
                        return [4 /*yield*/, this.getRecords(__assign(__assign({}, rest), { query: query }))];
                    case 1:
                        result = _a.sent();
                        allRecords = records.concat(result.records);
                        if (result.records.length < GET_RECORDS_LIMIT) {
                            return [2 /*return*/, allRecords];
                        }
                        return [2 /*return*/, this.getAllRecordsRecursiveWithOffset(params, offset + GET_RECORDS_LIMIT, allRecords)];
                }
            });
        });
    };
    RecordClient.prototype.getAllRecordsWithCursor = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createCursor(params)];
                    case 1:
                        id = (_a.sent()).id;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.getAllRecordsRecursiveByCursor(id, [])];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.deleteCursor({ id: id })];
                    case 5:
                        _a.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RecordClient.prototype.getAllRecordsRecursiveByCursor = function (id, records) {
        return __awaiter(this, void 0, void 0, function () {
            var result, allRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRecordsByCursor({ id: id })];
                    case 1:
                        result = _a.sent();
                        allRecords = records.concat(result.records);
                        if (result.next) {
                            return [2 /*return*/, this.getAllRecordsRecursiveByCursor(id, allRecords)];
                        }
                        return [2 /*return*/, allRecords];
                }
            });
        });
    };
    RecordClient.prototype.addAllRecords = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!params.records.every(function (record) { return !Array.isArray(record) && record instanceof Object; })) {
                    throw new Error("the `records` parameter must be an array of object.");
                }
                return [2 /*return*/, this.addAllRecordsRecursive(params, params.records.length, [])];
            });
        });
    };
    RecordClient.prototype.addAllRecordsRecursive = function (params, numOfAllRecords, results) {
        return __awaiter(this, void 0, void 0, function () {
            var CHUNK_LENGTH, app, records, recordsChunk, newResults, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CHUNK_LENGTH = this.bulkRequestClient.REQUESTS_LENGTH_LIMIT * ADD_RECORDS_LIMIT;
                        app = params.app, records = params.records;
                        recordsChunk = records.slice(0, CHUNK_LENGTH);
                        if (recordsChunk.length === 0) {
                            return [2 /*return*/, { records: results }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.addAllRecordsWithBulkRequest({
                                app: app,
                                records: recordsChunk,
                            })];
                    case 2:
                        newResults = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw new KintoneAllRecordsError_1.KintoneAllRecordsError({ records: results }, records, numOfAllRecords, e_1, ADD_RECORDS_LIMIT);
                    case 4: return [2 /*return*/, this.addAllRecordsRecursive({
                            app: app,
                            records: records.slice(CHUNK_LENGTH),
                        }, numOfAllRecords, results.concat(newResults))];
                }
            });
        });
    };
    RecordClient.prototype.addAllRecordsWithBulkRequest = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var separatedRecords, requests, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        separatedRecords = this.separateArrayRecursive(ADD_RECORDS_LIMIT, [], params.records);
                        requests = separatedRecords.map(function (records) { return ({
                            method: "POST",
                            endpointName: "records",
                            payload: {
                                app: params.app,
                                records: records,
                            },
                        }); });
                        return [4 /*yield*/, this.bulkRequestClient.send({ requests: requests })];
                    case 1:
                        results = (_a.sent())
                            .results;
                        return [2 /*return*/, results
                                .map(function (result) {
                                var ids = result.ids, revisions = result.revisions;
                                return ids.map(function (id, i) { return ({ id: id, revision: revisions[i] }); });
                            })
                                .reduce(function (acc, records) {
                                return acc.concat(records);
                            }, [])];
                }
            });
        });
    };
    RecordClient.prototype.updateAllRecords = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateAllRecordsRecursive(params, params.records.length, [])];
            });
        });
    };
    RecordClient.prototype.updateAllRecordsRecursive = function (params, numOfAllRecords, results) {
        return __awaiter(this, void 0, void 0, function () {
            var CHUNK_LENGTH, app, records, recordsChunk, newResults, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CHUNK_LENGTH = this.bulkRequestClient.REQUESTS_LENGTH_LIMIT * UPDATE_RECORDS_LIMIT;
                        app = params.app, records = params.records;
                        recordsChunk = records.slice(0, CHUNK_LENGTH);
                        if (recordsChunk.length === 0) {
                            return [2 /*return*/, { records: results }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.updateAllRecordsWithBulkRequest({
                                app: app,
                                records: recordsChunk,
                            })];
                    case 2:
                        newResults = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        throw new KintoneAllRecordsError_1.KintoneAllRecordsError({ records: results }, records, numOfAllRecords, e_2, UPDATE_RECORDS_LIMIT);
                    case 4: return [2 /*return*/, this.updateAllRecordsRecursive({
                            app: app,
                            records: records.slice(CHUNK_LENGTH),
                        }, numOfAllRecords, results.concat(newResults))];
                }
            });
        });
    };
    RecordClient.prototype.updateAllRecordsWithBulkRequest = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var separatedRecords, requests, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        separatedRecords = this.separateArrayRecursive(UPDATE_RECORDS_LIMIT, [], params.records);
                        requests = separatedRecords.map(function (records) { return ({
                            method: "PUT",
                            endpointName: "records",
                            payload: {
                                app: params.app,
                                records: records,
                            },
                        }); });
                        return [4 /*yield*/, this.bulkRequestClient.send({ requests: requests })];
                    case 1:
                        results = (_a.sent())
                            .results;
                        return [2 /*return*/, results
                                .map(function (result) { return result.records; })
                                .reduce(function (acc, records) {
                                return acc.concat(records);
                            }, [])];
                }
            });
        });
    };
    RecordClient.prototype.deleteAllRecords = function (params) {
        return this.deleteAllRecordsRecursive(params, params.records.length);
    };
    RecordClient.prototype.deleteAllRecordsRecursive = function (params, numOfAllRecords) {
        return __awaiter(this, void 0, void 0, function () {
            var CHUNK_LENGTH, app, records, recordsChunk, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CHUNK_LENGTH = this.bulkRequestClient.REQUESTS_LENGTH_LIMIT * DELETE_RECORDS_LIMIT;
                        app = params.app, records = params.records;
                        recordsChunk = records.slice(0, CHUNK_LENGTH);
                        if (recordsChunk.length === 0) {
                            return [2 /*return*/, {}];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deleteAllRecordsWithBulkRequest({
                                app: app,
                                records: recordsChunk,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        throw new KintoneAllRecordsError_1.KintoneAllRecordsError({}, records, numOfAllRecords, e_3, DELETE_RECORDS_LIMIT);
                    case 4: return [2 /*return*/, this.deleteAllRecordsRecursive({
                            app: app,
                            records: records.slice(CHUNK_LENGTH),
                        }, numOfAllRecords)];
                }
            });
        });
    };
    RecordClient.prototype.deleteAllRecordsWithBulkRequest = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var separatedRecords, requests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        separatedRecords = this.separateArrayRecursive(DELETE_RECORDS_LIMIT, [], params.records);
                        requests = separatedRecords.map(function (records) { return ({
                            method: "DELETE",
                            endpointName: "records",
                            payload: {
                                app: params.app,
                                ids: records.map(function (record) { return record.id; }),
                                revisions: records.map(function (record) { return record.revision; }),
                            },
                        }); });
                        return [4 /*yield*/, this.bulkRequestClient.send({ requests: requests })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecordClient.prototype.separateArrayRecursive = function (size, separated, array) {
        var chunk = array.slice(0, size);
        if (chunk.length === 0) {
            return separated;
        }
        return this.separateArrayRecursive(size, __spreadArray(__spreadArray([], separated, true), [chunk], false), array.slice(size));
    };
    RecordClient.prototype.addRecordComment = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/comment",
        });
        return this.client.post(path, params);
    };
    RecordClient.prototype.deleteRecordComment = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/comment",
        });
        return this.client.delete(path, params);
    };
    RecordClient.prototype.getRecordComments = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/comments",
        });
        return this.client.get(path, params);
    };
    RecordClient.prototype.updateRecordAssignees = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/assignees",
        });
        return this.client.put(path, params);
    };
    RecordClient.prototype.updateRecordStatus = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "record/status",
        });
        return this.client.put(path, params);
    };
    RecordClient.prototype.updateRecordsStatus = function (params) {
        var path = this.buildPathWithGuestSpaceId({
            endpointName: "records/status",
        });
        return this.client.put(path, params);
    };
    RecordClient.prototype.buildPathWithGuestSpaceId = function (params) {
        return (0, url_1.buildPath)(__assign(__assign({}, params), { guestSpaceId: this.guestSpaceId }));
    };
    return RecordClient;
}());
exports.RecordClient = RecordClient;
//# sourceMappingURL=RecordClient.js.map