const express = require("express");
require("dotenv").config();
const MongoConnection = require("./Connection");
const UserRouter = require("./routes/user");
const candidateRouter = require("./routes/candidate");
const session = require("express-session");
const resultRouter = require("./routes/Result");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.MY_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3 * 60 * 1000,
      secure: false,
    },
  })
);

// database connection
MongoConnection(process.env.MONGO_URL).then(() => {
  console.log(" Database connected successfully");
});
//,{ "src": "/(.*)", "dest":"/users"},{ "src": "/(.*)", "dest":"/admin"},{ "src": "/(.*)", "dest":"/result"}

app.use(UserRouter);
app.use(candidateRouter);
app.use(resultRouter);

// app.get("/all", async (req, res) => {
//   const allData = await candidateModel.find().populate("voters_id");
//   console.log(JSON.stringify(allData));
//   return res.status(200).json(allData);
// });

// app.get("/", (req, res) => {
//   res.send("hello! server is running");
// });

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on ${process.env.PORT}`);
  }
});
