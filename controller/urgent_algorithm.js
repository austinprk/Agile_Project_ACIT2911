const { database } = require('./database');

const getTopUrgentAssignments = () => {
  const { reminders } = database;

  // get today date
  const today = new Date();

  // string -> Date
  const parseDate = (dateStr) => new Date(dateStr);

  // sorting reminders by priority then duedate
  reminders.sort((a, b) => {
    if (!a.completed && !b.completed) {
      if (a.priority !== b.priority) {
        return parseInt(b.priority) - parseInt(a.priority);
      } else {
        return parseDate(a.duedate) - parseDate(b.duedate);
      }
    }
    else if (!a.completed) {
      return -1;
    } else if (!b.completed) {
      return 1;
    } else {
      if (a.priority !== b.priority) {
        return parseInt(b.priority) - parseInt(a.priority);
      } else {
        return parseDate(a.duedate) - parseDate(b.duedate);
      }
    }
  });

  // top 3 urgent assignments
  return reminders.filter(reminder => !reminder.completed).slice(0, 3);
};

module.exports = { getTopUrgentAssignments };



// const getTopUrgentAssignments = (assignments) => {
//     const today = new Date();
//     const parseDate = (dateStr) => new Date(dateStr);
  
//     assignments.sort((a, b) => {
//       if (a.priority !== b.priority) {
//         return b.priority - a.priority; // priority first
//       } else {
//         return parseDate(a.dueDate) - parseDate(b.dueDate); // due date second
//       }
//     });
  
//     return assignments.slice(0, 3); // top 3
//   };
  
//   module.exports = { getTopUrgentAssignments };