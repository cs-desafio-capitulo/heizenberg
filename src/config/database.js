import mongoose from 'mongoose';
import env from './env';
mongoose.Promise = Promise;

const mongodbUrl = env.db.url || 'mongodb://localhost:27017/test';

const connect = () => mongoose.connect(mongodbUrl, {
  useMongoClient: true,
});

export default {
  connect,
};
