/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([469,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BootScene = undefined;

__webpack_require__(73);

var _set = __webpack_require__(224);

var BootScene = exports.BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BootScene(config) {
        Phaser.Scene.call(this, {
            key: 'BootScene',
            pack: {
                files: [{ type: 'image', key: 'loader-bg', url: _set.path.loader + 'bg.png' }, { type: 'image', key: 'loader-logo', url: _set.path.loader + 'logo.png' }]
            }
        });
    },

    preload: function preload() {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
        this.cameras.main.setBackgroundColor('#fff');
        var bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'loader-bg');

        this.add.image(bg.x, bg.y - bg.height / 3, 'loader-logo');

        var txt = this.add.text(bg.x, bg.y, 'loading 0%').setOrigin(0.5);
        txt.setFontFamily('Tahoma');
        txt.setFontSize('32px');

        this.load.atlas('items', _set.path.img + data.items + '.png', _set.path.json + data.items + '.json');
        this.load.image('bg', _set.path.img + data.background);

        this.load.json('coords', _set.path.json + data.items + '-coords.json');

        this.load.image('menu', _set.path.img + data.menu.background);
        this.load.image('gui-bg', _set.path.gui + 'bg1.png');
        this.load.image('arrow-left', _set.path.gui + 'arrow-left.png');
        this.load.image('arrow-right', _set.path.gui + 'arrow-right.png');
        this.load.image('item-bg', _set.path.gui + 'item-bg.png');
        this.load.image('girl', _set.path.img + 'girl.png');
        this.load.image('hair-icon', _set.path.gui + 'hair.png');
        this.load.image('top-icon', _set.path.gui + 'top.png');
        this.load.image('skirt-icon', _set.path.gui + 'skirt.png');
        this.load.image('dress-icon', _set.path.gui + 'dress.png');
        this.load.image('shoes-icon', _set.path.gui + 'shoes.png');
        this.load.image('jew-icon', _set.path.gui + 'jew.png');

        this.load.image('next', _set.path.gui + 'next.png');
        this.load.image('restart', _set.path.gui + 'reload.png');
        this.load.image('logo', _set.path.gui + data.logo.file);

        this.load.spritesheet('tab', _set.path.gui + 'tab.png', { frameWidth: 86, frameHeight: 58 });
        this.load.spritesheet('sound', _set.path.gui + 'sound.png', { frameWidth: 71, frameHeight: 51 });

        if (data.sound.enable === true || !data.sound.enable) {
            this.load.audio('bg-sound', _set.path.audio + data.sound.file);
        }

        for (var i = 0; i < data.promo.length; i++) {
            var name = data.promo[i].file.split('.')[0];

            this.load.image(name, _set.path.gui + data.promo[i].file);
        }

        this.load.on('progress', function (e) {
            txt.setText('loading ' + Math.round(e * 100) + '%');
        });

        // this.load.on('complete', (e) => {

        //     sleep(data.banner.wait * 1000);
        // });
    },

    create: function create() {
        var _this = this;

        setTimeout(function () {
            _this.scene.start('MenuScene');
        }, data.banner.wait * 1000);
    },

    resize: function resize() {

        var canvas = this.game.canvas,
            width = window.innerWidth,
            height = window.innerHeight;

        var wratio = width / height,
            ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = width / ratio + "px";
        } else {
            canvas.style.width = height * ratio + "px";
            canvas.style.height = height + "px";
        }
    }
});

/***/ }),

/***/ 1152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MenuScene = undefined;

__webpack_require__(73);

var MenuScene = exports.MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function MenuScene(config) {
        Phaser.Scene.call(this, {
            key: 'MenuScene'
        });

        this.bg;
        this.btn;
        this.logo;
    },

    create: function create() {
        var config = this.game.config;

        this.bg = this.add.image(0, 0, 'menu').setOrigin(0), this.btn = this.add.renderTexture(0, 0, this.bg.width, this.bg.height / 2).setInteractive(), this.logo = this.add.image(config.width - 50, config.height - 50, 'logo').setOrigin(1).setInteractive();

        this.btn.on('pointerdown', function () {
            this.scene.start('MainScene');
        }, this);

        this.logo.on('pointerdown', function () {
            location.href = data.logo.link;
        });
    }

});

