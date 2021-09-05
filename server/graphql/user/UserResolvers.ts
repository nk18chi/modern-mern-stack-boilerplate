import { composeWithMongoose } from 'graphql-compose-mongoose';
import { User } from '../../models/User';

const userResolvers = () => ({
  Query: {
    user: async (_: any, { name }: any) => {
      // you can add some operations
      return 'query user ' + name;
    },
  },
  Mutation: {
    createUser: async (_: any, { name }: any) => {
      // you can add some operations
      return 'create user ' + name;
    },
  },
});

const UserTC = composeWithMongoose(User);
UserTC.wrapResolverResolve('updateOne', (next) => async (rp) => {
  rp.beforeRecordMutate = async (doc: any, resolveParams: any) => {
    // you can add some operations
    return doc;
  };
  return next(rp);
});

export { UserTC, userResolvers };
