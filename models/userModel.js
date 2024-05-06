let { database } = require("../database");
let userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  create: (newUser) => {
    database.push(newUser);
    return newUser;
  },
  checkRole : (user) => {
    if(user.role === 'admin') {
      res.redirect("/admin");
    }
  },
  GitCheck: (profile) => {
    const user = database.find((user) => user.id === profile.id);
    if (user) {
      return user;
    }
    return null;
},
};

module.exports = userModel ;
