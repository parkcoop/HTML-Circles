var canvas = document.getElementById("canvas");
var cx = canvas.getContext("2d");
cx.canvas.width = innerWidth;
cx.canvas.height = innerHeight;

let mouse = {
  x: undefined,
  y: undefined
};

let colorArray = ["#564138", "#FFD23F", "#2E86AB", "#F02D3A", "#F6F5AE"];

let maxRadius = 400;
var circleArray = [];

function drawBackground() {
  cx.fillStyle = "grey";
  cx.fillRect(0, 0, innerWidth, innerHeight);
  cx.fill();
}

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;
  this.draw = function() {
    cx.fillStyle = this.color;
    cx.beginPath();
    cx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    cx.fill();
  };
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    //INTERACTIVITY
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 5;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

function init() {
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 10 + 1;
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}

function animate() {
  drawBackground();

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  requestAnimationFrame(animate);
}
init();
animate();

window.addEventListener("mousemove", function(e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  cx.canvas.width = window.innerWidth;
  cx.canvas.height = window.innerHeight;
  init();
});

window.addEventListener("mouseout", function() {
  mouse.x = undefined;
  mouse.y = undefined;
});
