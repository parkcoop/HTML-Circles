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

/*`rgba(${Math.random() * 255},${Math.random() *
      255},${Math.random() * 255},0.5)`*/

// var circleArray = [];
// for (let i = 0; i < 1000; i++) {
//   let radius = Math.random() * 10 + 1;
//   let color = colorArray[Math.floor(Math.random() * colorArray.length)];
//   let x = Math.random() * (innerWidth - radius * 2) + radius;
//   let y = Math.random() * (innerHeight - radius * 2) + radius;
//   let dx = Math.random() - 0.5;
//   let dy = Math.random() - 0.5;

//   circleArray.push(new Circle(x, y, dx, dy, radius, color));
// }
// let x = innerWidth / 2;
// let y = innerWidth / 2;
// let dx = 5;
// let dy = 5;
// let radius = 200;
// let party = `rgba(${Math.random() * 255},${Math.random() *
//   255},${Math.random() * 255},0.5)`;
// animate();

// let circle = new Circle(300, 300, 10, 4, 500);

// let circle2 = new Circle(100, 300, 2, 10, 500);

// let circle3 = new Circle(400, 300, 4, 1, 500);
// if (this.radius <= 0) {
//   this.radius = 200;
// }
// this.radius--;
// cx.fillStyle = "grey";
// cx.fillRect(0, 0, innerWidth, innerHeight);
// cx.fill();

// cx.beginPath();
// cx.arc(x, y, 200, 0, 2 * Math.PI);
// cx.strokeStyle = "black";
// cx.stroke();
// cx.fillStyle = "black";
// cx.fill();
// cx.moveTo(100, 100);
// cx.beginPath();
// cx.arc(x, y, 100, 0, 2 * Math.PI);
// cx.fill();

// function drawCircle() {
//   cx.fillStyle = `rgba(${Math.random() * 255},${Math.random() *
//     255},${Math.random() * 255},0.5)`;
//   cx.beginPath();
//   cx.arc(x, y, radius, 0, 2 * Math.PI);
//   cx.fill();
//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }
//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }
//   if (radius <= 0) {
//     radius = 200;
//   }
//   radius--;
//   x += dx;
//   y += dy;
// }
//   circle.update();
//   circle2.update();
//   circle3.update();
