const canvas = document.getElementById("my-canvas");
canvas.width = 300;
const canvasCtx = canvas.getContext("2d");

// createing the car

const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 150, 50, 80);
const sensor = new Sensor(car)
animate();

function animate() {
    car.update();
    sensor.update(road.borders);
    canvas.height = window.innerHeight;
    canvasCtx.save();
    canvasCtx.translate(0,-car.y+canvas.height*0.8)
    road.draw(canvasCtx);
    car.draw(canvasCtx);
    sensor.draw(canvasCtx)
    canvasCtx.restore();
    requestAnimationFrame(animate);
}