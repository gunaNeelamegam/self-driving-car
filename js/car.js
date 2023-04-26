class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceraltion = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.control = new Control()
    }

    /**
     * using for creating the car to the canvas
     */
    draw(carContext) {
        carContext.save();
        carContext.translate(this.x, this.y);
        carContext.rotate(-this.angle);
        carContext.beginPath()
        carContext.rect(-this.width / 2, - this.height / 2, this.width, this.height)
        carContext.fill();
        carContext.restore();
    };

    update() {
        if (this.control.top) {
            this.speed += this.acceraltion;
            // this.y -= 2;
        };
        if (this.control.down) {
            // this.y += 2;
            this.speed -= this.acceraltion;
        };
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.control.right) {
                this.angle -= 0.03 * flip;
            };
            if (this.control.left) {
                this.angle += 0.03 * flip;
            }
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
        // console.log(this.speed)
        // this.y -= this.speed;
    };
}