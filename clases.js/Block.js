class Block {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 10;
        this.broken = false; // Estado del bloque
        this.ctx = ctx; // Contexto de dibujo
    }

    draw() {
        if (!this.broken) {
            this.ctx.fillStyle = "skyblue";
            this.ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja el bloque
        }
    }
}
