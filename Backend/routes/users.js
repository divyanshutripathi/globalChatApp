var express = require("express");
var router = express.Router();
const USER = require("../models/userModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  USER.getAllData((err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: err,
      });
    } else {
      res.json({
        success: true,
        msg: user,
      });
    }
  });
});

router.post("/addUser", async (req, res) => {
  if (
    !req.body.user.username ||
    !req.body.user.email ||
    !req.body.user.password
  ) {
    res.json({
      success: false,
      msg: "Insufficient data!",
    });
  } else {
    try {
      const existingEmail = await USER.getbyEmail(req.body.user.email);
      if (existingEmail) {
        res.json({
          success: false,
          msg: "user already exist",
        });
      } else {
        userDetails = {
          username: req.body.user.username,
          email: req.body.user.email,
          password: req.body.user.password,
        };
        await USER.addUser(userDetails);
        res.json({
          success: true,
          msg: "user added successfully",
        });
      }
    } catch (err) {
      console.log("error : ", err);
    }
  }
});

router.post("/login", (req, res) => {
  if (!req.body.user.email || !req.body.user.password) {
    res.json({
      success: false,
      msg: "Insufficient Data",
    });
  } else {
    USER.getbyEmail(req.body.user.email, (err, resUser) => {
      if (err) {
        res.json({
          success: false,
          msg: err,
        });
      } else {
        if (!resUser) {
          res.json({
            success: false,
            msg: "user does not exist",
          });
        } else {
          if (resUser.password == req.body.user.password) {
            res.json({
              success: true,
              msg: "login successfull",
            });
          } else {
            res.json({
              success: false,
              msg: "password incorrect",
            });
          }
        }
      }
    });
  }
});

module.exports = router;
