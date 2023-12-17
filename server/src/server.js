import app from "./app.js";
import connectionToDDB from "./config/dbConnection.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config({
  path: "./.env",
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORTS || 5000;
connectionToDDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is runniing at POrt ${PORT}`);
  });
});
