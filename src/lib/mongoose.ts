import mongoose from 'mongoose';

type CacheType = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/link-fl';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

// Extend the global type so TypeScript knows about our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: CacheType | undefined;
}

// Use the global cache if it exists
const cached: CacheType = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