/***/ }),

/***/ 1153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainScene = undefined;

__webpack_require__(73);

var _Utils = __webpack_require__(142);

var _stuff = __webpack_require__(1154);

var _gui = __webpack_require__(1155);

var MainScene = exports.MainScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function MainScene(config) {
        Phaser.Scene.call(this, {
            key: 'MainScene'
        });
    },

    preload: function preload() {},

    create: function create() {
        var _this = this;

        if (data.sound.enable === true || !data.sound.enable) {
            this.game.music = this.game.sound.add('bg-sound', { loop: true });
        }

        var conf = this.game.config;
        this.add.image(0, 0, 'bg').setOrigin(0); // добавляем фон
        var height = (conf.height - (0, _Utils.getSize)('gui-bg', this).height) / 2 + 30;
        this.add.image(conf.width / 2, height, 'girl'); // добавляем девушку

        var layers = [// слои по убыванию
        'shoes', //обувь
        'bracl', // браслеты
        'skirt', // юбки-джинсы
        'top', // майки
        'dress', // платья
        'up', //пиджаки
        'nec', // цепочки
        'hair', // волосы
        'ear', // серьги
        'crown', // корона
        'bag'];

        var sections = [// в каком разделе какая одежда
        { name: 'hair', items: ['hair'] }, { name: 'top', items: ['top', 'up'] }, { name: 'skirt', items: ['skirt'] }, { name: 'dress', items: ['dress'] }, { name: 'shoes', items: ['shoes'] }, { name: 'jew', items: ['bag', 'nec', 'ear', 'bracl', 'crown'] }];

        var atlas = this.textures.get('items');
        var coords = this.cache.json.get('coords') || {};

        this.stuff = new _stuff.Stuff(atlas, coords, layers, this);
        this.stuff.create();

        this.GUI = new _gui.GUI(this);
        this.GUI.create();

        this.scene.launch('SelectScene', { atlas: atlas, sections: sections });
        this.scene.moveDown();

        this.input.on('restart', function () {
            //game.btn.sound(); ?
            if (_this.scene.isActive('SelectScene')) {
                _this.scene.stop('SelectScene');
            }
            if (_this.scene.isActive('PromoScene')) {
                _this.scene.stop('PromoScene');
            }

            _this.scene.start('MenuScene');
        });
    },

    update: function update() {
        // dev mode
        this.stuff.update();
    }
});

/***/ }),

