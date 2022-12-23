const express = require("express");
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Empty date
app.get("/api", (req, res, next) => {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date?", (req, res, next) => {
  // Strore date param
  let date_string = req.params.date;

  // If date_string is String (so not a Number)
  if (isNaN(date_string)) {
    // 2015-12-25
    // Get ms from date param
    let msFromTime = Number(Date.parse(date_string));

    // Handle Invalid Date
    if (new Date(msFromTime).toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: msFromTime,
        utc: new Date(msFromTime).toUTCString(),
      });
    }
  } else {
    // 1451001600000
    // Get date from date param
    let dateFromMs = new Date(Number(date_string)).toUTCString();

    // Handle Invalid Date
    if (dateFromMs !== "Invalid Date") {
      res.json({
        unix: Number(date_string),
        utc: dateFromMs,
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Timestamp Microservice run on ${listener.address().port}`);
});
