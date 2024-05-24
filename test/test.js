const assert = require('assert');
const server = require('../server');
const remindersController = require('../controller/reminder_controller');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { database } = require('../database');
const { sortAssignmentsByDueDate, sortAssignmentsByType } = require('../controller/assignments_sort');
const { searchAssignments } = require('../controller/assignments_search');


describe('Reminders Controller', function () {
  beforeEach(function () {
    database.reminders = [];
  });

  describe('#list()', function () {
    it('should render the index page with reminders', function () {
      const req = {};
      const res = {
        render: function (view, data) {
          assert.strictEqual(view, 'reminder/index');
          assert.deepStrictEqual(data.reminders, database.reminders);
        }
      };
      remindersController.list(req, res);
    });
  });

  // describe('#new()', function () {
  //   it('should render the create page', function () {
  //     const req = {};
  //     const res = {
  //       render: function (view) {
  //         assert.strictEqual(view, 'reminder/create');
  //       }
  //     };
  //     remindersController.new(req, res);
  //   });
  // });

  describe('#listOne()', function () {
    it('should render the single reminder page if found', function () {
      const reminder = { id: 1, title: 'Test Reminder' };
      database.reminders.push(reminder);
      const req = { params: { id: '1' } };
      const res = {
        render: function (view, data) {
          assert.strictEqual(view, 'reminder/single-reminder');
          assert.deepStrictEqual(data.reminderItem, reminder);
        }
      };
      remindersController.listOne(req, res);
    });

    it('should render the index page if reminder not found', function () {
      const req = { params: { id: '1' } };
      const res = {
        render: function (view, data) {
          assert.strictEqual(view, 'reminder/index');
          assert.deepStrictEqual(data.reminders, database.reminders);
        }
      };
      remindersController.listOne(req, res);
    });
  });

  describe('#create()', function () {
    it('should create a new reminder and redirect to /reminders', function () {
      const req = {
        body: {
          title: 'Test Reminder',
          type: 'Test Type',
          description: 'Test Description',
          duedate: '2024-05-15',
          tag: 'Test Tag',
          priority: 1
        }
      };
      const res = {
        redirect: function (url) {
          assert.strictEqual(url, '/reminders');
          assert.strictEqual(database.reminders.length, 1);
        }
      };
      remindersController.create(req, res);
    });
  });

  describe('#edit()', function () {
    it('should render the edit page for an existing reminder', function () {
      const reminder = { id: 1, title: 'Test Reminder' };
      database.reminders.push(reminder);
      const req = { params: { id: '1' } };
      const res = {
        render: function (view, data) {
          assert.strictEqual(view, 'reminder/edit');
          assert.deepStrictEqual(data.reminderItem, reminder);
        }
      };
      remindersController.edit(req, res);
    });
  });

  describe('#update()', function () {
    it('should update an existing reminder and redirect to /reminders', function () {
      const reminder = { id: 1, title: 'Test Reminder' };
      database.reminders.push(reminder);
      const req = {
        params: { id: '1' },
        body: {
          title: 'Updated Title',
          type: 'Updated Type',
          description: 'Updated Description',
          duedate: '2024-05-20',
          tag: 'Updated Tag',
          completed: true,
          priority: 3
        }
      };
      const res = {
        redirect: function (url) {
          assert.strictEqual(url, '/reminders');
          const updatedReminder = database.reminders.find(rem => rem.id === 1);
          assert.deepStrictEqual(updatedReminder, {
            id: 1,
            title: 'Updated Title',
            type: 'Updated Type',
            description: 'Updated Description',
            duedate: '2024-05-20',
            tag: 'Updated Tag',
            completed: false, 
            priority: 3
          });
        }
      };
      remindersController.update(req, res);
    });
  });
  
  describe('#delete()', function () {
    it('should delete an existing reminder and redirect to /reminders', function () {
      const reminder = { id: 1, title: 'Test Reminder' };
      database.reminders.push(reminder);
      const req = { params: { id: '1' } };
      const res = {
        redirect: function (url) {
          assert.strictEqual(url, '/reminders');
          assert.strictEqual(database.reminders.length, 0);
        }
      };
      remindersController.delete(req, res);
    });
  });
});

describe('sortAssignmentsByDueDate', () => {
  it('should sort assignments by due date in ascending order', () => {

    const dom = new JSDOM(`
      <html>
        <body>
          <div class="list-group">
            <div class="list-group-item">
              <span class="duedate">2022-01-01</span>
            </div>
            <div class="list-group-item">
              <span class="duedate">2022-01-03</span>
            </div>
            <div class="list-group-item">
              <span class="duedate">2022-01-02</span>
            </div>
          </div>
        </body>
      </html>
    `);

    global.document = dom.window.document;

    sortAssignmentsByDueDate();

    const sortedAssignments = Array.from(document.getElementsByClassName("list-group-item"));

    assert.strictEqual(sortedAssignments[0].querySelector(".duedate").textContent, '2022-01-01');
    assert.strictEqual(sortedAssignments[1].querySelector(".duedate").textContent, '2022-01-02');
    assert.strictEqual(sortedAssignments[2].querySelector(".duedate").textContent, '2022-01-03');
  });
});

describe('sortAssignmentsByType', () => {
  it('should sort assignments by type in ascending order', () => {
      
      const dom = new JSDOM(`
        <html>
          <body>
            <div class="list-group">
              <div class="list-group-item">
                <span class="type">A</span>
              </div>
              <div class="list-group-item">
                <span class="type">C</span>
              </div>
              <div class="list-group-item">
                <span class="type">B</span>
              </div>
            </div>
          </body>
        </html>
      `);

      global.document = dom.window.document;

      sortAssignmentsByType();

      const sortedAssignments = Array.from(document.getElementsByClassName("list-group-item"));

      assert.strictEqual(sortedAssignments[0].querySelector(".type").textContent, 'A');
      assert.strictEqual(sortedAssignments[1].querySelector(".type").textContent, 'B');
      assert.strictEqual(sortedAssignments[2].querySelector(".type").textContent, 'C');
  });
});


describe('searchAssignments', () => {
  it('should filter assignments based on search input', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <input id="searchInput" type="text" value="Test">
          <div class="list-group">
            <li style="display: none;"><strong>Assignment 1</strong></li>
            <li style="display: none;"><strong>Assignment 2</strong></li>
            <li style="display: none;"><strong>Test Assignment</strong></li>
          </div>
        </body>
      </html>
    `);

    global.document = dom.window.document;

    searchAssignments();

    const filteredAssignments = Array.from(document.querySelectorAll('.list-group li'));

    assert.strictEqual(filteredAssignments[2].style.display, '');
  });
});
