import express from 'express';
import userRoute from './routes/userRoutes.js';
import walletRoutes from './routes/walletRoutes.js';

const app = express()
app.use(express.json())

app.use('/users', userRoute);
app.use('/wallets', walletRoutes);

export default app