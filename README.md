# Beginner's Guide to "ParkYourAssignment"

Welcome to "ParkYourAssignment"! This application is designed to help students organize their assignments efficiently. Below are detailed instructions and explanations of the features, files, and functions used in this application.

---

## Purpose of the Application

The purpose of "ParkYourAssignment" is to help students manage and track their assignments by providing a user-friendly interface to view, add, edit, and delete assignments. It includes features such as sorting assignments by due date, type, and priority, as well as displaying a calendar view of upcoming assignments.

---

## File Structure and Features

### 1. `server.js`
**Purpose**: Sets up the Express server and routes for handling HTTP requests.

**Features**:
- Uses `express` for server setup.
- Handles static files from the `public` directory.
- Parses URL-encoded data.
- Sets up EJS as the view engine.
- Defines routes for the homepage, assignments, and calendar.



### 2. `views/reminder/index.ejs`
**Purpose**: Displays the list of assignments.

**Features**:
- Provides sorting buttons for due date, type, and priority.
- Displays assignment details including title, type, due date, description, priority, and status.
- Allows adding, editing, and deleting assignments through forms and buttons.
- Includes a search bar for filtering assignments by title or tag.

### 3. `views/calendar.ejs`
**Purpose**: Displays assignments in a calendar view.

**Features**:
- Shows a calendar with assignments marked on their due dates.
- Provides buttons to navigate between months.
- Highlights assignments based on priority.

### 4. `views/home.ejs`
**Purpose**: Serves as the main dashboard displaying urgent assignments.

**Features**:
- Shows the current date and time.
- Lists top 3 urgent assignments with their details.
- Updates the clock every second.

### 5. `views/layout.ejs`
**Purpose**: Acts as a layout template for other views.

**Features**:
- Includes Bootstrap for styling.
- Embeds the body content of other EJS files.

### 6. `database.js`
**Purpose**: Simulates a database for storing assignment data.

**Features**:
- Contains an array of assignments objects with properties such as id, title, type, description, due date, tag, completed status, and priority.
- Provides functions to get all assignments, get a assignment by ID, add a new assignment, update a assignment, and delete a assignment.


---

## Setting Up the Application

1. **Install Node.js**: Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Dependencies**:
   - Navigate to your project directory in the terminal.
   - Run the following command to install necessary dependencies:
     ```bash
     npm install express express-ejs-layouts
     ```

3. **Run the Server**:
   - Start the server by running:
     ```bash
     node server.js
     ```
   - Open your browser and go to `http://localhost:3001/`.

---

## Features Explained

1. **Dashboard**:
   - Displays urgent assignments.
   - Shows the current date and time.

2. **Reminders**:
   - Lists all assignments.
   - Allows adding new assignments, editing existing ones, and deleting assignments.
   - Provides options to sort assignments by due date, type, and priority.

3. **Calendar**:
   - Displays assignments in a calendar view.
   - Highlights assignments based on their due dates and priorities.
   - Allows navigation between months.

4. **CRUD Operations**:
   - **Create**: Add new assignments.
   - **Read**: View details of assignments.
   - **Update**: Edit existing assignments.
   - **Delete**: Remove assignments.



