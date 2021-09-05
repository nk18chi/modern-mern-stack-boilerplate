import { connect, ConnectOptions } from 'mongoose';
import config from 'config';
import { MongoMemoryServer } from 'mongodb-memory-server';

const MONGO_URI: string = config.get('DATABASE.URI');
const mongoMemoryServer = new MongoMemoryServer();
// const mongod = await MongoMemoryServer.create();
// const MONGO_URI = mongod.getUri();

const connectDatabase = async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Successfuly connected to mongo', MONGO_URI);
  } catch (e) {
    console.log('Error connecting to mongo', e);
  }
};

export default connectDatabase;
