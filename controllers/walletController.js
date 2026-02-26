import { readUsers } from "./userController.js";
import fs from 'fs'
let walletIdCounter = 0;
// let wallets =[];

const wallets = JSON.parse(fs.readFileSync(`./data/wallets.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`./data/users.json`, 'utf-8'));
console.log(wallets);
const createWallet = (req, res, next) => {
    const { userID, name } = req.body;
    const userExist = users.find(u => u.id === userID);
    console.log(userExist);
    if (!userExist) {
        return res.status(404).json({ message: 'user dose not exist' });
    }

    const newWallet = {
        id:  wallets.length ? wallets[wallets.length - 1].id + 1 : 1,
        userID,
        name,
        sold: 0
    };

    wallets.push(newWallet);

    fs.writeFile(`./data/wallets.json`, JSON.stringify(wallets), err => {
        res.status(200).json({
            status: "success",
            data: {
                wallet: newWallet
            }
        })
    });
}

const getAllWallets = (req, res) => {
    req.status(200).json({
        status: 'success',
        result: wallets.length,
        data: {
            wallets
        }
    });
};

const getWalletById = (req, res) => {
    const id = req.params.id * 1;
    console.log(id);
    const wallet = wallets.find(w => w.id === id);
    console.log(wallet);

    if (!wallet) {
        return res.status(404).json({
            status: "fail",
            message: "cannot find wallet"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            wallet
        }
    })
}
// const updateWallet = (req, res)=>{
//     if(wall)
// }

export {
    createWallet, getAllWallets, getWalletById
}