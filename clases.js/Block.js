class Block {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 10;
        this.broken = false; // Estado del bloque
        this.ctx = ctx; // Contexto de dibujo
        this.hasPowerUp = false; // Inicialmente no tiene power-up
        this.powerUpType = this.getRandomPowerUpType();
    }

    getRandomPowerUpType() {
        const types = ['enlarge', 'slow', 'penetrate'];
        return types[Math.floor(Math.random() * types.length)];
    }

    draw() {
        if (!this.broken) {
            this.ctx.fillStyle = "skyblue";
            this.ctx.fillRect(this.x, this.y, this.w, this.h); // Dibuja el bloque
        }
    }
}
