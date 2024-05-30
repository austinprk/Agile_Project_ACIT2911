let  { database } = require("../database");

let home_reminder = {
    list: (req, res) => {
        let reminders = database.reminders;
        let currentDate = new Date();
        let urgentReminders = reminders.filter(reminderItem => {
            let dueDate = new Date(reminderItem.duedate);
            let dateDiff = dueDate.getTime() - currentDate.getTime();
            let oneDay = 24 * 60 * 60 * 1000;
            return !reminderItem.completed && dateDiff <= 365 * oneDay;
        }).sort((a, b) => new Date(a.duedate) - new Date(b.duedate)) 
        .slice(0, 3); 

        res.render("./home", { reminders: urgentReminders });
    }
};

module.exports = home_reminder;
