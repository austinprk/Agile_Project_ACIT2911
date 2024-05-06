const userModel = require("../models/userModel");
let { database } = require("../database");

const findOrCreate = (profile) => {
  let githubUser = userModel.GitCheck({id: profile.id});
  if (githubUser) {
    return githubUser;
  } else {
    let githubUser = userModel.create({
      id: profile.id,
      name: profile.username,
      provider: profile.provider,
    });
    return githubUser;
  }
};
const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};
