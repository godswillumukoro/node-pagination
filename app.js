require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./users");

mongoose.connect(process.env.MONGO_URI);
const database = mongoose.connection;
// first time db is opened
database.once("open", async () => {
  // check if there are users
  if ((await User.countDocuments().exec()) > 0) return;

  Promise.all([
    User.create({ name: "User 1" }),
    User.create({ name: "User 2" }),
    User.create({ name: "User 3" }),
    User.create({ name: "User 4" }),
    User.create({ name: "User 5" }),
    User.create({ name: "User 6" }),
    User.create({ name: "User 7" }),
    User.create({ name: "User 8" }),
    User.create({ name: "User 9" }),
    User.create({ name: "User 10" }),
    User.create({ name: "User 11" }),
    User.create({ name: "User 12" }),
    User.create({ name: "User 13" }),
    User.create({ name: "User 14" }),
  ]).then(() => console.log("Users have been added"));
});

app.get("/users", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
});

// app.get("/posts", paginatedResults(posts), (req, res) => {
//   res.json(res.paginatedResults);
// });

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    //   query
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //   next / prev
    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
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

    // results.results = model.slice(startIndex, endIndex);
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      results.status(500).json({
        error: error.message,
      });
    }
  };
}
app.listen(3000, () => {
  console.log("Server Running on port:30000");
});
