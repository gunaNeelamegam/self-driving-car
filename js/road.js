class Road {
    constructor(roadX, roadY, laneCount = 3) {
        this.x = roadX;
        this.y = roadY;
        this.laneCount = laneCount;
        this.left = this.x - this.y / 2;
        this.right = this.x + this.y / 2;
        const infinty = 100000000;
        this.top = -infinty;
        this.bottom = infinty;
        //creating the objects of x and y both top to bottom
        const topLeft = {
            x: this.left,
            y: this.top
        }
        const topRight = {
            x: this.right,
            y: this.top
        }
        const bottomLeft = {
            x: this.left,
            y: this.bottom

        }
        const bottomRight = {
            x: this.right,
            y: this.bottom
        }
        this.borders = [
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(indexPosition) {
        const laneHalfWidth = this.y / this.laneCount;
        return this.left + laneHalfWidth / 2 + Math.min(indexPosition, this.laneCount - 1) * laneHalfWidth;
    }
    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        for (let i = 0; i <= this.laneCount; i++) {
            const Xvalue = lerp(this.left, this.right, i / this.laneCount)
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20, 20]);
            }

            //Drawing Road for Left side of the Road
            ctx.beginPath()
            ctx.moveTo(Xvalue, this.top);
            ctx.lineTo(Xvalue, this.bottom);
            ctx.stroke();

        }
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y)
            ctx.stroke();
        })

    }
}