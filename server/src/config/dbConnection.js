import mongoose from "mongoose";
mongoose.set("strictQuery", false); //to ignore strict mode

const connectionToDDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB is conneected");
  } catch (error) {
    console.log(`C0onnection Failed to MONGO DB , ${error}`);
    process.exit(1);
  }
};

export default connectionToDDB;
