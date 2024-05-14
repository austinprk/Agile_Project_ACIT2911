let  { database } = require("../database");


let calendar_controller = {
    list : (req, res) => {
        let reminders = database.reminders;
        res.render("./calendar", { reminders });
    }
};


module.exports = calendar_controller;