/***/ 1154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Stuff = exports.Stuff = new Phaser.Class({

    initialize: function Stuff(atlas, coords, layers, scene) {
        this.items = [];
        this.devSelected;
        this.cursors;
        // this.selectedStuff = [];
        /**
         * объект для хранения активного типа объектов
         * например top dress shoes и прочее
         */
        this.dressType = {};
        this.atlas = atlas;
        this.coords = coords;
        this.layers = layers;
        this.scene = scene;
    },

    create: function create() {
        var _this = this;

        var game = this.scene.game;
        var config = game.config;
        var frames = this.atlas.getFrameNames();

        var cursors = this.scene.input.keyboard.createCursorKeys();

        var ALT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
        //_this = this; 

        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            for (var j = 0; j < frames.length; j++) {
                var frame = frames[j];
                var thing = {};
                if (!frame.indexOf(layer)) {
                    if (this.coords[frame]) {
                        thing = this.scene.add.image(this.coords[frame].x, this.coords[frame].y, this.atlas.key, frame);
                        //this.items[frame] = 
                    } else {
                        thing = this.scene.add.image(config.width / 2, config.height / 2, this.atlas.key, frame);
                        // this.items[frame] = this.scene.add.image(config.width / 2, config.height / 2, this.atlas.key, frame);
                    }

                    thing.name = frame;
                    thing.visible = false;
                    // this.items[frame].name = frame;
                    // this.items[frame].visible = false;

                    thing.setInteractive({ pixelPerfect: true });
                    this.items[frame] = thing;

                    if (data.developerMode === true) {
                        this.scene.input.setDraggable(thing);
                    }
                }
            }
        }

        if (data.developerMode === false) {
            this.scene.input.on('gameobjectup', function (pointer, obj) {

                if (!obj.name) return;
                var name = obj.name;
                _this.items[name].visible = false;

                // тип вещи которую убираем
                var thingType = name.replace(/\d/g, '');
                _this.dressType[thingType] = undefined;
            });
        }

        //game.items = this.items;
        if (data.developerMode === true) {

            this.cursors = this.scene.input.keyboard.createCursorKeys();

            this.scene.input.on('drag', function (pointer, obj, x, y) {
                _this.devSelected = obj.name;
                obj.x = x;
                obj.y = y;

                _this.recordPosition(obj.name, obj.x, obj.y);
            });
        }

        this.scene.game.events.on('select-stuff', function (curName) {

            var curType = curName.replace(/\d/g, '');

            // типы не совместимые с платьем проверяем 
            var specialTypes = ['top', 'skirt', 'up'];
            specialTypes.forEach(function (type) {
                if (curType == type) {
                    if (_this.dressType['dress'] != undefined) {
                        _this.items[_this.dressType['dress']].visible = false;
                        _this.dressType['dress'] = null;
                    }
                } else if (curType == 'dress') {
                    if (_this.dressType[type] != undefined) {
                        // убираем майки
                        _this.items[_this.dressType[type]].visible = false;
                        _this.dressType[type] = undefined;
                    }
                }
            });

            // 
            if (_this.dressType[curType] != undefined) {
                var prevName = _this.dressType[curType]; // 

                // проверяем одета ли уже эта вещь, если нет меняем
                if (prevName != curName) {
                    _this.items[prevName].visible = false;
                    _this.items[curName].visible = true;
                    _this.dressType[curType] = curName;
                } else {
                    //иначе убираем вещь (второй клик на одетой вещи)
                    _this.items[prevName].visible = false;
                    _this.dressType[curType] = undefined;
                }
            } else {
                _this.items[curName].visible = true;
                _this.dressType[curType] = curName;
            }
        });
    },
    controlCursors: function controlCursors() {
        var name = this.devSelected;
        var keyboard = Phaser.Input.Keyboard;
        var item = this.items[name];

        if (!name || data.developerMode === false) {
            return;
        };

        if (keyboard.JustDown(this.cursors.up)) {
            item.y -= 1;
        } else if (keyboard.JustDown(this.cursors.down)) {
            item.y += 1;
        } else if (keyboard.JustDown(this.cursors.left)) {
            item.x -= 1;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            item.x += 1;
        };

        this.recordPosition(name, item.x, item.y);
    },
    recordPosition: function recordPosition(name, x, y) {
        this.coords[name] = {
            x: x,
            y: y
        };

        this.downloadJSON();
    },
    downloadJSON: function downloadJSON() {
        var json = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.coords)),
            elem = document.getElementById('download-btn');

        if (!elem) {
            elem = document.createElement("a");
            elem.id = 'download-btn';
            elem.innerHTML = 'Скачать';

            document.body.appendChild(elem);
        }

        elem.setAttribute("href", json);
        elem.setAttribute("download", data.items + '-coords.json');
    },
    update: function update() {
        if (data.developerMode === true) {
            this.controlCursors();
        };
    }
});

/***/ }),

/***/ 1155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GUI = undefined;

var _Utils = __webpack_require__(142);

var _button = __webpack_require__(1156);

