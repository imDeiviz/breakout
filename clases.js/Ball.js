class Ball {
    constructor(ctx) {
        this.size = 10;
        this.x = 250; // Posición inicial en el eje X
        this.y = 250; // Posición inicial en el eje Y
        this.initialVelocityX = 4; // Velocidad inicial en el eje X
        this.initialVelocityY = -4; // Velocidad inicial en el eje Y
        this.velocityX = this.initialVelocityX; // Velocidad actual en el eje X
        this.velocityY = this.initialVelocityY; // Velocidad actual en el eje Y
        this.ctx = ctx; // Contexto de dibujo
    }

    move() {
        this.x += this.velocityX; // Actualiza posición en X
        this.y += this.velocityY; // Actualiza posición en Y
    }

    bounceX() {
        this.velocityX *= -1; // Rebota en el eje X
    }

    bounceY() {
        this.velocityY *= -1; // Rebota en el eje Y
    }

    increaseSpeed() {
        this.velocityX *= 1.10; // Aumenta la velocidad en un 10%
        this.velocityY *= 1.10; // Aumenta la velocidad en un 10%
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Dibuja la bola
        this.ctx.fill();
    }
}
