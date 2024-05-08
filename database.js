let database = [
  {
      id: 1,
      name: "Cindy Park",
      email: "cindy123@gmail.com",
      password: "cindy123!",
      reminders: [
        {
            id: 1,
            title: "ACIT2911",
            type : "Project",
            description: "Agile project presentation",
            duedate : "2024-12-01",
            tag : "#Agile #Project",
            completed: false,
            priority: "",
        },
        {
            id: 2,
            title: "ACIT2520",
            type : "Lab",
            description: "Lab 5 due date",
            duedate : "2024-05-23",
            tag : "#Lab #ACIT2520",
            completed: false,
            priority: "",
        }
      ],
      role: "admin",
  },
  {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [
        
      ],
      role:"user",
  },
  {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: [
        {
            id: 1,
            title: "Test",
            description: "Test test test",
            theme: "test",
            completed: false,
        },
      ],
      role:"user",
  },
  ];
  
  module.exports = { database };