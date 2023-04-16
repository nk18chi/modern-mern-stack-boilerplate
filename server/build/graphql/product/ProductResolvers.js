"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const Product_1 = require("../../models/Product");
const ProductTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(Product_1.Product);
exports.ProductTC = ProductTC;
