let assignment_sort = {
    sortAssignmentsByDueDate: function() {
        var reminders = document.getElementsByClassName("list-group-item");
        var remindersArray = Array.from(reminders);
        remindersArray.sort(function(a, b) {
          var dueDate1 = new Date(a.querySelector(".duedate").textContent);
          var dueDate2 = new Date(b.querySelector(".duedate").textContent);
          return dueDate1 - dueDate2;
        });
        var list = document.querySelector(".list-group");
        list.innerHTML = "";
        remindersArray.forEach(function(reminder) {
          list.appendChild(reminder);
        });
      },
      sortAssignmentsByType: function() {
        var reminders = document.getElementsByClassName("list-group-item");
        var remindersArray = Array.from(reminders);
        remindersArray.sort(function(a, b) {
          var typeA = a.querySelector(".type").textContent;
          var typeB = b.querySelector(".type").textContent;
          return typeA.localeCompare(typeB);
        });
        var list = document.querySelector(".list-group");
        list.innerHTML = "";
        remindersArray.forEach(function(reminder) {
          list.appendChild(reminder);
        });
      }
};

module.exports = assignment_sort;


