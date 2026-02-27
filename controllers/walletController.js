// import { readUsers } from "./userController.js";
import fs, { writeFile } from 'fs'
let walletIdCounter = 0;
// let wallets =[];


const wallets = JSON.parse(fs.readFileSync(`./data/wallets.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`./data/users.json`, 'utf-8'));

const writeWallet = () => {
    fs.writeFileSync('./data/wallets.json', JSON.stringify(wallets));
};

const createWallet = (req, res, next) => {
    const { userID, name } = req.body;
    const userExist = users.find(u => u.id == userID);
    if (!userExist) {
        return res.status(404).json({ message: 'user dose not exist' });
    }

    const newWallet = {
        id: wallets.length ? wallets[wallets.length - 1].id + 1 : 1,
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
        });
    });
}

const getAllWallets = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: wallets.length,
        data: {
            wallets
        }
    });
};

const getWalletById = (req, res) => {
    const id = req.params.id * 1;

    const wallet = wallets.find(w => w.id === id);

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

const updateWallet = (req, res) => {
    const id = req.params.id;
    const wallet = wallets.find(w => w.id == id);

    if (!wallet) {
        return res.status(404).json({
            status: 'fail',
            message: 'cannot find wallet'
        });
    };
    wallet.name = req.body.name;
    writeWallet();

    res.status(200).json({
        status: "success",
        data: {
            wallet
        }
    })
};

const deleteWallet = (req, res) => {
    const id = req.params.id * 1;

    const walletIndex = wallets.findIndex(w => w.id === id);

    if (walletIndex == -1) {
        return res.status(404).json({
            status: "fail",
            message: "cannot find wallet"
        });
    };

    wallets.splice(walletIndex, 1);

    writeWallet();

    res.status(200).json({
        status: "success",
        message: "wallet has been delete successfully"
    });
}
//-------------------- deposit ------------------------

const deposit = (req, res, body) => {
    const { amount } = req.body
    const id = req.params.id
    const depositAmount = Number(amount)

    if (!depositAmount || depositAmount <= 0)
        return res.status(404).json({ status: 'fail', message: "invalid amount!" })

    const wallet = wallets.find(w => w.id == id);
    if (!wallet)
        return res.status(404).json({ status: 'fail', message: "cannot find wallet" });

    wallet.sold += depositAmount;

    writeWallet();

    res.status(200).json({ status: "success", data: { wallet } })
};
//-------------------- withdraw ------------------------
const withdraw = (req, res) => {
    const { amount } = req.body
    const id = req.params.id
    const depositAmount = Number(amount)

    if (!depositAmount || depositAmount <= 0)
        return res.status(400).json({ status: 'fail', message: "invalid amount!" })

    const wallet = wallets.find(w => w.id == id);

    console.log(wallet);

    if (!wallet)
        return res.status(404).json({ status: 'fail', message: "cannot find wallet" });

    wallet.sold = wallet.sold - depositAmount;

    writeWallet();

    res.status(200).json({ status: "success", data: { wallet } })
}

export {
    createWallet,
    getAllWallets,
    getWalletById,
    deleteWallet,
    updateWallet,
    deposit,
    withdraw
}