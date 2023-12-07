import mongoose from"mongoose"
import {DB_NAME} from"constat.js"

import express from"express";
 const app = express();


const connectDb = async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       app.on("error",(error)=>{
        console.log("error",error)
       });

       app.listen((process.env.PORT || 8000),()=>{
        console.log(`server is listening on port ${process.env.PORT}`)
       })

    }catch(error){console.log(error)}
}

connectDb();
