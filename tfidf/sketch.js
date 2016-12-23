var txt = [];
var counts = {};
var keys = [];
var allwords = [];

var files = ['rainbow.txt', 'eclipse.txt', 'fish.txt', 'sports.txt'];

function preload() {
  for (var i = 0; i < files.length; i++) {
    txt[i] = loadStrings('files/' + files[i]);
  }
}

function setup() {
  noCanvas();

  for (var i = 0; i < txt.length; i++) {
    allwords[i] = txt[i].join('\n');
  }

  var tokens = allwords[0].split(/\W+/);
  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (!counts[word]) {
        counts[word] = {
          tf: 1,
          df: 1
        };

        keys.push(word);
      } else {
        counts[word].tf += 1;
      }
    }
  }

  var othercounts = [];
  for (var j = 1; j < allwords.length; j++) {
    var tempcounts = {};
    var tokens = allwords[j].split(/\W+/);
    for (var k = 0; k < tokens.length; k++) {
      var w = tokens[k].toLowerCase();
      if (!tempcounts[w]) {
        tempcounts[w] = true;
      }
    }
    othercounts.push(tempcounts);
  }

  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    for (var j = 0; j < othercounts.length; j++) {
      var tempcounts = othercounts[j];
      if (tempcounts[word]) {
        counts[word].df++;
      }
    }
  }

  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];

    var wordobj = counts[word]; 
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }

  keys.sort(compare);

  function compare(a, b) {
    var countA = counts[a].tfidf;
    var countB = counts[b].tfidf;
    
    return countB - countA;
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    createDiv(key + ' ' + counts[key].tfidf);
  }

}