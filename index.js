// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// api date endpoint
app.get("/api/:date?", (req, res) => {
  let query = req.params.date;
  console.log(query);
  let date;
  if (!query){
    date = new Date();
    res.json({
      "unix": Date.now(),
      "utc": date.toUTCString()
    })
  }
  else{
    query.includes("-") || query.includes(" ") ? date = new Date(query) : date = new Date(parseInt(query));
    if (date != "Invalid Date"){
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString(),
      })
    }
    else{
      res.json({
        "error": date.toString()
      })
    }
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
