const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const calendar_controller = require("./controller/calendar_controller");
const reminderController = require("./controller/reminder_controller");
const home_reminder = require("./controller/home_reminders");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);


app.set("view engine", "ejs");

app.get("/", home_reminder.list);

app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);

app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

app.get("/calendar", calendar_controller.list);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/ in your browser"
  );
});

exports.app = app;