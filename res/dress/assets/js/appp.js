var path = {
		img: 'assets/img/game/',
		gui: 'assets/img/interface/',
		json: 'assets/json/',
		audio: 'assets/audio/',
		loader: 'assets/img/loader/'
	};

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 1280,
	parent: 'game',
	scene: {
		preload: preload,
		create: create,
		update: update,
		pack: {
			files: [
				{ type: 'image', key: 'loader-bg', url: path.loader+'bg.png' },
				{ type: 'image', key: 'loader-logo', url: path.loader+'logo.png' },
				//{ type: 'image', key: 'loader-banner', url: path.loader+'banner.png' },
			]
		}
	},
	callbacks: {
		postBoot: function (game) {
			game.canvas.style.display = 'block';
			game.canvas.style.margin = 'auto';

			window.addEventListener('resize', resize);
    		resize();
		}
	}
}

var game = new Phaser.Game(config);

function preload() {
	this.cameras.main.setBackgroundColor('#fff');

	var bg = this.add.image(config.width/2, config.height/2, 'loader-bg');
	
	this.add.image(bg.x, bg.y - bg.height/3, 'loader-logo');

	var txt = this.add.text(bg.x, bg.y, 'loading 0%').setOrigin(0.5);

	txt.setFontFamily('Tahoma');
	txt.setFontSize('32px');

	//var banner = this.add.image(config.width/2, config.height/2 * 1.5, 'loader-banner');

	this.load.atlas('items', path.img+data.items+'.png', path.json+data.items+'.json');
	this.load.image('bg', path.img+data.background);

	this.load.json('coords', path.json+data.items+'-coords.json');

	this.load.image('menu', path.img+data.menu.background);
	this.load.image('gui-bg', path.gui+'bg1.png');
	this.load.image('arrow-left', path.gui+'arrow-left.png');
	this.load.image('arrow-right', path.gui+'arrow-right.png');
	this.load.image('item-bg', path.gui+'item-bg.png');
	this.load.image('girl', path.img+'girl.png');
	this.load.image('hair-icon', path.gui+'hair.png');
	this.load.image('top-icon', path.gui+'top.png');
	this.load.image('skirt-icon', path.gui+'skirt.png');
	this.load.image('dress-icon', path.gui+'dress.png');
	this.load.image('shoes-icon', path.gui+'shoes.png');
	this.load.image('jew-icon', path.gui+'jew.png');
	this.load.image('tab', path.gui+'tab.png');
	this.load.image('next', path.gui+'next.png');
	this.load.image('restart', path.gui+'reload.png');
	this.load.image('sound', path.gui+'sound.png');
	this.load.image('logo', path.gui+data.logo.file);

	if(data.sound.enable === true || !data.sound.enable) {
		this.load.audio('bg-sound', path.audio+data.sound.file);
	}

	for (var i = 0; i < data.promo.length; i++) {
		var name = data.promo[i].file.split('.')[0];

		this.load.image(name, path.gui+data.promo[i].file);
	}

	this.load.on('progress', function(e) {
		txt.setText('loading '+Math.round(e*100)+'%');
	});

	this.load.on('complete', function(e) {
		sleep(data.banner.wait * 1000);
	}, this);
}

function create() {
	this.add.image(0, 0, 'bg').setOrigin(0); // добавляем фон
	this.add.image(config.width/2, (config.height - getSize('gui-bg').height)/2 + 30, 'girl'); // добавляем девушку

	var layers = [ // слои по убыванию
			'shoes', //обувь
			'bracl', // браслеты
			'skirt', // юбки-джинсы
			'top', // топы
			'dress', // платья
			'up', //пиджаки
			'nec', // цепочки
			'hair', // волосы
			'ear', // серьги
			'crown', // корона
			'bag', // сумки
		];

	var sections = [ // в каком разделе какая одежда
		{name: 'hair', items: ['hair']},
		{name: 'top', items: ['top', 'up']},
		{name: 'skirt', items: ['skirt']},
		{name: 'dress', items: ['dress']},
		{name: 'shoes', items: ['shoes']},
		{name: 'jew', items: ['bag', 'nec', 'ear', 'bracl', 'crown']}
	];
	
	var atlas = this.textures.get('items');
	var coords = this.cache.json.get('coords') || {};

	
	this.Items = new Items(atlas, coords, layers, this);

	this.GUI = new GUI(atlas, sections, this);

	this.GUI.items.show(0);

	this.Menu = new Menu(this);
}

