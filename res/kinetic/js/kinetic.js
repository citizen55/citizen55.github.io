
document.addEventListener("DOMContentLoaded", ready);

function ready(){
    var MainScene = new Phaser.Class({

        Extends: Phaser.Scene,
    
        initialize:
    
        function MainScene (config)
        {
            Phaser.Scene.call(this, config)
    
            this.cam;
            this.kinetic;
        },
    
        preload: function ()
        {
            this.load.image('grid', '../img/grid_4096.png');
            this.load.image('crate', '../img/crate.png');

            this.load.scenePlugin({
                key: 'KineticScrolling',
                url: 'KineticScrolling.js',
                sceneKey: 'kinetic'
            });
        },
    
        create: function ()
        {
            this.grid = this.add.image(0, 0, 'grid').setOrigin(0);
            this.cam = this.cameras.main;  
            this.cam.setBounds(0, 0, 4096, 4096).setZoom(1);

            let config = {
                kineticMovement: true,
                timeConstantScroll: 325, //really mimic iOS
                hScroll: true,          // horizontal with pointer
                vScroll: true,          // vertical
                hWheel: false,          //horizontal scroll mouse wheel
                vWheel: true,           //vertiacal 
                deltaWheel: 20,
                onUpdate: 0 //(x, y) => {console.log('x=' + x + ', y='+ y)}
            };
            
            this.kinetic.start(this.cam, config);
    
            for(let i = 0; i < 40; i++){
                for(let j = 0; j < 40; j++){
    
                    let x = i * 100 + 50;
                    let y = j * 100 + 50;
    
                    var box = this.add.image(x, y, 'crate');
                    box.name = x + y;
                    box.setInteractive();
                    box.on('clicked', function(box) {
                       console.log('box: ', box.name);
                   });
    
                   box.onKineticDown = function(){
                       console.log('down', this.name);
                       //debugger;
                       this.scene.tweens.add({
                            targets: this,
                            rotation: 0.5,
                            duration: 200,
                            ease: 'Linear'
                        });
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
                }
            }
        },
    });
    
    
    const config = {
        title: "Kinetic",
        version: "1.0",
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        //resolution: window.devicePixelRatio,
        scene: [MainScene],
        // input: {
        //     keyboard: true
        // },
        backgroundColor: "#ffffff"
        //render: { pixelArt: true, antialias: false },
    
        // , plugins: {
        //     global: [{
        //         key: 'kinetic',
        //         plugin: Kinetic,
        //         mapping: "kinetic"
        //     }]
        // },
    };
    var game = new Phaser.Game(config);
}



