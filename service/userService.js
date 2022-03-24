const { user } = require("../lib/databaseConnection");
const { order,role } = require("../lib/databaseConnection");
const bcrypt = require("bcrypt");
const {passwordMismatchException}=require("../exceptions/passwordMismatchException")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
const {tokenExpiredException}=require("../exceptions/tokenExpiredException")
const generateToken = require("../utils/tokenGenerator");
class UserService {
  async create(payload) {
    //check profile pic of user
    if (payload.file != undefined) {

      payload.profile_pic = payload.files;
    }
    let userData = await user.findOne({where:{username:payload.username}});//fetch user
    if (userData == null) {
      if(payload.password==payload.confirm_password) {
    const saltRounds = 10;//password hash
            const { password } = payload;
   const salt = await  bcrypt.genSalt(saltRounds);
   const hash = await    bcrypt.hash(password, salt);
   payload.password = hash;

      const data = await user.create(payload);
      return data;

  }else{
        throw new passwordMismatchException();
      }
    }
    else{
      throw new alreadyExistsException("User");
    }
  }

  async update(payload, id) {
    let userData = await user.findOne({where:{id}});
    if (userData != null) {//check if user exists

    const saltRounds = 10;
    const { password } = payload;
    if(password!=null) {//if password given then hash
      const salt = await bcrypt.genSalt(saltRounds)
      const hash = await bcrypt.hash(password, salt)

      payload.password = hash;
    }


        const returnData =  user.update(payload, {
          where: {id},
        });
        return returnData;

    }
    else{
      throw new notFoundException("User");
    }
  }


  async findAll() {
    const returnData = await user.findAll({include:order},{attributes:{exclude:["password","createdAt","updatedAt"]}});
    return returnData;
  }

  async findById(id) {
    const returnData = await user.findOne({ where: { id },include:order });
    if(returnData===null){
      throw new notFoundException("User")
    }
    return returnData;
  }
  async delete(id) {
    let userData = await this.findById(id);
    if(userData===null){
      throw new notFoundException("User")
    }
    const returnData = await user.destroy({ where: { id } });
    return returnData;
  }
  async login(payload) {
    const { username, password } = payload;
    let _user = await user.findOne({ where: { username: username } });
    if (_user != null) {
      const compared = await bcrypt.compare(password, _user.password);
      if (compared) {
        const token = generateToken(_user);
        return token;
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new notFoundException("User");
    }
  }

  async profile(decoded) {
    //TODO:tokenexpired

    let _user = await user.findOne({
      where: {
        id: decoded.sub,
      },include:{order,role},
      attributes: { exclude: ["password", "createdAt", "updatedAt","id"] },
    });
    return _user;
  }
  async changePassword(payload){
    const decoded=payload.decoded
    const user=this.findById(decoded.sub);
    const compared = await bcrypt.compare(payload.oldPassword, user.password);
    if(compared){
      const data=await this.update(payload,decoded.sub)
      return data
    }
    else{
      throw new passwordMismatchException()
    }
  }
}



module.exports = new UserService();
