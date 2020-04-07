const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["X-Custom-Header", "Content-Type"],
    preflightContinue: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.post("/cors", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
