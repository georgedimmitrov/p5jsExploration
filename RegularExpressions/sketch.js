var textfield;
var ouput;
var submit;

function setup() {
  noCanvas();
  textfield = select('#input');
  ouput = select('#ouput');
  submit = select('#submit');
  submit.mousePressed(newText);
}

function highlight() {
  var c = color(random(255), random(255), random(255));
  this.style('background-color', c);
}

function newText() {
  var s = textfield.value();

  var words = s.split(/(\W+)/);
  for (var i = 0; i < words.length; i++) {
    var span = createSpan(words[i]);
    span.parent(output);

    if (!/\W+/.test(words[i])) {    
      span.mouseOver(highlight);
    }
  }
}