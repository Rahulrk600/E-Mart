import mongoose from "mongoose";
import { DB_NAME } from "../constanst.js";

const connectDB = async ()=>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.URI}/${DB_NAME}`)
    console.log(`\n MONGODB connected !! DB host: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.error("MONGODB connection error", error)
    process.exit(1);
  }
}
export{connectDB}

//"mongodb://127.0.0.1:27017"
// mongodb+srv://rahulbca600:rahul77799@cluster0.2e33ssn.mongodb.net