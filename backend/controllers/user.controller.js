import User from "../models/user.model.js";
import Account from "../models/accounts.model.js";
import jwt from "jsonwebtoken";
import zod from "zod";

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const loginBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

export const signup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username already taken / Incorrect inputs ",
    });
  }
  // cheack username is already exist or not in database
  const existingUsername = await User.findOne({ username: username });

  if (existingUsername) {
    return res.status(411).json({
      message: "Username already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance : Math.floor(1 + Math.random() *1000 )
  })
  const token = jwt.sign({ userId: userId }, process.env.JWt_SECRETE_KEY);

  return res.status(200).json({
    message: "User created successfully",
    tokne: token,
  });
};

export const signin = async (req, res) => {
  const { success } = loginBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Username already taken / Incorrect inputs ",
    });
  }
  const { username, password } = req.body;

  const user = await User.findOne({ username: username, password: password });

  if (!user) {
    return res.status(411).json({
      message: "User not found Please signUp",
    });
  }

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWt_SECRETE_KEY
    );

    res.cookie("token", token).json({
      message: "signin sucessfull",
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
};

export const updateProfile = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  try {
    const userId = req.id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        updatedUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in updatedProfileHandler",
    });
  }
};

export const bulk = async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter } },
            { lastName: { "$regex": filter } },
          ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in bulk handler",
    });
  }
};
