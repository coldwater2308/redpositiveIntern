const express = require("express"); 
const dotenv = require('dotenv'); 
const dataRoutes= require("./routes/dataRoutes")
const connectDB = require("./config/db");
const app = express();

const mongoose = require("mongoose");

 dotenv.config(); 
 connectDB();

app.use(express.json());

app.use('/api/data',dataRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}


const PORT = process.env.PORT||5000;
app.listen(PORT , console.log("Server Running on Port 5000"));
