// ! Remove this part
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evnoieq.mongodb.net/gobuynext?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
      console.log(process.env.DB_USER);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
main();
