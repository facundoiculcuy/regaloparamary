// Manejador para mostrar los mensajes con los botones
document.querySelectorAll('.message-button').forEach(button => {
  button.addEventListener('click', () => {
    const message = button.getAttribute('data-message');
    const messageText = document.getElementById('messageText');
    const hiddenMessage = document.getElementById('hiddenMessage');

    // Mostrar el mensaje correspondiente
    messageText.textContent = message;
    hiddenMessage.style.display = 'block';
  });
});

// Código para los fuegos artificiales (sin cambios)
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.x, this.y, this.colors));
    }
  }
  update() {
    this.particles.forEach((particle) => particle.update());
  }
  draw() {
    this.particles.forEach((particle) => particle.draw());
  }
}

class Particle {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 3 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.size = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 1;
    this.decay = Math.random() * 0.01 + 0.005;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= this.decay;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.particles[0].alpha <= 0) fireworks.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colors = ["#ff6699", "#ffcc00", "#ff3366", "#33ccff", "#ccff33"];
  fireworks.push(new Firework(x, y, colors));
}

setInterval(createFirework, 1000);
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
