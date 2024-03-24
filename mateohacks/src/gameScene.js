import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }



    preload() {
      //this.load.setBaseURL('https://labs.phaser.io');

      this.load.image('floor', 'assets/actualfloor.png');
      this.load.image('player', 'assets/yellow-right.png');
      this.load.image('player.left', 'assets/left.png');

      this.load.image('hammer', 'assets/hammer.png');

      this.load.image("wall", "assets/wall.png");

      this.load.image('final', 'assets/final.png');

    }

    create() {

      this.wallHP = 10

      this.hammercounter = 0;
      this.hammer = this.physics.add.staticGroup()

      this.hammercounterLabel = this.add.text(10, 30, "Hammers Collected: 0", {
        font: "18px Roboto",
        fill: "#ffffff",
      });

      
      this.add.text(10, 10, 'Scene 1', {font: '16px Roboto', fill: '#ffffff'});

      this.floor = this.physics.add.staticGroup();
      this.floor.create(this.game.config.width/2, this.game.config.height /2 +200, "floor");

      this.player = this.physics.add.sprite(300, 300, "player");
      this.player.body.gravity.y = 300;

      this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height, true);
      this.player.setCollideWorldBounds(true);

      this.floor.children.iterate(function (child) {
        child.setImmovable(true);
      });

      this.physics.add.collider(this.player, this.floor);

      this.player.body.setSize(this.player.width - 200, this.player.height -30, true);

      this.hammer = this.physics.add.sprite(0, 0, "hammer");
      this.moveHammer();

      this.wall = this.physics.add.staticGroup();
      this.wall.create(this.game.config.width -50, this.game.config.height/2, "wall");

      

    }

    update() {
      this.movePlayer();
      this.outBounds();
      this.checkHammerCollision();
    }

    checkHammerCollision() {
      if (this.physics.overlap(this.player, this.hammer)) {
        this.hammercounter +=1;
        this.wallHP -=1;
        this.hammercounterLabel.setText("Hammers collected: " + this.hammercounter);
        this.moveHammer();

      }

      if(this.wallHP == 0){
        this.scene.start('FinalScene');
  
      }
      
    }
    


    moveHammer() {
      let positions = [
        { x: 120, y: 155 },
        { x: 680, y: 155 },
        { x: 120, y: 295 },
        { x: 680, y: 395 },
        { x: 120, y: 255 },
        { x: 680, y: 355 },
      ];

      positions = positions.filter(
        (p) => !(p.x === this.hammer.x && p.y === this.hammer.y),
      );

      let newPosition = Phaser.Math.RND.pick(positions);
      this.hammer.setPosition(newPosition.x, newPosition.y);
      this.hammer.setScale(0);

      this.tweens.add({
        targets: this.hammer,
        scale: 1,
        duration: 300,
      });
      this.tweens.add({
        targets: this.player,
        scale: 1.3,
        duration: 300,
        yoyo: true, 
      });

      /**if(this.hammercounter >= 3){
        this.scene.start('GameScene2');
      }     **/   

      
    }



    movePlayer() {
      let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      if (keyW.isDown) {
        this.player.body.velocity.y = -300;
      }
      if (keyA.isDown) {
        this.player.body.velocity.x = -400;
        this.player.setTexture("player.left");
      } else if (keyD.isDown) {
          this.player.body.velocity.x = 400;
          this.player.setTexture("player");
      } else {
        this.player.body.velocity.x = 0;
      }

    }

    outBounds() {
      if (this.player.x >= 1000) {
        this.scene.start('GameScene2');

        //this.scene.stop("gameScene");
       // this.scene.start("gameScene2"); 

        this.player.x = 100;
        this.player.y = 300;
      }
    }
}





export default GameScene;