class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.firing = false;
    }

    update() {
        if(this.firing) {
            this.y -= 10;

            if(this.y < 0) {
                this.reset();
            }
        }
    }

    reset() {
        this.firing = false;
        this.y = 431;
    }

}