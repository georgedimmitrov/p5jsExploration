var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var additional = fs.readFileSync('additional.json');
var afinndata = fs.readFileSync('afinn111.json');

var words = JSON.parse(additional);
var afinn = JSON.parse(afinndata);

var app = express();
var server = app.listen(3000, listening);

function listening() {
  console.log('listening...');
}

app.use(express.static('public'));
// parse application/x-www-form-url-encoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/analyze', anaylizeThis);

function anaylizeThis(req, res) {
  var txt = req.body.text;
  var words = txt.split(/\W+/);
  var totalScore = 0;
  var wordlist = [];

  for  (var i = 0; i < words.length; i++) {
    var word = words[i];
    var score = 0;
    var found = false;

    if (additional.hasOwnProperty(word)) {
      score = Number(additional[word]);
      found = true;
    } else if (afinn.hasOwnProperty(word)) {
      score = Number(afinn[word]);      
      found = true;
    }

    if (found) {
      wordlist.push({
        word: word,
        score: score
      });
    }

    totalScore += score;
  }

  var comp = totalScore / words.length;

  var reply = {
    score: totalScore,
    comparative: comp,
    words: wordlist
  };

  res.send(reply);
}

app.get('/add/:word/:score?', addWord);

function addWord(req, res) {
  var data = req.params;
  var word = data.word;
  var score = Number(data.score);
  var reply = {};

  if (!score) {
    reply = {
      msg: 'Score is required.'
    };
    res.send(reply);     
  } else {
    additional[word] = score;
    var data = JSON.stringify(additional, null, 2);
    fs.writeFile('additional.json', data, finished);

    function finished(err) {
      reply = {
        word: word,
        score: score,
        status: 'success'
      };
      res.send(reply);  
    }
  }
}

app.get('/all', sendAll);

function sendAll(req, res) {
  var data = {
    additional: additional,
    afinn: afinn
  };

  res.send(data);
}

// Check to see if a particular word is present in the DB
app.get('/search/:word/', searchWord);

function searchWord(req, res) {
  var word = req.params.word;
  var reply = {};

  if (words[word]) {
    reply = {
      status: 'found',
      word: word,
      score: words[word]
    };
  } else {
    reply = {
      status: 'not found',
      word: word
    };
  }

  res.send(reply);
}
