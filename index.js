import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";

const app = express();
dotenv.config();

// Constants

mongoose.set("strictQuery", false); // отключение строгого режима
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes
// http://localhost:4000
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://timer:zQtsi9M29OOtfTra@durelen.k7oaicx.mongodb.net/?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
