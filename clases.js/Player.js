class Player {
    constructor(boardWidth, ctx) {
        this.width = 80;
        this.height = 10;
        this.x = (boardWidth - this.width) / 2;
        this.y = 480; // Ubicación del jugador
        this.ctx = ctx; // Contexto de dibujo
    }

    move(direction) {
        this.x += direction * 10; // Mueve el jugador
        // Limita el movimiento dentro del tablero
        this.x = Math.max(0, Math.min(this.x, 500 - this.width));
    }

    draw() {
        this.ctx.fillStyle = "lightgreen";
        this.ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja el jugador
    }
}
