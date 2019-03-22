
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

            this.height = 400;
        },
    
        preload: function ()
        {
            this.load.image('grid', 'img/grid_4096.png');
            this.load.image('crate', 'img/crate.png');
            this.load.image('sky', 'img/sky4.png');

            this.load.scenePlugin({
                key: 'KineticScrolling',
                url: 'js/main.js',
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

            this.game.events.once('kineticdrag', this.createBox, this);
        },

        createBox(pointer){
            this.createImg(pointer);
            setTimeout(function(){
                this.game.events.once('kineticdrag', this.createBox, this);
            }.bind(this), 500);
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
            this.load.image('crate', 'img/crate.png');
            this.load.image('grid', 'img/grid_4096.png');
        },
    
        create: function ()
        {
            _this = this;
            this.beginTime = Date.now();
            this.txt = '';


            

            var sky = this.add.image(2048, 500, 'grid');
            sky.displayWidth = 4096;
            this.cam = this.cameras.main;
            this.cam.setViewport(0, 400, 800, 200);
            this.cam.setBounds(0, 400, 4096, 600).setZoom(1);

            // this.debugTxt = this.add.text(600, 420, '', {
            //     fontSize: '22px',
            //     fill: '#ffffff'
            // });
            //this.debugTxt.setScrollFactor(0);

          // this.updateDebugTxt('begin ' + this.beginTime);

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

                box.bottom = this;


                box.on('click', function(box) {
                    console.log('box: ', box.name);
                    this.debugText('click on box ' + box.name);
                   // _this.updateDebugTxt('click on box: ' + box.name);
                }, this);

                box.onKineticDown = function(pointer){
                    console.log('down', this.name);
                    _this.debugText('KineticDown on box '+ this.name);
                    this.scene.tweens.add({
                        targets: this,
                        rotation: 0.5,
                        duration: 200,
                        ease: 'Linear'
                    });
                }

                box.onKineticUp = function(){
                    console.log('KineticUp ' + this.name);
                    _this.debugText('box: KineticUp ' + this.name);
                    this.scene.tweens.add({
                        targets: this,
                        rotation: 0,
                        duration: 200,
                        ease: 'Linear'
                    });
                }

                box.onKineticClick = function(){
                    console.log('click ' + this.name);
                    _this.debugText('box: kineticClick name: ' + this.name);
                }

                this.kinetic.addInteractive(box);
                
               // this.input.setDraggable(box);

                //this.input.once('dragstart', this.drag, this);

            }

            //this.input.dragTimeThreshold = 1500;
            //this.input.dragDistanceThreshold = 24;

            this.input.on('pointerdown', function(pointer){
                _this.debugText('In scene ' + _this.scene.key + ' ptr.x: ' + pointer.x + ' ptr.y: ' + pointer.y);
               // _this.updateDebugTxt('pointerdown');
            })
        },

        drag(pointer, box){
            console.log('dragstart', box.name);
            this.sys.game.events.emit('kineticdrag', pointer);
            //this.scene.input.emit('kineticdrag', pointer);
            //this.scene.game.events.emit('kineticdrag', pointer);
            this.debugText(
                'box.name: ' + box.name + ' ' + _this.scene.key + ' dragstart ptr.x: ' 
                + pointer.x + ' ptr.y: ' + pointer.y
            );

            // setTimeout(function(){
            //     this.input.once('dragstart', this.drag, this);
            // }.bind(this), 1000);
        },
    
        update: function (time, delta){
        },

        debugText(str){
            var ms = Date.now() - this.beginTime;
            this.txt += str + ' time: ' + ms + '\n';
            this.downloadLogFile();
        },

        downloadLogFile() {
            var log = 'data:text/plian;charset=utf-8,' + encodeURIComponent(this.txt),
                elem = document.getElementById('download-btn');
    
            if(!elem) {
                wrapper = document.getElementById('phaser-example');
                wrapper.setAttribute('style', 'font-size: 30px; position: absolute;');
                elem = document.createElement("a");
                elem.id = 'download-btn';
                elem.style.color = 'white';
                elem.innerHTML = 'Скачать log';
                wrapper.appendChild(elem);
              
                // document.body.appendChild(wrapper);
            }
    
            elem.setAttribute("href", log);
            elem.setAttribute("download", 'log.txt');
        },

        updateDebugTxt (str){
            this.debugTxt.setText(str);
        }

    
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
