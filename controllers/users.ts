import { NextApiRequest, NextApiResponse } from "next";
import db from "../models/index";
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import { IUser } from "../types/interfaces";

db.sequelize.sync();
const UserModel = db.users;

export async function addUser(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: unknown } | string>
) {
  let { id, name, email } = req.body;
  try {
    //check email and name format
    if (!isLength(name, {min: 3, max: 15})) {
      return res.status(422).send("Name must be 3-10 characters long");
    } else if (!isEmail(email)){
        return res.status(422).send("Email must be valid");
    }
    // Check if user with that email if already exists
    const user = await UserModel.findOne({
      where: { email: email }
    })
    if(user){
        return res.status(422).send(`User already exist with that ${email}`)
    }
    const newUser = await UserModel.create({
      id,
      name,
      email,
    });
    return res.status(201).json(newUser);

  } catch (error) {
    console.log('Error in addUser controller', error);
    res.status(500).json({ error });
  }
}