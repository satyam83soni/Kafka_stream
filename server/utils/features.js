import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.connect(url,{dbName: "dice-roll"})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB Connection Error: ', err);
    process.exit(1);
  });
};


export {connectDB}