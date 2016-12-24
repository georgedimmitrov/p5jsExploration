var rules = {
  'S': [['The', 'N', 'V']],
  'N': [['cat'], ['dog']],
  'V': [['meows'], ['barks']]
};

function expand(start, expansion) {
  if (rules[start]) {
    var pick = random(rules[start]);
    for (var i = 0; i < pick.length; i++) {
      expand(pick[i], expansion);
    }
  } else {
    expansion.push(start);
  }

  return expansion.join(' ');
}

var button;

function setup() {
  noCanvas();
  button = createButton('generate');
  button.mousePressed(cfg);
}

function cfg() {
  var start = 'S';
  var expansion = [];

  var result = expand(start, expansion);
  createP(result);
}