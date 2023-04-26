class Sensor {
    constructor(car) {
        this.car = car;
        this.rayLength = 500;
        this.rayCount = 4;
        this.raySpeed = Math.PI / 4;
        this.rays = [];
    };

    update(roadBorders) {
        this.#castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            const reading = this.#getReadings(this.rays[i], roadBorders);
            this.readings.push(reading);
        }
    };





    #getReadings(ray, roadBorders) {
        //roadborders=[[topLeft,bottomLeft],[topRight,bottomRight]
        //topLeft={
        // x:canvas.width
        // y:canvas.height
        // }
        this.touches = []

        //Ray parameter ==> [[{x,y}]]
        for (let i = 0; i < roadBorders.length; i++) {
            //finding the intersection between the ray and border
            //touch={x,y,offset}
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if (touch) {
                this.touches.push(touch);
            };
        }
        if (this.touches.length == 0) {
            return null;
        } else {
            const offsets = this.touches.map(touch => touch.offset);
            const minOffset = Math.min(...offsets);
            return this.touches.find(touch => touch.offset === minOffset);
        }
    }

    // creating the yellow rays from the car

    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            let sensor_angle = lerp(
                this.raySpeed / 2,
                -this.raySpeed / 2,
                i / (this.rayCount - 1)
            ) + this.car.angle;

            //this.car.angle --> which means that all the rays needs to change based  on the car direction change

            const start = {
                x: this.car.x,
                y: this.car.y
            }
            const end = {
                x: this.car.x - Math.sin(sensor_angle) * this.rayLength,
                y: this.car.y - Math.cos(sensor_angle) * this.rayLength
            };
            this.rays.push([start, end])
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            //after that meets at the border we need to draw the black line
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }

    }

}