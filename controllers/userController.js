const UserService = require("../service/userService");
const successResponse = require("../utils/successResponse");
const generateToken = require("../utils/tokenGenerator");
const jwt = require("jsonwebtoken");
const {user}=require("../lib/databaseConnection")
require("dotenv").config();

class UserController {
  async create(req, res, next) {
    try {

      if (req.file != undefined) {

        req.body.profile_pic = req.files;
      }
      let userData = await user.findOne({where:{username:req.body.username}});
      if (userData == null) {
        if(req.body.password==req.body.confirm_password) {
          await UserService.create(req.body);
          const token = generateToken(req.body);
          req.body.token = token;
          successResponse(res, 400, req.body, "User Created");
        }
        else{
          res.status(401).json({
            "message":"Password mismatch"
          })
        }
      } else {
        res.json({
          message: "User already exists",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userData = await UserService.update(req.body, id);
      successResponse(res, 200, userData, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const userData = await UserService.findAll();
      successResponse(res, 200, userData, "User fetched");
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const userData = await UserService.findById(id);
      if (userData == null) {
        res.status(404).json({ status: "404", message: "User Not Found" });
      } else {
        successResponse(res, 200, userData, "User fetched");
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      let userData = await UserService.findById(id);
      if (userData == null) {
        res.status(404).json({ status: "404", message: "User Not Found" });
      } else {
        const userData = await UserService.delete(id);
        successResponse(res, 200, userData, "User Deleted");
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      if (data == null) {
        res.status(404).json({
          message: "Your account doesnot exist",
        });
      } else {
        res.json(data);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      // console.log(decoded);
      const userData = await UserService.profile(decoded);
      successResponse(res, 200, userData, "User Profile");
    } catch (err) {
      next(err);
    }
  }
  async changePassword(req,res,next){
    try{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      const _user=await UserService.findById(decoded.sub)
      if(_user==null||_user==undefined){
        res.json({"message":"userNotFound"})
      }else {
        const userData = await UserService.update(req.body,decoded.sub)
        successResponse(res, 200, userData, "Password Changed");
      }
    }
    catch (err){
      next(err)
    }
  }
}




module.exports = new UserController();