var GUI = exports.GUI = new Phaser.Class({

    initialize: function GUI(scene) {
        this.scene = scene;
        this.conf = this.scene.game.config;
    },

    create: function create() {
        this.createBtn();
    },
    createBtn: function createBtn() {
        var _this = this;

        var config = void 0;
        var offset = 80;

        if (data.sound.enable === true && data.sound.file) {
            config = {
                'scene': this.scene,
                'key': 'sound',
                'imgEnable': 0,
                'imgDisable': 1,
                'x': this.conf.width - 80,
                'y': 240,
                enable: false,
                callback: function callback() {
                    console.log('sound');
                    if (_this.scene.game.music.isPlaying === true) {
                        _this.scene.game.music.stop();
                    } else {
                        _this.scene.game.music.play();
                    }
                }
            };
            this.btnSound = new _button.Button(config);
        }

        config = {
            'scene': this.scene,
            'key': 'next',
            'x': this.conf.width - 80,
            'y': 160,
            callback: function callback() {
                _this.scene.game.events.emit('promo');
            }
        };
        this.btnNext = new _button.Button(config);

        config = {
            'scene': this.scene,
            'key': 'restart',
            'x': this.conf.width - 80,
            'y': 80,
            callback: function callback() {
                _this.scene.input.emit('restart');
            }
        };
        this.btnRestart = new _button.Button(config);

        config = {
            'scene': this.scene,
            'key': 'logo',
            'x': 100,
            'y': 80,
            callback: function callback() {
                location.href = data.logo.link;
            }
        };

        this.btnLogo = new _button.Button(config);

        this.scene.game.events.on('promo', function () {
            _this.scene.tweens.add({
                targets: [_this.btnNext, _this.btnSound],
                x: '+=200',
                duration: 1000,
                ease: 'Sine.easeInOut'
            });
            _this.scene.tweens.add({
                targets: _this.btnLogo,
                x: '-=200',
                duration: 1000,
                ease: 'Sine.easeInOut'
            });
        });
    }
});

/***/ }),

/***/ 1156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Button = exports.Button = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize: function Button(config) {
        // debugger;
        Phaser.GameObjects.Sprite.call(this, config.scene, config.x, config.y, config.key, config.frame);

        this.scene = config.scene;
        this.key = config.key || '';
        this.callback = config.callback || function () {};
        this.x = config.x || 0;
        this.y = config.y || 0;

        if (config.out != undefined) {
            this.out = config.out;
        }
        if (config.up != undefined) {
            this.up = config.up;
        }
        if (config.down != undefined) {
            this.down = config.down;
        }
        if (config.over != undefined) {
            this.over = config.over;
        }

        if (config.imgEnable != undefined) {
            this.imgEnable = config.imgEnable || 0;
        }

        if (config.imgDisable != undefined) {
            this.imgDisable = config.imgDisable;
        }

        if (config.enable != undefined) {
            this.enable = config.enable;
            if (this.imgEnable) {
                this.setFrame(this.imgEnable);
            } else {
                this.setFrame(this.imgDisable);
            }
        }

        this.up = config.up || 0;
        this.over = config.over || 0;
        this.down = config.down || 0;

        this.scene.add.existing(this);

        this.setInteractive({ useHandCursor: true }).on('pointerover', this.onPointerOver, this).on('pointerout', this.onPointerOut, this).on('pointerdown', this.onPointerDown, this).on('pointerup', this.onPointerUp, this);
    },

    onPointerUp: function onPointerUp() {
        this.setFrame(this.up);
        if (this.enable != undefined && this.enable == true) {
            this.enable = false;
            this.setFrame(this.imgDisable);
        } else if (this.enable != undefined && this.enable == false) {
            this.enable = true;
            this.setFrame(this.imgEnable);
        }
        this.callback();
    },
    onPointerOver: function onPointerOver() {
        if (this.over) {
            this.setFrame(this.over);
        }
    },
    onPointerOut: function onPointerOut() {
        if (this.out) {
            this.setFrame(this.out);
        }
    },
    onPointerDown: function onPointerDown() {
        if (this.down) {
            this.setFrame(this.down);
        }
    }
});

/***/ }),

/***/ 1157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectScene = undefined;

__webpack_require__(73);

var _lodash = __webpack_require__(1158);

var _set = __webpack_require__(224);

var _Utils = __webpack_require__(142);

var _tabbutton = __webpack_require__(1160);

var _stuffbuttons = __webpack_require__(1161);

