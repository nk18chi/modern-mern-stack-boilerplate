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
const User_1 = require("../../models/User");
require("../../utils/testSetup");
const apolloServer_1 = require("../../utils/apolloServer");
const apolloServer = (0, apolloServer_1.createApolloServer)({});
describe('UserResolver', () => {
    describe('createUser Mutation', () => {
        it('create a user to DB', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const res = yield apolloServer.executeOperation({
                query: `
          mutation UserCreateOne($record: CreateOneUsersInput!) {
            userCreateOne(record: $record) {
              record {
                name
                email
              }
            }
          }
        `,
                variables: {
                    record: {
                        name: 'Naoki',
                        email: 'naoki@example.com',
                        password: 'password',
                    },
                },
            });
            expect(res.errors).toBeUndefined();
            expect((_a = res.data) === null || _a === void 0 ? void 0 : _a.userCreateOne.record).toEqual({
                name: 'Naoki',
                email: 'naoki@example.com',
            });
            expect(yield User_1.User.count()).toEqual(1);
        }));
    });
    describe('login Mutation', () => {
        const LOGIN_USER = `
      mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password)
      }
    `;
        it('succeed to login', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const res = yield apolloServer.executeOperation({
                query: LOGIN_USER,
                variables: {
                    email: 'naoki@example.com',
                    password: 'password',
                },
            });
            expect(res.errors).toBeUndefined();
            expect((_a = res.data) === null || _a === void 0 ? void 0 : _a.loginUser).toEqual(true);
        }));
        it('fail to login with wrong email', () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const res = yield apolloServer.executeOperation({
                query: LOGIN_USER,
                variables: {
                    email: 'naoki2@example.com',
                    password: 'password',
                },
            });
            expect(res.errors).toBeUndefined();
            expect((_b = res.data) === null || _b === void 0 ? void 0 : _b.loginUser).toEqual(false);
        }));
        it('fail to login with wrong pass', () => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            const res = yield apolloServer.executeOperation({
                query: LOGIN_USER,
                variables: {
                    email: 'naoki@example.com',
                    password: 'passwords',
                },
            });
            expect(res.errors).toBeUndefined();
            expect((_c = res.data) === null || _c === void 0 ? void 0 : _c.loginUser).toEqual(false);
        }));
    });
});