function update() {
	this.Items.controlCursors();	
}

function Menu(game) {
	//this.start = game.add.image();
	var bg = game.add.image(0, 0, 'menu').setOrigin(0),
		btn = game.add.renderTexture(0, 0, bg.width, bg.height/2).setInteractive(),
		logo = game.add.image(config.width - 50, config.height - 50, 'logo').setOrigin(1).setInteractive();

	btn.on('pointerdown', function() {
		this.start();
	}, this);

	logo.on('pointerdown', function() {
		location.href = data.logo.link;
	});

	this.start = function() {
		bg.destroy();
		btn.destroy();
		logo.destroy();

		var AudioContext = window.AudioContext || window.webkitAudioContext;

		if(AudioContext) {
			var audio = new AudioContext();
			audio.resume();	
		}
		
		game.btn.sound();
	}
}

function Items(atlas, coords, layers, game) {
	var frames = atlas.getFrameNames(),
		cursors = game.input.keyboard.createCursorKeys(),
		ALT = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT),
		_this = this;

	this.items = [];

	this.selected;
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		for (var j = 0; j < frames.length; j++) {
			var frame = frames[j];
			if(~frame.indexOf(layer)) {
				if(coords[frame]) {
					_this.items[frame] = game.add.image(coords[frame].x, coords[frame].y, atlas.key, frame);
				} else {
					_this.items[frame] = game.add.image(config.width/2, config.height/2, atlas.key, frame);
				};

				_this.items[frame].name = frame;
				_this.items[frame].setInteractive();
				_this.items[frame].visible = false;

				if(data.developerMode === true) {
					game.input.setDraggable(_this.items[frame]);
				};
				_this.items[frame].on('pointerdown', function(e) {
					var name = _this.selected = this.name,
						type = name.replace(/\d/g, '');

					if(data.developerMode === true) {
						if(ALT.isDown) {
							_this.items[name].visible = false;
							game.dressed[type] = null;
						};

						return;
					}

					_this.items[name].visible = false;
					game.dressed[type] = null;
				});
			};
		};
	};

	game.items = this.items;

	game.input.on('drag', function(pointer, obj, x, y) {
		obj.x = x;
		obj.y = y;

		_this.recordPosition(obj.name, obj.x, obj.y);
	});

	this.controlCursors = function() {
		var name = this.selected,
			keyboard = Phaser.Input.Keyboard,
			item = this.items[name];

		if(!name || data.developerMode === false) {
			return;
		};

		if(keyboard.JustDown(cursors.up)) {
			item.y -= 1;
		} else if(keyboard.JustDown(cursors.down)) {
			item.y += 1;
		} else if(keyboard.JustDown(cursors.left)) {
			item.x -= 1;
		} else if(Phaser.Input.Keyboard.JustDown(cursors.right)) {
			item.x += 1;
		};

		this.recordPosition(name, item.x, item.y);
	}

	this.recordPosition = function(name, x, y) {
		coords[name] = {
			x: x,
			y: y,
		}

		this.downloadJSON();
	}

	this.downloadJSON = function() {
		var json = 'data:text/json;charset=utf-8,'+encodeURIComponent(JSON.stringify(coords)),
			elem = document.getElementById('download-btn');

		if(!elem) {
			elem = document.createElement("a");
			elem.id = 'download-btn';
			elem.innerHTML = 'Скачать';

			document.body.appendChild(elem);
		}

		elem.setAttribute("href", json);
		elem.setAttribute("download", data.items+'-coords.json');
	}
}

