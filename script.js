const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
    'rgb(125,44,41)',
    'rgb(208,58,53)',
    'rgb(70,147,135)',
    'rgb(46,101,99)'
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

let mouse = {
    x: null,
    y: null
};
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

function Particle(x, y, directionX, directionY, size, colour) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colour = colour;
}

//draw method
Particle.prototype.draw = function () {
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.colour;
    ctx.fill();
}

//update method
Particle.prototype.update = function () {
    //bounce
    if (this.x + this.size * 2 > canvas.width ||
        this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height ||
        this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    //mouse
    if (mouse.x - this.x < mouseRadius &&
        mouse.x - this.x > -mouseRadius &&
        mouse.y - this.y < mouseRadius &&
        mouse.y - this.y > -mouseRadius) {
        if (this.size < maxSize) {
            this.size += 20;
        }
    } else if (this.size > minSize) {
        this.size -= 0.5;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}

//particle array
function init() {
    particleArray = []
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let colour = colours[Math.floor(Math.random() * colours.length)];
        particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
    }
}

//animation
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();
animate();

//resize
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
)

//remove mouse
setInterval(function () {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);