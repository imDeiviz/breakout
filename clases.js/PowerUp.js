class PowerUp {
    constructor(ctx, x, y, type) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.type = type;
        this.ctx = ctx;
        this.speed = 2;

        this.activated = false;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        this.ctx.fillStyle = this.getColor();
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    getColor() {
        switch(this.type) {
            case 'enlarge': return 'green';
            case 'slow': return 'blue';
            case 'penetrate': return 'purple';
        }
    }
}