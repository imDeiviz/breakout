class Ball {
    constructor(ctx) {
        this.size = 15; // Tamaño del cuadrado
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
        this.ctx.fillStyle = "white"; // Establece el color de relleno a blanco
        this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); // Dibuja un cuadrado
    }
}