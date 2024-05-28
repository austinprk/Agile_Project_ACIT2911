let database = {
    reminders: [
        {
            id: 1,
            title: "ACIT2911",
            type: "Project",
            description: "Agile project presentation",
            duedate: "2024-05-31",
            tag: "#Agile #Project",
            completed: false,
            priority: 2,
        },
        {
            id: 2,
            title: "ACIT2520",
            type: "Lab",
            description: "Lab 5 due date",
            duedate: "2024-12-23",
            tag: "#Lab #ACIT2520",
            completed: false,
            priority: 3,
        },
        {
            id: 3,
            title: "ACIT4770",
            type: "Quiz",
            description: "Assignment 2 due date",
            duedate: "2024-06-21",
            tag: "#Lab #ACIT4770",
            completed: false,
            priority: 1,
            
        },
        {
            id : 4,
            title : "ACIT2811",
            type : "Lab",
            description : "Lab 7 due date",
            duedate : "2024-05-31",
            tag : "#Lab #ACIT2811",
            completed : false,
            priority : 2,
        },
        {
            id : 5,
            title : "ACIT3811",
            type : "Project",
            description : "Project 2 due date",
            duedate : "2024-06-17",
            tag : "#Project #ACIT3811",
            completed : false,
            priority : 1,
        },
        { id: 6, title: "ACIT1234", type: "Lab", description: "Lab 1 due date", duedate: "2024-07-01", tag: "#Assignment #ACIT1234", completed: false, priority: 2, },
        { id: 7, title: "ACIT5678", type: "Project", description: "Project due date", duedate: "2024-07-15", tag: "#Assignment #ACIT5678", completed: false, priority: 3, },
        { id: 8, title: "ACCG5110", type: "Quiz", description: "Quiz 3 due date", duedate: "2024-07-30", tag: "#Assignment #ACCG5110", completed: false, priority: 1, },
        
    ]
};

module.exports = { database };
