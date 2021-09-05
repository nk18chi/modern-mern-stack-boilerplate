export const userTypeDef = `
    extend type Query {
        user(name: String!): String
    }
    extend type Mutation {
        createUser(name: String!): String
    }
`;
