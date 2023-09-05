const express = require('express');
require("dotenv").config()
const cors = require("cors")
const connect   = require("./configs/db.js")
const app = express();
const {userRoutes} = require("./routes/User.route.js")
app.use(cors())
app.use(express.json())

app.use("/user",userRoutes)

app.listen(process.env.port,async ()=>{
    await connect()
    console.log("server is running on port 8080")
})