var SelectScene = exports.SelectScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function SelectScene(config) {
        Phaser.Scene.call(this, {
            key: 'SelectScene'
        });

        this.bg;
        this.tabBtn = {};
        this.conf;
        this.stuffInWindow = 6;

        this.sections = [];

        /**
         * массив с позициями секций
         */
        this.sectionPos = [];
        this.camPrevPos = 0;
        this.camCurSector = 0;

        this.tabBtnActive = false;
        this.bound = 0;
    },

    init: function init(data) {
        this.atlas = data.atlas;
        this.sections = data.sections;
    },


    preload: function preload() {
        if (this.kinetic == undefined) {
            this.load.scenePlugin({
                key: 'KineticScrolling',
                url: 'dist/KineticScrolling.min.js',
                // url: 'dist/main.js',
                sceneKey: 'kinetic'
            });
        }
    },

    create: function create() {
        var _this = this;

        this.camPrevPos = 0;
        this.conf = this.game.config;
        var selectY = this.conf.height - (0, _Utils.getSize)('gui-bg', this).height;

        this.bg = this.add.image(0, 10, 'gui-bg').setOrigin(0);
        this.bg.setScrollFactor(0);
        this.createTabIcons();
        this.bound = this.createStuffIcon();

        this.cam = this.cameras.main;
        this.cam.setViewport(0, selectY - 10, this.conf.width, this.bg.height + 10);
        this.cam.setBounds(0, 0, this.bound, this.bg.height + 20).setZoom(1);

        this.game.events.on('promo', function () {
            _this.hideScene();
            _this.kinetic.stop();
            _this.scene.transition({
                target: 'PromoScene',
                duration: data.fadeDuration
            });
        });

        var config = {
            kineticMovement: true,
            timeConstantScroll: 325, //really mimic iOS
            hScroll: true, // horizontal with pointer
            vScroll: false, // vertical
            hWheel: true, //horizontal scroll mouse wheel
            vWheel: false, //vertiacal 
            deltaWheel: 20,
            onUpdate: 0 //(x, y) => {console.log('x=' + x + ', y='+ y)}
        };

        this.kinetic.start(this.cam, config);
    },

    update: function update() {

        if (this.camPrevPos == this.cam.scrollX || this.tabBtnActive) {
            return;
        }

        var dif = this.cam.scrollX - this.camPrevPos;

        if (dif > 0) {
            if (this.sectionPos[this.camCurSector + 1] != undefined && this.cam.scrollX > this.sectionPos[this.camCurSector + 1]) {
                this.camCurSector += 1;
                var name = this.sections[this.camCurSector].name;
                this.tabBtn[name].setEnable(true);
            }
        } else {
            if (this.sectionPos[this.camCurSector - 1] != undefined && this.cam.scrollX < this.sectionPos[this.camCurSector - 1]) {
                this.camCurSector -= 1;
                var _name = this.sections[this.camCurSector].name;
                this.tabBtn[_name].setEnable(true);
            }
        }

        this.camPrevPos = this.cam.scrollX;
    },
    createTabIcons: function createTabIcons() {
        var _this2 = this;

        var x = 0;
        var y = this.bg.y + 45 / 2;
        var offset = this.conf.width / (this.sections.length + 1);
        var size = (0, _Utils.getSize)('tab', this);
        for (var i = 0; i < this.sections.length; i++) {
            var name = this.sections[i].name;
            var imgDisable = new Phaser.GameObjects.Image(this, 0, 0, name + '-icon');
            var imgEnable = new Phaser.GameObjects.TileSprite(this, 0, 0, 86, 58, 'tab', i);

            x = offset * (i + 1);

            var config = {
                'scene': this,
                'name': name,
                'imgEnable': imgEnable,
                'imgDisable': imgDisable,
                'x': x,
                'y': y,
                'width': size.width / 6,
                'height': size.height,
                enable: false,
                callback: function callback(name) {

                    if (_this2.tabBtnActive == true) return;
                    var index = (0, _lodash.findIndex)(_this2.sections, { name: name });
                    _this2.tabBtnActive = true;
                    _this2.tweens.add({
                        targets: _this2.cam,
                        scrollX: _this2.sectionPos[index],
                        duration: 1000,
                        ease: 'Sine.easeInOut',
                        onComplete: function onComplete() {
                            _this2.tabBtnActive = false;
                        }
                    });
                    _this2.camCurSector = index;
                }
            };

            var btn = new _tabbutton.TabButton(config);
            btn.setBtnScroll(0);
            this.tabBtn[name] = btn;
        }

        this.tabBtn['hair'].setEnable(true);
    },
    createStuffIcon: function createStuffIcon() {
        var frames = this.atlas.getFrameNames();
        var sortArray = this.sort(frames, this.sections);

        var sizeItemBg = (0, _Utils.getSize)('item-bg', this);
        var sizeArrow = (0, _Utils.getSize)('arrow-left', this);
        // useful width используемая ширина окна для размещеия вещей 
        var uw = this.game.config.width - sizeItemBg.width * this.stuffInWindow - sizeArrow.width * 2;
        var offset = uw / (this.sections.length + 1);
        var stuffY = (this.bg.height + 45) / 2 + 10;
        var between = sizeItemBg.width + offset;
        var stuffX = sizeArrow.width + sizeItemBg.width / 2 + offset;

        for (var i = 0; i < sortArray.length; i++) {
            this.sectionPos[i] = stuffX - sizeItemBg.width / 2 - sizeArrow.width;
            var stuff = sortArray[i];
            for (var key in stuff) {
                var config = {
                    scene: this,
                    key: stuff[key],
                    x: stuffX,
                    y: stuffY,
                    width: sizeItemBg.width,
                    height: sizeItemBg.height
                };

                var btn = new _stuffbuttons.StuffButton(config);
                this.kinetic.addInteractive(btn);
                stuffX += between;
            }
        }

        var bound = stuffX + sizeArrow.width;
        return bound;
    },
    hideScene: function hideScene() {
        this.tweens.add({
            targets: this.cam,
            y: '+=400',
            //scrollX: this.bound,
            duration: data.fadeDuration,
            ease: 'Power3'
        });
    },
    sort: function sort(frames, sections) {
        var sortArray = [];

        for (var i = 0; i < sections.length; i++) {
            var name = sections[i].name;
            var items = sections[i].items;

            sortArray[i] = [];

            for (var j = 0; j < items.length; j++) {
                var item = items[j];

                for (var k = 0; k < frames.length; k++) {
                    if (!frames[k].indexOf(item)) {
                        sortArray[i].push(frames[k]);
                    };
                };
            };
        };

        return sortArray;
    }
});

