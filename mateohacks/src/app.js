import Phaser from "phaser";

import GameScene from "./gameScene";
import GameScene2 from "./gameScene2";

import finalScene from "./finalScene";


const config = {
    type: Phaser.AUTO,
    width:1000,
    height: 500,
    scene: [GameScene, GameScene2, finalScene],
    physics: {
        default: "arcade",
    },
    backgroundColor: "#386337",
};

const BreakFree = new Phaser.Game(config);