import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
// import ideaRoutes from './routes/ideaRoutes.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());

app.use('/api/users', userRoutes);
// app.use('/api', ideaRoutes); // All idea routes will be prefixed with /api


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
}

main().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
