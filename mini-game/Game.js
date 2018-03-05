
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

    create: function () {

        this.toggle = true;
        this.level = 4;

        this.shapes = [];
        this.solution = [];
        this.shapeindex = 0;

        this.shape1 = null;
        this.shape2 = null;

        this.words = ["horse", "plate", "walk", "swim"];

        this.positions = [];

        this.placeBoxes('4x2');

        this.totaltime = 0;
        this.totalclicks = 0;

    },

    nextLevel: function () {
        this.time.events.add(Phaser.Timer.SECOND, function () {
            this.str = (this.level + 1) + 'x2';
            if (this.level == 6) {
                score = this.totaltime;
                clicks = this.totalclicks;
                //this.music.stop();
                this.state.start('EndScreen');
            }
            this.toggle = true;

            this.shapeindex = 0;

            for (var i = 0; i < this.shapes.length; i++) {
                this.shapes[i].destroy();
            }

            this.shape1 = null;
            this.shape2 = null;

            this.placeBoxes(this.str);

            this.level += 1;
        }, this);

    },

    update: function () {
    },

    openShape: function (curShape) {

        this.totalclicks++;
        var win = false;
        var out_tween = this.add.tween(curShape.coverImg).to({alpha: 0}, 100, Phaser.Easing.Sinusoidal.Out, true);
        curShape.visible = true;
        var in_tween = function () {

            if (this.toggle) {
                this.shape1 = curShape;
                this.toggle = false;
                this.shape1.inputEnabled = false;
            }
            else {
                this.shape2 = curShape;
                if (this.shape1.name != this.shape2.name) {
                    var temp_tween1 = this.add.tween(this.shape1.coverImg).to({alpha: 1}, 100, Phaser.Easing.Sinusoidal.Out, true);
                    var temp_tween2 = this.add.tween(this.shape2.coverImg).to({alpha: 1}, 100, Phaser.Easing.Sinusoidal.Out, true);
                    temp_tween2.onComplete.add(function () {
                        this.shape1.inputEnabled = true;

                    }, this);
                }
                else {
                    win = true;
                    this.shape1.inputEnabled = false;
                    this.shape2.inputEnabled = false;
                }
                // }
                this.toggle = true;
            }

        }
        out_tween.onComplete.add(in_tween, this);

    },

    placeBoxes: function (type) {
        this.shapes.length = 0;
        this.shapeindex = 0;
        this.solution.length = 0;

        for (var i = 0; i < 4; i++) {
            var name = this.words.shift();
            for (var j = 0; j < 2; j++) {
                //debugger;
                this.positions[this.shapeindex] = [this.world.centerX - 60 + 120 * j, this.world.centerY - 190 + 120 * i];

                if (this.shapeindex % 2) {

                    this.shapes[this.shapeindex] = this.add.sprite(0, 0, 'sprite', i + 1);
                    // this.shapes[this.shapeindex].alpha = 0;
                    this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
                    this.shapes[this.shapeindex].coverImg = this.add.sprite(0, 0, 'sprite', 0);
                    this.shapes[this.shapeindex].coverImg.anchor.setTo(0.5, 0.5);
                    this.shapes[this.shapeindex].addChild(this.shapes[this.shapeindex].coverImg);
                    this.shapes[this.shapeindex].name = i;
                } else {

                    var txt = this.add.text(0, 0, name);
                    txt.fill = '#000000';

                    this.shapes[this.shapeindex] = txt;
                    //this.shapes[this.shapeindex].alpha = 0;
                    this.shapes[this.shapeindex].coverImg = this.add.sprite(0, 0, 'sprite', 0);
                    this.shapes[this.shapeindex].coverImg.anchor.setTo(0.5, 0.5);
                    this.shapes[this.shapeindex].addChild(this.shapes[this.shapeindex].coverImg);
                    this.shapes[this.shapeindex].anchor.setTo(0.5, 0.5);
                    this.shapes[this.shapeindex].name = i;
                }
                //txt.visible = false;
                this.shapes[this.shapeindex].inputEnabled = true;
                this.shapes[this.shapeindex].events.onInputDown.add(this.openShape, this);
                // this.add.tween(this.shapes[this.shapeindex]).to({alpha:1}, 1000, Phaser.Easing.Sinusoidal.Out, true);
                this.shapeindex++;
            }
        }

        // создаем фигуры
        for (var i = 0; i < this.shapes.length; i++) {
            this.math.shuffleArray(this.positions);
            console.dir(this.positions);
            for (var i = 0; i < this.shapes.length; i++) {
                this.shapes[i].x = this.positions[i][0];
                this.shapes[i].y = this.positions[i][1];
            }
        }
    }
}
