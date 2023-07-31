// packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const resUtils = require("./utils").response;

// database
const DbCongig = require("./config/database");

// Set-up cron jobs
const cronScheduler = require('./cronScheduler.js')
cronScheduler();

// init app
const app = express();

// .MIDDLEWARES
// cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse json
app.use(express.json());


// Initialize scope
app.use((req, res, next) => {
  req.$scope = {};
  // req.config = config;
  return next();
});

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// .DATABASE
//database connection
mongoose.connect(DbCongig.uri, DbCongig.options);

let db = mongoose.connection;

//check connection
db.once("open", () => {
  console.log("connection success DB...");
});

//check for db console.error();
db.on("error", (err) => {
  console.log(err);
});

// port config
const PORT = process.env.PORT || 5000;

// server
const server = app.listen(PORT, () =>
  console.log(`Server started at port ${PORT}`)
);

// .ROUTES
// import routes
const addressAnalytics = require(`./routes/addressAnalytics.route`);
const waitlistRoutes = require(`./routes/waitlist.route`);
const userRoutes = require(`./routes/users.route`);
const addressGroups = require(`./routes/addressGroups.route`);

// mount routes
app.use(`/address-analytics`, addressAnalytics);
app.use(`/waitlist`, waitlistRoutes);
app.use(`/user`, userRoutes);
app.use(`/address-groups`, addressGroups);

app.get("/", (_, res) => {
  res.send(
    "<center><h1></br>Hello from Block way. But you should not be here :(</h1></center>"
  );
});

// 404 route
app.use("*", (_, res) => {
  res.status(404).json({
    success: false,
    message: "The route you are requesting is not hosted on this server",
  });
});

// Error handler
app.use((err, req, res, next) => {
  if (!err) return;
  console.error(err);

  if (!res.headersSent) {
    return res.send(500, resUtils.error('Unknown Server Error'));
  }
})

module.exports = app;