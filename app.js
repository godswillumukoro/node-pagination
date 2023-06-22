const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Kelvin" },
  { id: 2, name: "James" },
  { id: 3, name: "Michael" },
  { id: 4, name: "Paul" },
  { id: 5, name: "Sabrina" },
  { id: 6, name: "Tola" },
  { id: 7, name: "Bosede" },
  { id: 8, name: "Godswill" },
  { id: 9, name: "Kelly" },
  { id: 10, name: "Onome" },
  { id: 11, name: "Ogaga" },
  { id: 12, name: "Smarto" },
  { id: 13, name: "Shedrach" },
];

app.get("/users", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  //   query
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  //   next / prev
  const results = {};

  if (endIndex < users.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = users.slice(startIndex, endIndex);
  res.json(results);
});

app.listen(3000, () => {
  console.log("Server Running");
});
