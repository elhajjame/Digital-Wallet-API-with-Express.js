import express from 'express';
import { createWallet, deleteWallet, deposit, getAllWallets, getWalletById, updateWallet, withdraw } from '../controllers/walletController.js';
import { checkAmount } from '../middlewares/errorMiddleware.js';
const route = express.Router();

route.post('/', createWallet);
route.get('/', getAllWallets);
route.get('/:id', getWalletById);
route.delete('/:id', deleteWallet);
route.put('/:id', updateWallet);
route.post('/:id/deposit', deposit);
route.post('/:id/withdraw', checkAmount, withdraw);

export default route