/* ritajs */
var inputRita;
var buttonRita;
var lexicon;

var inputNLP;
var buttonNLP;
var nlp = window.nlp_compromise;

function setup() {
  noCanvas();

  /* ritajs */
  lexicon = new RiLexicon();
  inputRita = createInput('It was a dark and stormy night.');
  buttonRita = createButton('submit');
  buttonRita.mousePressed(processRita);
  inputRita.size(200);

  createElement('h2', 'nlp-comromise');

  inputNLP = createInput('It was a dark and stormy night.');
  buttonNLP = createButton('submit');
  buttonNLP.mousePressed(processNLP);
  inputNLP.size(200);
}

function processNLP() {
  var s = inputNLP.value();
  var sentence = nlp.sentence(s);
  var outputNLP = '';

  for (var i = 0; i < sentence.terms.length; i++) {
    var pos = sentence.terms[i].pos;
    var word = sentence.terms[i].text;
    if (pos.Noun && !pos.Pronoun) {
      word = nlp.noun(word).pluralize();
    } else if (pos.Verb) {
      word = nlp.verb(word).conjugate().future;
    }
    outputNLP += word;
    outputNLP += sentence.terms[i].whitespace.trailing;
  }

  createP(outputNLP);
}

function processRita() {
  var s = input.value();
  var rs = new RiString(s);
  var words = rs.words();
  var pos = rs.pos();

  var outputRita = '';
  for (var i = 0; i < words.length; i++) {
    if (/nn.*/.test(pos[i])) {
      outputRita += lexicon.randomWord(pos[i]);
    } else {
      outputRita += words[i];
    }

    outputRita += ' ';
  }

  createP(outputRita);
}