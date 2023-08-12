var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3525;

app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.status(200).sendFile("/Users/carballo/code/add-text-to-img/index.html");
});

app.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
  console.log("Defined routes:");
  console.log("	[GET] http://localhost:3525/");
});
