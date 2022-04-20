class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.firing = false;
        this.moveSpeed = 4;
    }

    update() {

        this.x = game.input.mousePointer.x;

        if(this.x < borderUISize) {
            this.x = borderUISize;
        } else if (this.x > game.config.width - borderUISize) {
            this.x = game.config.width - borderUISize;
        }

        if(game.input.activePointer.isDown && !this.firing) {
            this.firing = true;
            this.sfxRocket.play();
        }

        if(this.firing && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.firing = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}