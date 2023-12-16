import app from "./app.js";
import connectionToDDB from "./config/dbConnection.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORTS || 5000;
connectionToDDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is runniing at POrt ${PORT}`);
  });
});
