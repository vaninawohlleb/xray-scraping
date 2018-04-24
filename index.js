const express = require('express');
const app = express();

var scraping = require('./scraping');

app.get('/', function(req, res) {
  scraping.getFaqs().then(
    function(data) {
      res.status(200).json(data);
    },
    function(err) {
      res.status(400).json(err);
    }
  );
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('API running', host, port)
})