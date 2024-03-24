import Phaser from "phaser";

class FinalScene extends Phaser.Scene {
    constructor() {
        super("FinalScene");
    }

   
   
    preload() {
        this.load.image("final", "assets/final.png");
    }

    create() {
        this.final = this.physics.add.staticGroup();
        this.final.create(this.game.config.width/2, this.game.config.height/2, "final");

        //this.add.text(this.game.config.width/2, this.game.config.height/2, 'YOU BROKE FREE!', {font: '50px Roboto', fill: '#ffffff'});

    }

}
export default FinalScene;