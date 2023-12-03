import express from "express";
import mongoose from "mongoose";

import cors from 'cors';
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import dotenv from 'dotenv';
import answerRoutes from "./routes/Answers.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use('/',(req, res) => {
//     res.send("This is a stack overflow clone API")
// })

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);


const PORT = process.env.PORT || 5000;

const CONNECTION_URL='mongodb+srv://anuj:anuj@cluster0.yi6kazl.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(
    `mongodb+srv://anuj:anuj@cluster0.yi6kazl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("DATABASE IS CONNECTED AND I AM LISTENING TO PORT 5000");
  })
  .catch((err) => {
    console.log(err);
  });
