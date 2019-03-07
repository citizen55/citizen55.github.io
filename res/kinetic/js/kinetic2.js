
document.addEventListener("DOMContentLoaded", ready);

function ready(){
    // import UIPlugin from './KineticScrolling.js';

    var MainScene = new Phaser.Class({

        Extends: Phaser.Scene,
    
        initialize:
    
        function MainScene (config)
        {
            Phaser.Scene.call(this, config)
    
            this.cam;
            this.kinetic;

            this.height = 400;
        },
    
        preload: function ()
        {
            this.load.image('grid', '../img/grid_4096.png');
            this.load.image('crate', '../img/crate.png');
            this.load.image('sky', '../img/sky4.png');

            this.load.scenePlugin({
                key: 'KineticScrolling',
                url: 'js/KineticScrolling.js',
                sceneKey: 'kinetic'
            });
        },
    
        create: function ()
        {
            this.grid = this.add.image(0, 0, 'sky').setOrigin(0);
            this.grid.displayHeight = 400;
            this.cam = this.cameras.main; 
            this.cameras.main.setViewport(0, 0, 800, 600);


            this.scene.add('Bottom', Bottom, true, { x: 0, y: 0, width: 800, height: 200 });

            this.scene.moveDown();

            this.game.events.on('kineticdrag', (pointer) => {
                //debugger;
                this.createImg(pointer);
            })
        },

        createImg(pointer){
            //debugger;
            this.scene.moveUp();
            var vec2 = pointer.positionToCamera(this.cameras.main);
            var box = this.add.image(vec2.x, vec2.y, 'crate');
            // var box = this.add.image(100, 100, 'crate');
            box.setInteractive();
            // this.input.setDraggable(box, true);

            box.on('pointermove', function (pointer) {
                 //debugger;   
                this.x = pointer.x;
                this.y = pointer.y;
        
            }, box);

            box.on('pointerup', function() {
                this.off('pointermove');
            }, box);
        }
    });

    var Bottom = new Phaser.Class({

        Extends: Phaser.Scene,
    
        initialize:
    
        function Bottom ()
        {
            Phaser.Scene.call(this, { key: 'Bottom'});

               
            this.cam;
            this.kinetic;
        },
    
        preload: function ()
        {
            this.load.image('crate', '../img/crate.png');
            this.load.image('grid', '../img/grid_4096.png');
            // this.load.scenePlugin({
            //     key: 'KineticScrolling',
            //     url: 'js/KineticScrolling.js',
            //     sceneKey: 'kinetic'
            // });
        },
    
        create: function ()
        {

           // this.sceneMain = this.scene.get('MainScene');


            var sky = this.add.image(2048, 500, 'grid');
            //sky.displayWidth = 4096;
            this.cam = this.cameras.main;
            this.cam.setViewport(0, 400, 800, 200);
            this.cam.setBounds(0, 400, 4096, 600).setZoom(1);

            // this.cam1 = this.cameras.add(0, 400, 800, 200);
            // this.cam1.setBounds(0, 400, 4096, 600).setZoom(1);

            let config = {
                kineticMovement: true,
                timeConstantScroll: 325, //really mimic iOS
                hScroll: true,          // horizontal with pointer
                vScroll: false,          // vertical
                hWheel: true,          //horizontal scroll mouse wheel
                vWheel: false,           //vertiacal 
                deltaWheel: 20,
                onUpdate: 0 //(x, y) => {console.log('x=' + x + ', y='+ y)}
            };

            this.kinetic.start(this.cam, config);

            for(let i = 0; i < 40; i++){
                let x = i * 100 + 50;

                var box = this.add.image(x, 500, 'crate');
                box.name = x;
                box.setInteractive();
                box.on('clicked', function(box) {
                    console.log('box: ', box.name);
                });

                box.onKineticDown = function(pointer){
                    console.log('down', this.name);
                    // this.scene.tweens.add({
                    //     targets: this,
                    //     rotation: 0.5,
                    //     duration: 200,
                    //     ease: 'Linear'
                    // });
                   // this.scene.game.events.emit('kineticdrag', pointer);
                }

                box.onKineticUp = function(){
                    console.log('up ' + this.name);
                    this.scene.tweens.add({
                        targets: this,
                        rotation: 0,
                        duration: 200,
                        ease: 'Linear'
                    });
                }

                box.onKineticClick = function(){
                    console.log('click ' + this.name);
                }

                this.kinetic.addInteractive(box);
                this.input.setDraggable(box);

                box.on('dragstart', function (pointer) {
                    this.scene.input.emit('kineticdrag', pointer);
                    this.scene.game.events.emit('kineticdrag', pointer);
            
                }, box);

            }

            this.input.dragTimeThreshold = 400;
        },
    
        update: function (time, delta){}
    
    });
      
    const config = {
        title: "Kinetic",
        version: "1.0",
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        scene: [MainScene],
        backgroundColor: "#ffffff"
    };
    var game = new Phaser.Game(config);
}
