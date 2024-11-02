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
        this.powerUps = [];
        this.activePowerUps = {};
        this.balls = [this.ball]; // Array para manejar múltiples bolas
        this.brokenBlocksCount = 0;
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.backgroundMusic.volume = 0.02;
        this.backgroundMusic.play();
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

    clearPowerUps() {
        this.powerUps = this.powerUps.filter((powerUp) => { return !powerUp.activated})
    }

    update() {
        if (this.gameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpia el tablero
        this.player.draw();
        this.ball.move();
        this.ball.draw();

            // Actualizar y dibujar power-ups
        this.powerUps.forEach((powerUp, index) => {
            powerUp.move();
            powerUp.draw();
    
            // Verificar colisión con el jugador
            if (this.detectCollision(powerUp, this.player)) {
                powerUp.activated = true;
                this.activatePowerUp(powerUp.type);
                this.clearPowerUps()
            }
        });

        // Eliminar power-ups que salen de la pantalla
        this.powerUps = this.powerUps.filter(powerUp => powerUp.y < this.canvas.height);

        this.checkCollisions(); // Verifica colisiones

        this.blocks.forEach(block => {
            block.draw();
            if (!block.broken && this.detectCollision(this.ball, block)) {
                block.broken = true;
                if (!this.ball.canPenetrate) {
                    this.ball.bounceY();
                }
                this.score += 100;
                
                // Incrementa el contador de bloques rotos
                this.brokenBlocksCount++;
                
                // Cada 3 bloques, genera un power-up
                if (this.brokenBlocksCount % 3 === 0) {
                    block.hasPowerUp = true;
                    this.powerUps.push(new PowerUp(
                        this.ctx,
                        block.x + block.w/2,
                        block.y + block.h/2,
                        block.powerUpType,
                    ));
                }
            }

            // Verifica si el juego ha terminado
            if (this.ball.y > this.canvas.height) {
                this.gameOver = true;
                this.ctx.fillStyle = "red";
                this.ctx.font = "20px sans-serif";
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                this.ctx.fillText(
                    "Game Over", 
                    centerX, 
                    centerY - 15
                );
                this.ctx.fillText(
                    "Press Space to Save Score or ESC for Menu", 
                    centerX, 
                    centerY + 15
                );
            }
        });

        // Verifica si todos los bloques están rotos
        if (this.blocks.every(block => block.broken)) {
            this.currentRows = Math.min(this.currentRows + 1, this.maxRows); // Aumenta el número de filas
            this.ball.increaseSpeed(); // Aumenta la velocidad de la bola
            this.createBlocks(); // Crea nuevos bloques
            this.blocks.forEach(block => {
                block.draw();
                if (!block.broken && this.detectCollision(this.ball, block)) {
                    block.broken = true;
                    if (!this.ball.canPenetrate) {
                        this.ball.bounceY();
                    }
                    this.score += 100;
                    
                    // Incrementa el contador de bloques rotos
                    this.brokenBlocksCount++;
                    
                    // Cada 3 bloques, genera un power-up
                    if (this.brokenBlocksCount % 3 === 0) {
                        block.hasPowerUp = true;
                        this.powerUps.push(new PowerUp(
                            this.ctx,
                            block.x + block.w/2,
                            block.y + block.h/2,
                            block.powerUpType,
                        ));
                    }
                }
            });
            
        }

        // Dibuja el marcador de puntuación
        this.ctx.fillStyle = "white"; // Color del texto
        this.ctx.font = "20px sans-serif"; // Estilo de fuente
        this.ctx.fillText(`Score: ${this.score}`, 10, 20); // Dibuja el texto de la puntuación

        // Mostrar power-ups activos
        this.drawActivePowerUps();
    }

    checkCollisions() {
        if (this.ball.x <= 0 || this.ball.x >= this.canvas.width - this.ball.w) this.ball.bounceX(); // Rebote en los bordes
        if (this.ball.y <= 0) this.ball.bounceY(); // Rebote si toca el techo
        if (this.detectCollision(this.ball, this.player)) this.ball.bounceY(); // Rebota si la bola toca al jugador
    }

    detectCollision(object1, object2) {
        return (
            object1.x + object1.w > object2.x &&
            object1.x < object2.x + object2.w &&
            object1.y + object1.h > object2.y &&
            object1.y < object2.y + object2.h
        );
    }

    activatePowerUp(type) {
        // Desactivar power-up anterior del mismo tipo si existe
        if (this.activePowerUps[type]) {
            clearTimeout(this.activePowerUps[type]);
        }
    
        switch(type) {
            case 'enlarge':
                this.player.w *= 1.5;
                break;
            case 'slow':
                this.ball.velocityX *= 0.75;
                this.ball.velocityY *= 0.75;
                break;
            case 'penetrate':
                this.ball.canPenetrate = true;
                break;
        }
    
        // Guardar el timeout para desactivar el power-up
        this.activePowerUps[type] = setTimeout(() => {
            this.deactivatePowerUp(type);
        }, 10000);
    }
    
    deactivatePowerUp(type) {
        switch(type) {
            case 'enlarge':
                this.player.w /= 1.5;
                break;
            case 'slow':
                this.ball.velocityX /= 0.75;
                this.ball.velocityY /= 0.75;
                break;
            case 'penetrate':
                this.ball.canPenetrate = false;
                break;
        }
        delete this.activePowerUps[type];
    }
    
    drawActivePowerUps() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "15px Arial";
        this.ctx.textAlign = "right";
        
        let powerUpsText = Object.keys(this.activePowerUps).join(", ");
        if (powerUpsText) {
            this.ctx.fillText(`Active: ${powerUpsText}`, this.canvas.width - 10, 20);
        }
        
        this.ctx.textAlign = "left";
    }

    saveScore() {
        // Redirige a una nueva página para guardar la puntuación
        window.location.href = `/saveScore.html?score=${this.score}`;
    }

}

// Reinicia el juego al presionar 'Espacio' o vuelve al menú presionando 'ESC'
window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && game.gameOver) {
        game.saveScore();
    }
    if (event.code === "Escape") {
        window.location.href = '/menu.html';
    }
});

// Inicia el juego cuando la página se carga
let game;
window.onload = () => {
    game = new Game();
};
