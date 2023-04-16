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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDataBase = exports.clearDataBase = exports.connectTestDatabase = exports.connectDatabase = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("config"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const MONGO_URI = config_1.default.get('DATABASE_URL');
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to mongo', MONGO_URI);
    }
    catch (e) {
        console.log('Error connecting to mongo', e);
    }
});
exports.connectDatabase = connectDatabase;
let mongod;
const connectTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const MONGO_TEST_URI = mongod.getUri();
        console.log('MONGO_TEST_URI', MONGO_TEST_URI);
        yield (0, mongoose_1.connect)(MONGO_TEST_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (e) {
        console.log('Error connecting to mongo', e);
    }
});
exports.connectTestDatabase = connectTestDatabase;
const clearDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.connection.dropDatabase();
});
exports.clearDataBase = clearDataBase;
const disconnectDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongod)
        yield mongod.stop();
    yield (0, mongoose_1.disconnect)();
});
exports.disconnectDataBase = disconnectDataBase;
