const express = require("express");
const path = require("path");
const bodyParser = require("body-Parser");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views")); //Tell express to use views folder

app.set("view engine", "ejs"); //Tell express to use EJS as the view engine

app.use(express.static("public")); // setting public static so we can access the folders in public

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/results", (req, res) => {
  let query = req.query.search;

  request(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEAPI}&query=` + query, (error, response, body) => {
    if (error) {
      console.log(error);
    }

    let data = JSON.parse(body);

    res.render("results", { data: data, searchQuery: query });
  });
});

// app.post("/", (req, res) => {
//   let userInput = req.body.search;

//   if (userInput.toLowerCase() !== "") {
//     console.log(userInput);
//     res.redirect("/search", { userInput: userInput });
//   } else {
//     console.log("Herh Gyae gyimi");
//   }
// });

app.listen(2020, () => {
  console.log("Server running on port 2020");
});
