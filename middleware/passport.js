const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GithubStrategy = require("passport-github2").Strategy;

var GITHUB_CLIENT_ID = "Ov23lijy3YSjFMB8JoUq";
var GITHUB_CLIENT_SECRET = "4ab0d3d4b07a8cfa818f6419faba4ee70d013e82";

const githubLogin = new GithubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const user = userController.findOrCreate(profile);
    return user 
      ? done(null, user)
      : done(null, false, {
          message: "Invalid Login Details. Please Try Again",
      });
  });

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(githubLogin);