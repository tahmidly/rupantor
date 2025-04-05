import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('MongoDB is already connected');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable MongoDB buffering for writes
    };

    console.log('Attempting to connect to MongoDB...');
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/rupantor`, opts)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        throw error; // Rethrow to propagate the error
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
