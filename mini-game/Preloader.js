
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		
		this.bck = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
		this.bck.anchor.setTo(0.5,0.5);
		this.bck.scale.setTo(0.5,0.5);
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0,0.5);
		this.preloadBar.scale.setTo(0.5,1);
		this.preloadBar.x = this.world.centerX - this.preloadBar.width/2;
		
		
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('title', 'assets/title.png');
		this.load.atlas('spriteset', 'assets/spritesheet.png', 'assets/spritesheet.jsona');
		this.load.spritesheet('play','assets/play.png',400,110);
		this.load.spritesheet('back','assets/back.png',400,110);
		this.load.bitmapFont('font', 'assets/fnt2_0.png', 'assets/fnt2.fnt');
		this.load.spritesheet('sprite', 'assets/sprite.png', 120, 120, 6);

	},

	create: function () {

		this.preloadBar.cropEnabled = false;

	},

	update: function () {
		if (this.ready == false)
		{
			this.ready = true;
			this.state.start('Game');
		}

	}

};
