db = db.getSiblingDB('bite_swipe');

db.suggestions.insertMany([
  {
    sequenceIndex: 1,
    name: "Pizza Place",
    address: "123 Main St",
    image: "http://localhost:3000/static/pizza.png", // TODO: set up shared env variavbles for the app
    votes: 0,
    points: 0
  },
  {
    sequenceIndex: 2,
    name: "Burger Joint",
    address: "456 Elm St",
    image: "http://localhost:3000/static/burger.png",
    votes: 0,
    points: 0
  },
  // Add more initial data as needed
]);

print('Database initialized');