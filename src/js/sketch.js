// Based on:
// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA
// https://mathed.miamioh.edu/index.php/ggbj/article/view/197/159

let time = 0;
let wave = [];
let path = [];

let slider;

function setup() {

    colorMode(HSB, 1, 1, 1);

    myCanvas = createCanvas(windowWidth * 0.6, windowHeight * 0.8 * 0.8);
    myCanvas.parent("CanvasDiv");


    slider = createSlider(1, 50, 5);
    slider.style('width', '60vw');
    //slider.position(adjustx + 30, height - 250 + adjusty);
    slider.parent('n_comp_slider');
}

function draw() {

    background(0);
    translate(windowWidth * 0.15, height / 2);

    let x = 0;
    let y = 0;

    for (let i = 0; i < slider.value(); i++) {
        let prevx = x;
        let prevy = y;

        let k = i + 1;
        let c_k = -75 * (4 * pow(-1, k) / (k * PI));
        //let k = i * 2 + 1;
        //let c_k = 75 * (4 / (k * PI));

        x += c_k * cos(k * time);
        y += c_k * sin(k * time);

        //stroke(255, 100);
        noFill();
        strokeWeight(2 * (1 - i / slider.value()) + 0.1);
        stroke((i + 1) / slider.value(), 1, 1);
        ellipse(prevx, prevy, c_k * 2);

        //fill(255);
        //stroke(255);
        line(prevx, prevy, x, y);
        //ellipse(x, y, 8);
    }
    wave.unshift(y);

    strokeWeight(1);
    stroke(255);
    translate(200, 0);
    line(x - 200, y, 0, wave[0]);
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    // time = 2*PI*Fo*t
    time += 0.02;


    if (wave.length > int(200 / 600 * windowWidth * 0.8)) {
        wave.pop();
    }
}