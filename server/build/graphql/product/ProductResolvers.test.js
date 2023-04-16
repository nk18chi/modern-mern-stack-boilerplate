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
const apollo_server_express_1 = require("apollo-server-express");
const Product_1 = require("../../models/Product");
const User_1 = require("../../models/User");
const database_1 = require("../../utils/database");
const schema_1 = __importDefault(require("../schema"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectTestDatabase)();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.clearDataBase)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.disconnectDataBase)();
}));
describe('ProductResolver', () => {
    describe('productMany Query', () => {
        it('get all products', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const user1 = yield User_1.User.create({ name: 'Naoki' });
            const user2 = yield User_1.User.create({ name: 'Taro' });
            yield Product_1.Product.create({ name: 'Product 1', user: user1._id });
            yield Product_1.Product.create({ name: 'Product 2', user: user1._id });
            yield Product_1.Product.create({ name: 'Product 3', user: user2._id });
            const apolloServer = new apollo_server_express_1.ApolloServer({
                schema: schema_1.default,
            });
            const res = yield apolloServer.executeOperation({
                query: `{
            productMany {
              name
              user {
                  name
              }
            }
          }`,
            });
            expect(res.errors).toBeUndefined();
            expect((_a = res.data) === null || _a === void 0 ? void 0 : _a.productMany).toEqual([
                { name: 'Product 1', user: { name: 'Naoki' } },
                { name: 'Product 2', user: { name: 'Naoki' } },
                { name: 'Product 3', user: { name: 'Taro' } },
            ]);
        }));
    });
});
