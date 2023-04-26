class Control {
    constructor() {
        this.right = false;
        this.left = false;
        this.top = false;
        this.down = false;
        this.#addKeyboardListner();
    }


    #addKeyboardListner = () => {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.top = true;
                    break;
                case "ArrowDown":
                    this.down = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
            };
            console.table(this);
        };
        document.onkeyup = (event) => {
                switch (event.key) {
                    case "ArrowUp":
                        this.top = false;
                        break;
                    case "ArrowDown":
                        this.down = false;
                        break;
                    case "ArrowLeft":
                        this.left = false;
                        break;
                    case "ArrowRight":
                        this.right = false;
                        break;
                };
                console.table(this)
        };
    }
}