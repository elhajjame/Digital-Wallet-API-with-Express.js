import express from 'express';
import { createWallet, getAllWallets, getWalletById } from '../controllers/walletController.js';
const route = express.Router();

route.post('/', createWallet);
route.get('/', getAllWallets);
route.get('/:id', getWalletById);

export default route