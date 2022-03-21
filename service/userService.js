const { user } = require("../lib/databaseConnection");
const { order } = require("../lib/databaseConnection");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokenGenerator");
class UserService {
  async create(payload) {
    const saltRounds = 10;
    const { password } = payload;
   const salt = await  bcrypt.genSalt(saltRounds);
   const hash = await    bcrypt.hash(password, salt);
        payload.password = hash;

      const data = await user.create(payload);
      return data;

  }

  async update(payload, id) {
    const saltRounds = 10;
    const { password } = payload;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          return err;
        }

        payload.password = hash;

        const returnData =  user.update(payload, {
          where: {id},
          attributes: {exclude: ["createdAt", "updatedAt"]},
        });
        return returnData;
      })
    })}


  async findAll() {
    const returnData = await user.findAll({include:order},{attributes:{exclude:["password","createdAt","updatedAt"]}});
    return returnData;
  }

  async findById(id) {
    const returnData = await user.findOne({ where: { id },include:order });
    return returnData;
  }
  async delete(id) {
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
        return { message: "Invalid Password" };
      }
    } else {
      return _user;
    }
  }

  async profile(decoded) {
    let _user = await user.findOne({
      where: {
        id: decoded.sub,
      },include:order,
      attributes: { exclude: ["password", "createdAt", "updatedAt","id"] },
    });
    return _user;
  }
}



module.exports = new UserService();
