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
  })
);
app.all("/cors", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled" });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
