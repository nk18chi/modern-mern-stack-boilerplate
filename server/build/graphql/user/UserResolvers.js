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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = exports.UserTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const User_1 = require("../../models/User");
const userResolvers = () => ({
    Mutation: {
        loginUser: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            // you can add some operations
            return email === 'naoki@example.com' && password === 'password';
        }),
    },
});
exports.userResolvers = userResolvers;
const UserTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(User_1.User);
exports.UserTC = UserTC;
UserTC.wrapResolverResolve('updateOne', (next) => (rp) => __awaiter(void 0, void 0, void 0, function* () {
    rp.beforeRecordMutate = (doc, resolveParams) => __awaiter(void 0, void 0, void 0, function* () {
        // you can add some operations
        return doc;
    });
    return next(rp);
}));
