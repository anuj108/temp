import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("1");
  try {
    console.log("2");
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    try {
      await newUser.save();
      //save is present in mongoose to save the document
    } catch (err) {
      console.log(err);
    }
    const token = jwt.sign( { email: newUser.email, id: newUser._id },"test",{ expiresIn: "1h" } );

    console.log(newUser);
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went worng...");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("3");
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email},
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went worng...");
  }
};
