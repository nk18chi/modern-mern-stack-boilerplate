"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDef = void 0;
exports.userTypeDef = `
    extend type Query {
        user(name: String!): String
    }
    extend type Mutation {
        loginUser(email: String!, password: String!): Boolean
    }
`;
