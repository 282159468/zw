const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["User-Name", "User-age", "Content-Type"],
    preflightContinue: true
  })
);
app.all("/cors", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled" });
});

app.all("/cors-getResponseHeader", function(req, res, next) {
  res.setHeader("Res-X-Header", "value");
  res.setHeader("Access-Control-Expose-Headers", "Res-X-Header");
  res.json({ msg: "This is CORS-enabled" });
});

app.all("/cors-all-origin", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json({ msg: "This is CORS-enabled" });
});

app.all("/cors-simple-request", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json({ msg: "This is CORS-enabled" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
