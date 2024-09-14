import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;

    if (!mongoUri) {
      console.error('MONGO_URI is not defined in environment variables.');
      return;
    }
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
