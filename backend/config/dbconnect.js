import mongoose from "mongoose";

const dbconnect = () => {
  let dbURI = process.env.DBURI;
  mongoose.connect(dbURI).catch((err) => console.log(err));
};
export default dbconnect;