function GUI(atlas, sections, game) {
	var bg = game.add.image(0, config.height - getSize('gui-bg').height, 'gui-bg').setOrigin(0);

	var layer = game.add.group();

	layer.add(bg);

	this.icons = icons = {
		selected: 0,
		offset: config.width/(sections.length + 1),
		x: [0],
		y: bg.y + 45/2,
		create: function() {
			var	x = this.x,
				y = this.y,
				offset = this.offset,
				_this = this;

			x[0] = offset;

			for (var i = 0; i < sections.length; i++) {
				var name = sections[i].name+'-icon';

				var icon = game.add.image(x[i], y, name).setInteractive();

				layer.add(icon);

				icon.name = i;

				x.push(x[i] + offset);

				icon.on('pointerdown', function(e) {
					tab.x = this.x;

					tab.tilePositionX = this.name * tab.width;

					_this.selected = this.name;
					items.show(this.name);
				});
			}

			var tab = game.add.tileSprite(x[0], y - 4, getSize('tab').width/6, getSize('tab').height, 'tab');

			layer.add(tab);
		}
	}

	icons.create();

	this.btn = btn = {
		names: ['restart', 'next', 'sound'],
		width: getSize('restart').width,
		height: getSize('restart').height,
		offset: 80,
		create: function() {
			var names = this.names,
				width = this.width,
				height = this.height,
				offset = this.offset,
				_this = this;

			this.btn = btn = {};

			for (var i = 0; i < names.length; i++) {
				var name = names[i];
				btn[name] = null;

				if(getSize(name).width > width) {
					btn[name] = game.add.tileSprite(config.width - offset, offset * (i + 1), width, height, name);
				} else {
					btn[name] = game.add.image(config.width - offset, offset * (i + 1), name);
				}

				if(name != names[0])
					layer.add(btn[name]);

				btn[name].setInteractive();
				btn[name].name = name;
				btn[name].on('pointerdown', function() {
					var name = this.name;

					_this[name]();
				});
			}

			if(data.sound.enable === true || !data.sound.enable) {
				game.music = game.sound.add('bg-sound', {loop: true});
			}
		},
		next: function() {
			var images = layer.getChildren();
			images.forEach(function(image) {
				image.visible = false;
			});

			var length = data.promo.length,
				offset = config.width/(length + 1);

			for (var i = 0; i < length; i++) {
				var promo = data.promo[i],
					name = promo.file.split('.')[0];
					link = promo.link;

				var obj = game.add.image(offset*(i + 1), 1100, name).setInteractive();

				obj.name = link;

				obj.on('pointerdown', function() {
					//window.open(this.name, '_blank');
					location.href = this.name;
				});
			}
		},
		restart: function() {
			game.btn.sound();
			game.scene.restart();
		},
		sound: function() {
            var btn = this.btn['sound'];
            
            //todo не дает запуститься музыке из политике в автопроигрывании
			if(data.sound.enable === false || !data.sound.file) {
				btn.destroy();
				return;
			}

			if(game.music.isPlaying === true) {
				btn.tilePositionX = btn.width;
				game.music.stop();
				return;
			}

			game.music.play();

			btn.tilePositionX = 0;
		}
	}

	btn.create();

	game.btn = this.btn;

	var logo = game.add.image(100, this.btn.offset, 'logo')
			.setInteractive()
			.on('pointerdown', function() {
				location.href = data.logo.link;
			});

	layer.add(logo);

    /**
     * стрелки для передвижения ленты с предметами
     * при нажатии вызывают метод move(direction) передают свое имя - left right
     */
	this.arrows = arrows = {
		names: ['arrow-left', 'arrow-right'],
		color: 'ccccccc',
		padding: 10,
		width: getSize('arrow-left').width || getSize('arrow-right').width,
		height: bg.height - 45 - 4,
		x: [0],
		y: 0,
		create: function() {
			var names = this.names,
				color = '0x'+this.color,
				padding = this.padding*2,
				width = this.width,
				height = this.height,
				x = this.x,
				y = this.y,
				_this = this;

			width += padding;
			x[0] = padding;
			x.push(config.width - width/2);
			y = bg.y + height/2 + 45;

			for (var i = 0; i < names.length; i++) {
                var name = names[i];
				var	arrow = game.add.renderTexture(x[i] - padding, config.height - height - 2, width, height);
                    arrow.setInteractive();
                    
				arrow.fill(color);
				arrow.draw(name, padding/2, height/2 - getSize(name).height/2);

				layer.add(arrow);

				arrow.name = name;

				arrow.on('pointerdown', function() {
					
					var name = this.name.substr(6);
					_this.move(name);
				});
			};
		},
		moves: false,
		move: function(direction) {
			if(items.moves === true) return;

			var list = items.list[icons.selected];

			if(list.steps[direction] <= 0) return;

            debugger
            
			items.moves = true;
			game.tweens.add({
				targets: list.GameObjects,
				x: (direction == 'left' ? '+=' : '-=') + (getSize('item-bg').width + items.offset),
				duration: 200,
				onComplete: function() {
					items.moves = false;
					list.steps[direction] -= 1;
					list.steps[direction == 'left' ? 'right' : 'left'] += 1;
				}
			})

			
		}
	}

    
	this.items = items = {
		offset: (config.width - getSize('item-bg').width * sections.length - arrows.width  * arrows.names.length)/(sections.length + 1),
		moves: false,
		sort: function() {
			var	frames = atlas.getFrameNames(),
				sorted = [];

			game.dressed = [];
			for(var i = 0; i < sections.length; i++) {
				var name = sections[i].name,
					items = sections[i].items;

				sorted[i] = [];
				for(var j = 0; j < items.length; j++) {
					var item = items[j];

					game.dressed[item] = null;

					for(var k = 0; k < frames.length; k++) {
						if(~frames[k].indexOf(item)) {
							sorted[i].push(frames[k]);
						};
					};
				};
			};

			return sorted;
        },
		create: function(sorted_items) {
			var offset = this.offset;
			var	list = [];

			for (var i = 0; i < sorted_items.length; i++) {
                var things = sorted_items[i];
                var width = getSize('item-bg').width;
                var height = getSize('item-bg').height;
				var	x = [arrows.width + width/2 + offset];
                var	y = bg.y + (bg.height + 45)/2;
                

				list[i] = {};
                list[i].GameObjects = [];
                //обходим массив с определенными вещами
				for (var j = 0; j < things.length; j++) {
					var name = things[j];
					var texture = game.add.renderTexture(x[j], y, width, height)
						.setInteractive()
						.setOrigin(0.5);
					var	thing = game.add.image(0, 0, atlas.key, name);

					//list[i].GameObjects[j] = [];

					thing.setScale((height - 20) / thing.height);

					if(thing.displayWidth - width > 0) {
						thing.setScale((width - 20) / thing.width);
					}

					texture.draw('item-bg', 0, 0);
					texture.draw(thing, width/2, height/2);

					layer.add(texture);

					thing.destroy();

					texture.name = name;
					texture.on('pointerdown', function() {
                        debugger;
						var	name = this.name,
							type = name.replace(/\d/g, ''),
							dressed = game.dressed;
						
						if(dressed[type]) {
							var item = dressed[type];

							game.items[item].visible = false;
						}

						var check_types = ['top', 'skirt', 'up'];

						check_types.forEach(function(val) {
							var name = dressed[val];

							if(type == 'dress') {
								if(name) {
									game.items[name].visible = false;

									dressed[val] = null;
								}
							} else if(type == val) {
								if(dressed['dress']) {
									name = dressed['dress'];

									game.items[name].visible = false;

									dressed['dress'] = null;
								}
							}
						});


						dressed[type] = name;

						game.items[name].visible = true;
					});

					list[i].GameObjects.push(texture);
					
					texture.visible = false;

					x.push(x[j] + width + offset);
				}
				list[i].steps = {
					left: 0,
					right: list[i].GameObjects.length - 6
				};
			}
			this.list = list;
        },
        
        /**
         * показать текущий список
         * @param {number} num 
         */
		show: function(num) {
			var lists = this.list;

			for (var i = 0; i < lists.length; i++) {
				var list = lists[i].GameObjects;
				lists[i].GameObjects.forEach(function(item) {
					if(i != num) {
						item.visible = false;

						return;
					}
					item.visible = true;
				});
			}
		}
	}

	var sorted_items = items.sort();
	
	items.create(sorted_items);
	arrows.create();
}

function getSize(name) {
	return {
		width: game.textures.list[name].source[0].width,
		height: game.textures.list[name].source[0].height
	};
}

function resize() {
	var canvas = game.canvas,
		width = window.innerWidth,
		height = window.innerHeight;

	var wratio = width / height,
	ratio = canvas.width / canvas.height;

	if (wratio < ratio) {
		canvas.style.width = width + "px";
		canvas.style.height = (width / ratio) + "px";
	} else {
		canvas.style.width = (height * ratio) + "px";
		canvas.style.height = height + "px";
	}
}

function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) {}
}