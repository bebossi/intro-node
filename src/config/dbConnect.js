import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false); 

async function connect() {
    try {
      const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
  
      console.log(`Connect to DB: ${dbConnect.connection.name}`);
      const db = dbConnect.connection
      return db
    } catch (error) {
      console.log(error);
    }
  }

export default connect;  