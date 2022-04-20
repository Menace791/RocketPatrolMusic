class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.image('starfield', 'assets/hall.png');
        this.load.image('starfield2', 'assets/people.png');
        this.load.audio('menu_song', 'assets/MenuSong.wav');
        this.load.audio('play_song', 'assets/PlaySong.wav');
        this.load.audio('sfx_select', 'assets/OrchestraSelect.wav');
        this.load.audio('sfx_explosion', 'assets/PianoExplosion.wav');
        this.load.audio('sfx_explosion2', 'assets/MaracasExplosion.wav');
        this.load.audio('sfx_rocket', 'assets/NoteFire.wav');
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0,0);
        this.starfield2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield2').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#9D0815',
            color: '#BEA10A',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 40, 'MUSICAL SCORE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 40, 'Use the mouse to move and click to sing', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#907A0A';
        menuConfig.color = '#639BFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding - 40, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }
    }

}