import fs, { readFileSync } from 'fs';
const wallets = JSON.parse(readFileSync('./data/wallets.json', 'utf-8'));

const checkAmount = function (req, res, next) {
  const id = req.params.id;
  const wallet = wallets.find(w => w.id == id);

  if (wallet && wallet.sold - req.body.amount < 0) {
    return res.status(400)
      .json({
        status: 'cannot withdraw because sold will be under 0',
        data: { wallet }
      })
  }
  next();
}

export { checkAmount }