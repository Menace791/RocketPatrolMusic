// Name: Manas Sara
// Project Title: Musical Score (Rocket Patrol Mod)
// Date: April 20, 2022
// Time Taken: Around 12 Hours

// Points Breakdown
// 60 - Redesign Aesthetic
// 20 - Create a New Spaceship Type
// 20 - Implement Mouse Control for Player Movement
// 10 - Implement Parallax Scrolling
// 5  - Implement Speed Increase After 30 Seconds
// 5  - Allow Player to Control Rocket After Fired

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let keyF, keyR, keyLEFT, keyRIGHT, keyLeftClick;

let game = new Phaser.Game(config);

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;