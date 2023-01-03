let express = require("express");
const bodyParser = require("body-parser");
let app = express();

// create an empty array for later use
var items = ["Add an item below to get started"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// define what should happen when someone makes a request to the home route /
// request, response
app.get("/", function (req, res) {
  var today = new Date();

  // Let's format the date
  // https://medium.com/swlh/use-tolocaledatestring-to-format-javascript-dates-2959108ea020
  //Sunday, January 1
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  // Set the day to the custom string that you created above
  var day = today.toLocaleDateString("en-us", options);

  // get the newListItem from user input, then pass it into our items array
  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", function (req, res) {
  // get the post req info from the newItem form
  // and push it into our items array
  var item = req.body.newItem;
  items.push(item);

  console.log(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
