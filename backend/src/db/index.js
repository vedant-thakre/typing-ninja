import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`.bgMagenta.bold);
    }
    catch (error) {
        console.error("MongoDB connection failed".bgRed.bold, error);
        process.exit(1);
    }
}