const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/User.model")
// const { blockedUser } = require("../middleware/blockedUser.middleware")
const userRoutes = express.Router()


userRoutes.post("/register", async (req, res) => {
    const { useremail, password } = req.body
    // console.log(useremail, password)
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                let user = new UserModel({ useremail, password:hash })
                await user.save()
                res.send("Register SuccessFull")
            }
        })
    } catch (err) {
        res.send("Registration Failed")
    }
})

userRoutes.post("/login",async (req, res) => {
    const { useremail, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ useremail });
  
      if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
          if (result) {
            
          
            const token = jwt.sign({ _id: user._id }, process.env.key);
            res.status(200).json({
              status: "success",
              data: user,
              message: "Login successfull!",
              token: token,
            });
          } else {
            
            res.status(401).json({
              status: "error",
              message: "Invalid Credentials",
            });
          }
        });
      } else {
        res.status(401).json({
          status: "error",
          message: "User doesn't exist",
        });
      }
    } catch (error) {
    
      res.status(500).json({
        status: "error",
        message: "Error occurred while fetching data",
      });
    }
  }) ;
  
module.exports = { userRoutes }
