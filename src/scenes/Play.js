class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('starfield', 'assets/hall.png');
        this.load.image('starfield2', 'assets/people.png');
        this.load.image('rocket', 'assets/note.png');
        this.load.image('ship', 'assets/piano.png');
        this.load.image('ship2', 'assets/maracas.png');
        this.load.spritesheet('explosion', 'assets/pianoexplosion.png', {frameWidth: 57, frameHeight: 38, startFrame: 0, endFrame: 3});
        this.load.spritesheet('explosion2', 'assets/maracasexplosion.png', {frameWidth: 36, frameHeight: 36, startFrame: 0, endFrame: 3});
    }

    create() {

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLeftClick = this.input.keyboard.addKey(Phaser.Input.MOUSE_DOWN);

        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0,0);
        this.starfield2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield2').setOrigin(0,0);


        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0.5);

        this.shipA = new Ship2(this, game.config.width + borderUISize*6, borderUISize*4, 'ship2', 0, 50).setOrigin(0,0);
        this.shipB = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'ship', 0, 25).setOrigin(0,0);
        this.shipC = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'ship', 0, 25).setOrigin(0,0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, game.config.width, game.config.width, 0xFFFFFF).setOrigin(0,0);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3, first: 0}),
            frameRate: 10
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 3, first: 0}),
            frameRate: 10
        });

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C1AE7C',
            color: '#9D0815',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 - 15, this.p1Score, scoreConfig);

        this.gameOver = false;
        this.timeLeft = game.settings.gameTimer;
        this.framesUpdated = 0;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 80, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 4, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {


        this.framesUpdated += 1;
        if (this.framesUpdated == 60) {
            this.timeLeft -= 1000;
            this.framesUpdated = 0;
            if (this.timeLeft == (game.settings.gameTimer - 30000)) {
                game.settings.spaceshipSpeed *= 1.5;
            }
        }

        console.log(this.timeLeft, this.framesUpdated, game.settings.gameTimer, game.settings.spaceshipSpeed);

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menu');
        }

        this.starfield.tilePositionX += 2;
        this.starfield2.tilePositionX += 3;

        if(!this.gameOver) {
            this.p1Rocket.update();
            this.shipA.update();
            this.shipB.update();
            this.shipC.update();
        }

        if(this.checkCollision(this.p1Rocket, this.shipC)) {
            this.p1Rocket.reset();
            this.shipExplode(this.shipC);
        }
        if(this.checkCollision(this.p1Rocket, this.shipB)) {
            this.p1Rocket.reset();
            this.shipExplode(this.shipB);
        }
        if(this.checkCollision(this.p1Rocket, this.shipA)) {
            this.p1Rocket.reset();
            this.ship2Explode(this.shipA);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
    ship2Explode(ship) {
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0,0);
        boom.anims.play('explode2');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion2');
    }
}