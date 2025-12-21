import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// Create an asynchronous function that connects to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DB_URL );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Optionally, listen for any errors or open events for the DB connection
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to DB:', err);
});

mongoose.connection.on('open', () => {
  console.log('Successfully connected to MongoDB');
});
