require("dotenv").config()
const express = require("express");
const cors = require("cors")
const app = express();
const route = require("./src/routes/index")
const port = 2005;

app.use(cors())
app.use(express.json())
app.use("/app/v1",route);
app.use("/uploads",express.static("uploads"))


app.listen(port,()=>{
  console.log(`Listening ${port} is successfully`)
})