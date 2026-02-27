import express from 'express';
import { createWallet, deleteWallet, deposit, getAllWallets, getWalletById, updateWallet, withdraw } from '../controllers/walletController.js';
const route = express.Router();

route.post('/', createWallet);
route.get('/', getAllWallets);
route.get('/:id', getWalletById);
route.delete('/:id', deleteWallet);
route.put('/:id', updateWallet);
route.post('/:id', deposit);
route.post('/:id', withdraw);

export default route