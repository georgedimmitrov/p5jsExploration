var srctxt;

function preload() {
    srctxt = loadStrings('rainbow.txt');
}

function setup() {
    noCanvas();
    srctxt = join(srctxt, ' ');

    var seed = select('#seed');
    var submit = select('#submit');
    submit.mousePressed(function() {
        createP(seed.value());
        createP(srctxt);
    });

}
