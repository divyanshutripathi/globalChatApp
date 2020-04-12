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
  console.log(req.body);
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.json({
      success: false,
      msg: "Insufficient data!",
    });
  } else {
    try {
      const existingEmail = await USER.getbyEmail(req.body.email);
      if (existingEmail) {
        res.json({
          success: false,
          msg: "user already exist",
        });
      } else {
        userDetails = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        };
        await USER.addUser(userDetails);
        console.log("after saving");
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
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      msg: "Insufficient Data",
    });
  } else {
    USER.getbyEmail(req.body.email, (err, resUser) => {
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
          if (resUser.password == req.body.password) {
            console.log("successfull", resUser);
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
