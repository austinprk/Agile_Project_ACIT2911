let  { database } = require("../database");


let calendar_controller = {
    list : (req, res) => {
        let user = database.find((user => user.name === req.user.name));
        res.render("./calendar", { reminders: user.reminders, isLoggedIn: calendar_controller.isLoggedIn});
    }
};


module.exports = calendar_controller;
