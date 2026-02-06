import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server Has Started at PORT:${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERRR", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log(" DataBase Connection Failed!! ", err);
  });