/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TabButton = exports.TabButton = new Phaser.Class({

    Extends: Phaser.GameObjects.Zone,

    initialize: function TabButton(config) {

        Phaser.GameObjects.Zone.call(this, config.scene, config.x, config.y, config.width, config.height);

        this.scene = config.scene;
        this.name = config.name;
        this.x = config.x || 0;
        this.y = config.y || 0;

        if (config.imgEnable != undefined) {
            this.imgEnable = config.imgEnable;
            this.imgEnable.x = this.x;
            this.imgEnable.y = this.y - 5;
            this.scene.add.existing(this.imgEnable);
        }

        if (config.imgDisable != undefined) {
            this.imgDisable = config.imgDisable;
            this.imgDisable.x = this.x;
            this.imgDisable.y = this.y;
            this.scene.add.existing(this.imgDisable);
        }

        this._enable;
        this.setEnable(config.enable);

        this.callback = config.callback || function () {};

        this.setInteractive({ useHandCursor: true }).on('pointerup', this.onPointerUp, this);

        this.scene.input.on('tabactive', this.onTabActive, this);
    },

    onPointerUp: function onPointerUp() {
        if (this._enable == false && !this.scene.tabBtnActive) {
            this._enable = true;
            this.imgEnable.visible = true;
            this.imgDisable.visible = false;
            this.scene.input.emit('tabactive', this.name);
            this.callback(this.name);
        }
    },
    onTabActive: function onTabActive(name) {
        if (this.name != name && this._enable == true) {
            this._enable = false;
            this.imgEnable.visible = false;
            this.imgDisable.visible = true;
        }
    },
    setEnable: function setEnable(val) {
        if (val == true) {
            this._enable = true;
            this.imgEnable.visible = true;
            this.imgDisable.visible = false;
            this.scene.input.emit('tabactive', this.name);
        } else {
            this._enable = false;
            this.imgEnable.visible = false;
            this.imgDisable.visible = true;
        }
    },
    setBtnScroll: function setBtnScroll(val) {
        this.setScrollFactor(0);
        this.imgDisable.setScrollFactor(0);
        this.imgEnable.setScrollFactor(0);
    },
    getVisibleObjects: function getVisibleObjects() {

        var ar = [];
        if (this.imgDisable.visible) {
            ar.push(this.imgDisable);
        }
        if (this.imgEnable.visible) {
            ar.push(this.imgEnable);
        }

        return ar;
    }
});

