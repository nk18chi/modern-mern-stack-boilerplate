"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_compose_1 = require("graphql-compose");
const UserResolvers_1 = require("./user/UserResolvers");
const UserTypeDef_1 = require("./user/UserTypeDef");
const ProductResolvers_1 = require("./product/ProductResolvers");
const resolvers = {};
const apiResolvers = [(0, UserResolvers_1.userResolvers)()];
apiResolvers.forEach((apiResolver) => {
    const keys = Object.keys(apiResolver);
    keys.forEach((key) => {
        if (resolvers[key]) {
            resolvers[key] = Object.assign(Object.assign({}, resolvers[key]), apiResolver[key]);
        }
        else {
            resolvers[key] = apiResolver[key];
        }
    });
});
const initialTypeDef = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
const typeDefs = [initialTypeDef, UserTypeDef_1.userTypeDef];
let typeDef = '';
for (const def of typeDefs) {
    typeDef += def;
}
graphql_compose_1.schemaComposer.addTypeDefs(typeDef);
graphql_compose_1.schemaComposer.addResolveMethods(resolvers);
ProductResolvers_1.ProductTC.addRelation('user', {
    resolver: UserResolvers_1.UserTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.user,
    },
    projection: { user: true },
});
graphql_compose_1.schemaComposer.Query.addFields({
    userById: UserResolvers_1.UserTC.getResolver('findById'),
    userMany: UserResolvers_1.UserTC.getResolver('findMany'),
    productById: ProductResolvers_1.ProductTC.getResolver('findById'),
    productMany: ProductResolvers_1.ProductTC.getResolver('findMany'),
});
graphql_compose_1.schemaComposer.Mutation.addFields({
    userCreateOne: UserResolvers_1.UserTC.getResolver('createOne'),
});
const schema = graphql_compose_1.schemaComposer.buildSchema();
exports.default = schema;
