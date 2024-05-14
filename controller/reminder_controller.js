let  { database } = require("../database");

let remindersController = {

  list: (req, res) => {
    let reminders = database.reminders;
    res.render("reminder/index", { reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.reminders.length + 1,
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      duedate: req.body.duedate,
      tag: req.body.tag,
      completed: false,
      priority: req.body.priority
    };
    database.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.type = req.body.type;
    searchResult.description = req.body.description;
    searchResult.duedate = req.body.duedate;
    searchResult.tag = req.body.tag;
    searchResult.completed = req.body.completed;
    searchResult.priority = req.body.priority;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = database.reminders.indexOf(searchResult);
    if (index > -1) {
      database.reminders.splice(index, 1);
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;