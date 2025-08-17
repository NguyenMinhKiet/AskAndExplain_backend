import express from 'express';
import mongoose from 'mongoose';
import { ErrorMiddlewares } from './middlewares/index.middleware.js';
import Routes from './routes/index.routes.js';
import cors from 'cors';
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // cho phép từ frontend
    credentials: true, // nếu có dùng cookie/session
}));
app.use('/api', Routes);
app.use(ErrorMiddlewares);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/askandexplain';
console.log('Connecting to MongoDB at:', MONGO_URI);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Dừng app nếu không kết nối được DB
});
export default app;
//# sourceMappingURL=app.js.map