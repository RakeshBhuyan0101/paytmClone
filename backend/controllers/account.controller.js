import mongoose from "mongoose";
import Account from "../models/accounts.model.js";

export const getBalance = async (req, res) => {
  const userId = req.id;

  try {
    const UserBalance = await Account.findOne({ userId: userId });
    if (!UserBalance) {
      return res.status(400).json({
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      UserBalance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const transferMoney = async (req , res ) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount , to} = req.body

    const account = await Account.findOne({userId : req.id}).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            message : "Insufficent balance"
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session)
    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            message : "Invalid account"
        })
    }

    // perform the transaction
    await Account.updateOne( { userId : req.id} , {$inc : {balance : -amount}}).session(session)
    await Account.updateOne ( {userId : to} , {$inc : {balance : amount}} ).session(session)

    await session.commitTransaction()

    res.json({
        message : "transfer Successfull"
    })
}