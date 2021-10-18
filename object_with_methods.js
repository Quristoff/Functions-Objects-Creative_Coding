// interactive audio reactivity
var novelist;
fft = new p5.FFT;
var prevSpectrum = new Array(16).fill(0);



// function with parameters 1
function sineMovement(double) {
  return 0.5*(sin(double))+1);
}

// object audioBall
var audioBall = {
  radius: 10,
  group: 10,
  draw: function (xPos,yPos,array) { // method with parameter 2


    // two auxilitary balls
    fill(0,0,255,100);
    ellipse(xPos-mouseY/2+height/2-width/2,yPos,this.radius*1.5);

    fill(255,0,0,100);
    ellipse(xPos+mouseY/2-height/2+width/2,yPos,this.radius*1.5);

    // draw small dots around them
    for(var i = 0; i < 16; i++){
      for (var j = 0;j < this.group; j++){
        push();

        var n = sineMovement(map(j+1,1,this.group,-PI/8,PI);

        translate(xPos+cos(i*PI/8+j*PI/(this.group*8)+PI/4)*this.radius,
        yPos+sin(i*PI/8+j*PI/(this.group*8)+PI/4)*this.radius)
        // let them move in a sine wave of manner

        rotate(i*PI/8+j*PI/(this.group*8));
        translate(n*map(array[i],0,255,0,40),n*map(array[i],0,255,0,70));

        fill(200-70*n,130-100*n,155+80*n);
        noStroke();
        ellipse(0,0,4,4);

        pop();
      }

    }
    noStroke();
    fill(200,130,155);
    ellipse(xPos,yPos,this.radius*1.5);

    // the big ball

  }
}


function preload() {
  novelist = loadSound("sunset.mp3")

}

function setup() {
  createCanvas(1024,640);
  //novelist.loop();
  novelist.setVolume(0.3);
}

function draw() {
  if (!novelist.isPlaying()) {
    novelist.play();
  }
  background(95,014,225,80);
  var spectrum = fft.analyze(32).slice(0,16);

  // call the function
  var size = map(mouseX,0,width,60,400);
  var numGroup = map(mouseY,0+50,height-50,5,20);
  audioBall.radius = size;
  audioBall.group = numGroup;
  audioBall.draw(width/2+random(-2,2),height/2+random(-2,2),spectrum);



}
