const UserModel = require("../Models/user-model");
class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter); //based on this filter we are finding if a user is present or not.
    return user;
  }
  async createUser(data) {
    const user = await UserModel.create(data); //if not present we are creating the user.
    return user;
  }
}

module.exports = { userService: new UserService() };
