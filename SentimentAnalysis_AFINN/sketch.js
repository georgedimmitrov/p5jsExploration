var afinn;

function preload() {
  afinn = loadJSON('afinn111.json');
}

function setup() {
  noCanvas();

  var txt = select('#txt');
  txt.input(typing);

  function typing() {
    var textinput = txt.value();
    var words = textinput.split(/\W/);
    var scoredwords = [];
    var totalScore = 0;
    for (var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        var score = afinn[word];
        totalScore += Number(score);
        scoredwords.push(word + ': ' + score + ' ');
      }
    }

    var scoreP = select('#score');
    scoreP.html('score: ' + totalScore);
    var comp = select('#comparative');
    comp.html('comparative: ' + totalScore / words.length);
    var wordlist = select('#wordlist');
    wordlist.html(scoredwords);
  }
}


