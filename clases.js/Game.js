class Game {
    constructor() {
        this.canvas = document.getElementById("board");
        this.ctx = this.canvas.getContext("2d");
        this.player = new Player(this.canvas.width, this.ctx);
        this.ball = new Ball(this.ctx);
        this.blocks = [];
        this.maxRows = 5; // Número máximo de filas
        this.currentRows = 1; // Número actual de filas
        this.score = 0; // Inicializa la puntuación en 0
        this.gameOver = false;

        this.createBlocks(); // Crea los bloques iniciales
        document.addEventListener("keydown", this.controls.bind(this));
        this.startGame(); // Inicia el juego
    }

    startGame() {
        setInterval(this.update.bind(this), 1000 / 60); // Ejecuta la actualización 60 veces por segundo
    }

    createBlocks() {
        this.blocks = []; // Reinicia los bloques
        for (let r = 0; r < this.currentRows; r++) {
            for (let c = 0; c < 8; c++) {
                this.blocks.push(new Block(c * 60 + 15, 30 + r * 15, this.ctx)); // Posiciona los bloques
            }
        }
    }

    controls(event) {
        if (this.gameOver) return;
        if (event.key === "ArrowLeft") this.player.move(-1);
        if (event.key === "ArrowRight") this.player.move(1);
    }

    update() {
        if (this.gameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpia el tablero
        this.player.draw();
        this.ball.move();
        this.ball.draw();

        this.checkCollisions(); // Verifica colisiones

        this.blocks.forEach(block => {
            block.draw();
            if (!block.broken && this.detectCollision(this.ball, block)) {
                block.broken = true; // Marca el bloque como roto
                this.ball.bounceY(); // Rebota la bola
                this.score += 100; // Incrementa la puntuación
            }
        });

        // Verifica si todos los bloques están rotos
        if (this.blocks.every(block => block.broken)) {
            this.currentRows = Math.min(this.currentRows + 1, this.maxRows); // Aumenta el número de filas
            this.ball.increaseSpeed(); // Aumenta la velocidad de la bola
            this.createBlocks(); // Crea nuevos bloques
        }

        // Dibuja el marcador de puntuación
        this.ctx.fillStyle = "white"; // Color del texto
        this.ctx.font = "20px sans-serif"; // Estilo de fuente
        this.ctx.fillText(`Score: ${this.score}`, 10, 20); // Dibuja el texto de la puntuación

        // Verifica si el juego ha terminado
        if (this.ball.y > this.canvas.height) {
            this.gameOver = true;
            this.ctx.fillStyle = "red";
            this.ctx.font = "20px sans-serif";
            this.ctx.fillText("Game Over: Press Space to Restart", 100, 250);
        }
    }

    checkCollisions() {
        if (this.ball.x <= 0 || this.ball.x >= this.canvas.width) this.ball.bounceX(); // Rebote en los bordes
        if (this.ball.y <= 0) this.ball.bounceY(); // Rebote si toca el techo
        if (this.detectCollision(this.ball, this.player)) this.ball.bounceY(); // Rebota si la bola toca al jugador
    }

    detectCollision(ball, block) {
        return (
            ball.x + ball.size > block.x &&
            ball.x - ball.size < block.x + block.width &&
            ball.y + ball.size > block.y &&
            ball.y - ball.size < block.y + block.height
        );
    }
}

// Reinicia el juego al presionar 'Espacio'
window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        window.location.reload(); // Recarga la página
    }
});

// Inicia el juego cuando la página se carga
window.onload = () => {
    new Game();
};