/***/ }),

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var StuffButton = exports.StuffButton = new Phaser.Class({

    Extends: Phaser.GameObjects.Zone,

    initialize: function StuffButton(config) {

        Phaser.GameObjects.Zone.call(this, config.scene, config.x, config.y, config.width, config.height);

        this.name = config.key;

        this.config = config;
        this.bg;
        this.img;

        //this.setInteractive();
        this.create();
    },

    create: function create() {
        var texture = this.scene.add.renderTexture(this.x, this.y, this.width, this.height);
        texture.setOrigin(0.5);
        var img = this.scene.add.image(0, 0, 'items', this.config.key);
        img.setScale((this.height - 20) / img.height);

        if (img.displayWidth - this.width > 0) {
            img.setScale((this.width - 20) / img.width);
        }

        texture.draw('item-bg', 0, 0);
        texture.draw(img, this.width / 2, this.height / 2);

        img.destroy();
    },
    onKineticClick: function onKineticClick() {
        this.scene.game.events.emit('select-stuff', this.name);
    },
    onKineticDown: function onKineticDown(pointer) {},
    onKineticUp: function onKineticUp() {}
});

/***/ }),

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PromoScene = undefined;

__webpack_require__(73);

var _set = __webpack_require__(224);

var _Utils = __webpack_require__(142);

var PromoScene = exports.PromoScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function PromoScene(config) {
        Phaser.Scene.call(this, {
            key: 'PromoScene'
        });
        this.config;
    },

    preload: function preload() {},

    create: function create() {
        this.config = this.game.config;
        var length = data.promo.length;
        var offset = this.config.width / (length + 1);

        for (var i = 0; i < length; i++) {
            var promo = data.promo[i];
            var name = promo.file.split('.')[0];
            var link = promo.link;

            var obj = this.add.image(offset * (i + 1) + 1000, 1100, name).setInteractive();

            obj.name = link;

            obj.on('pointerdown', function () {
                //window.open(this.name, '_blank');
                location.href = this.name;
            });

            this.tweens.add({
                targets: obj,
                x: '-=1000',
                duration: data.fadeDuration,
                ease: 'Power3'
            });
        }
    }
});

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sleep = sleep;
exports.getSize = getSize;
function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) {}
}

function getSize(name, scene) {
	return {
		width: scene.game.textures.list[name].source[0].width,
		height: scene.game.textures.list[name].source[0].height
	};
}

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var path = exports.path = {
    img: 'assets/img/game/',
    gui: 'assets/img/interface/',
    json: 'assets/json/',
    audio: 'assets/audio/',
    loader: 'assets/img/loader/'
};

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(73);

var _bootscene = __webpack_require__(1151);

var _menuscene = __webpack_require__(1152);

var _mainscene = __webpack_require__(1153);

var _selectscene = __webpack_require__(1157);

var _promoscene = __webpack_require__(1162);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
				type: Phaser.AUTO,
				width: 800,
				height: 1280,
				parent: 'game',
				scene: [_bootscene.BootScene, _menuscene.MenuScene, _mainscene.MainScene, _selectscene.SelectScene, _promoscene.PromoScene],
				callbacks: {
								postBoot: function postBoot(game) {
												game.canvas.style.display = 'block';
												game.canvas.style.margin = 'auto';
								}
				}
};

var Game = function (_Phaser$Game) {
				_inherits(Game, _Phaser$Game);

				function Game(config) {
								_classCallCheck(this, Game);

								return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, config));
				}

				return Game;
}(Phaser.Game);

window.addEventListener("load", function () {
				var game = new Game(config);
});

/***/ })

/******/ });