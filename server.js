// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const lodash = require("lodash");
var cors = require("cors");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

/*START OF YOUR CODE..*/
app.get("/quotes", function (req, res) {
  res.send(quotes);
});

app.get("/quotes/random", function (req, res) {
  const randomQuote = lodash.sample(quotes);
  res.send(randomQuote);
});

app.get("/quotes/search", function (req, res) {
  const queryParam = req.query.term;
  const theQuote = quotes.filter((theQuote) =>
    theQuote.quote.includes(queryParam)
  );
  res.send(theQuote);
});

//...END OF YOUR CODE//

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
