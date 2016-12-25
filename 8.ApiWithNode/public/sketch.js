function setup() {
  noCanvas();
  var button = select('#submit');
  button.mousePressed(submitWord);

  var buttonA = select('#analyze');
  buttonA.mousePressed(analyzeThis);
}

function analyzeThis() {
  var txt = select('#textinput').value();

  var data = {
    text: txt
  };

  httpPost('/analyze/', data, 'json', dataPosted, postError);
}

function dataPosted(result) {
  console.log(result);
}

function postError(err) {
  console.log(err);
}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();

  loadJSON('add/' + word + '/' + score, finished);
}

function finished(data) {

}
