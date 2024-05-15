let  { database } = require("../database");


let home_reminder = {
    list : (req, res) => {
        let reminders = database.reminders;
        res.render("./home", { reminders });
    }
};


module.exports = home_reminder;
