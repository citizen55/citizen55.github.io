!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=9)}([function(t,e,i){(function(t){!function(i,n){"use strict";var r={};i.PubSub=r;var s=i.define;!function(t){var e={},i=-1;function n(t){var e;for(e in t)if(t.hasOwnProperty(e))return!0;return!1}function r(t,e,i){try{t(e,i)}catch(t){setTimeout(function(t){return function(){throw t}}(t),0)}}function s(t,e,i){t(e,i)}function o(t,i,n,o){var a,u=e[i],l=o?s:r;if(e.hasOwnProperty(i))for(a in u)u.hasOwnProperty(a)&&l(u[a],t,n)}function a(t,i,r,s){var a=function(t,e,i){return function(){var n=String(t),r=n.lastIndexOf(".");for(o(t,t,e,i);-1!==r;)n=n.substr(0,r),r=n.lastIndexOf("."),o(t,n,e,i)}}(t,i,s),u=function(t){var i=String(t),r=Boolean(e.hasOwnProperty(i)&&n(e[i])),s=i.lastIndexOf(".");for(;!r&&-1!==s;)i=i.substr(0,s),s=i.lastIndexOf("."),r=Boolean(e.hasOwnProperty(i)&&n(e[i]));return r}(t);return!!u&&(!0===r?a():setTimeout(a,0),!0)}t.publish=function(e,i){return a(e,i,!1,t.immediateExceptions)},t.publishSync=function(e,i){return a(e,i,!0,t.immediateExceptions)},t.subscribe=function(t,n){if("function"!=typeof n)return!1;e.hasOwnProperty(t)||(e[t]={});var r="uid_"+String(++i);return e[t][r]=n,r},t.subscribeOnce=function(e,i){var n=t.subscribe(e,function(){t.unsubscribe(n),i.apply(this,arguments)});return t},t.clearAllSubscriptions=function(){e={}},t.clearSubscriptions=function(t){var i;for(i in e)e.hasOwnProperty(i)&&0===i.indexOf(t)&&delete e[i]},t.unsubscribe=function(i){var n,r,s,o="string"==typeof i&&(e.hasOwnProperty(i)||function(t){var i;for(i in e)if(e.hasOwnProperty(i)&&0===i.indexOf(t))return!0;return!1}(i)),a=!o&&"string"==typeof i,u="function"==typeof i,l=!1;if(!o){for(n in e)if(e.hasOwnProperty(n)){if(r=e[n],a&&r[i]){delete r[i],l=i;break}if(u)for(s in r)r.hasOwnProperty(s)&&r[s]===i&&(delete r[s],l=!0)}return l}t.clearSubscriptions(i)}}(r),"function"==typeof s&&s.amd?s(function(){return r}):(void 0!==t&&t.exports&&(e=t.exports=r),e.PubSub=r,t.exports=e=r)}("object"==typeof window&&window||this)}).call(this,i(6)(t))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(0),o=(n=s)&&n.__esModule?n:{default:n};var a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.index=e.index,this.name=e.name,this.divCard,this.divShirt,this.divFront,this._onSelect=this.onSelect.bind(this),this.isFlip=!1,this.isMatched=!1}return r(t,[{key:"create",value:function(t){this.index=t,this.divCard=document.createElement("div"),this.divCard.setAttribute("class","card"),this.divShirt=document.createElement("div"),this.divShirt.setAttribute("class","surface shirt"),this.divFront=document.createElement("div"),this.divFront.setAttribute("class","surface front"),this.divCard.addEventListener("click",this._onSelect),o.default.subscribe("endTime",this.endTime.bind(this))}},{key:"onSelect",value:function(){o.default.publish("signalFromCard",{run:"flip",index:this.index})}},{key:"signalFromManager",value:function(t,e){this[e]()}},{key:"flip",value:function(){this.isFlip=!0,this.divCard.classList.add("is-flipped"),Gl.cardTurns++,this.divCard.removeEventListener("click",this._onSelect)}},{key:"flipBack",value:function(){var t=this;this.divCard.classList.remove("is-flipped"),this.isFlip=!1,setTimeout(function(){t.divCard.addEventListener("click",t._onSelect),o.default.publish("signalFromCard",{run:"flipBack",index:t.index})},300)}},{key:"matched",value:function(){var t=this;this.isMatched=!0,setTimeout(function(){t.divCard.classList.add("is-matched")},800)}},{key:"endTime",value:function(){if(this.isFlip){if(!this.isMatched)return void this.divCard.classList.remove("is-flipped")}else this.divCard.removeEventListener("click",this._onSelect)}},{key:"destroy",value:function(){}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(0),o=(n=s)&&n.__esModule?n:{default:n};var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.divInfo=document.getElementById("info"),this.divPlace,this.idInterval,this.init()}return r(t,[{key:"init",value:function(){o.default.subscribe("win",this.win.bind(this)),this.divInfo.innerText="2:00",this.start(120)}},{key:"start",value:function(t){var e=this,i=t,n=void 0,r=void 0,s="";this.idInterval=setInterval(function(){n=parseInt(i/60,10),r=parseInt(i%60,10),s=n+":"+(r=r<10?"0"+r:r),e.divInfo.innerText=s,--i<20&&e.divInfo.classList.add("warning"),i<10&&e.divInfo.classList.add("blink"),i<0&&(clearInterval(e.idInterval),e.divInfo.classList.remove("blink"),setTimeout(function(){o.default.publish("endTime",{})},1e3))},1e3)}},{key:"win",value:function(){clearInterval(this.idInterval),this.divInfo.classList.remove("blink"),this.divInfo.classList.remove("warning")}},{key:"destroy",value:function(){clearInterval(this.idInterval),this.divInfo=null,this.divPlace=null,this.idInterval=null}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(0),o=(n=s)&&n.__esModule?n:{default:n};var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.words=[],this.url=[],this.getData()}return r(t,[{key:"getData",value:function(){var t=this,e=new("onload"in new XMLHttpRequest?XMLHttpRequest:XDomainRequest);e.open("GET","./lesson/words.txt",!0),e.responseType="text",e.send(),e.onreadystatechange=function(){if(4==e.readyState)if(200==e.status){var i=e.responseText;t.parseWords(i)}else consolo.log("ошибка: "+(e.status?e.statusText:"запрос не удался"))}}},{key:"parseWords",value:function(t){for(var e=t.split(/\r?\n|\r/),i=0;i<e.length;i++){var n=e[i].split(":");""!==n&&""!==n[0]&&(this.words[i]=n.shift().trim(),this.url[i]=n.shift().trim())}0!=this.words.length&&o.default.publish("isReady",{words:this.words,imgUrl:this.url})}}]),t}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Global=function(){return{cardTurns:0,mobile:!1}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(1),o=(n=s)&&n.__esModule?n:{default:n};var a=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.url=t.url,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),r(e,[{key:"create",value:function(t){(function t(e,i,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,i,n)}if("value"in r)return r.value;var o=r.get;return void 0!==o?o.call(n):void 0})(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"create",this).call(this,t);var i=document.createElement("img");i.setAttribute("src","lesson/images/"+this.url),Gl.mobile?i.setAttribute("width","75px"):i.setAttribute("width","100px"),i.setAttribute("class","img"),this.divFront.appendChild(i),this.divCard.appendChild(this.divShirt),this.divCard.appendChild(this.divFront)}}]),e}();e.default=a},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(1),o=(n=s)&&n.__esModule?n:{default:n};var a=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.word=t.word,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),r(e,[{key:"create",value:function(t){(function t(e,i,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,i,n)}if("value"in r)return r.value;var o=r.get;return void 0!==o?o.call(n):void 0})(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"create",this).call(this,t);var i=document.createElement("div");i.setAttribute("class","center"),this.divFront.appendChild(i);var n=document.createElement("p");n.setAttribute("class","word"),n.innerText=this.word,i.appendChild(n),this.divCard.appendChild(this.divShirt),this.divCard.appendChild(this.divFront)}}]),e}();e.default=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=a(i(7)),s=a(i(0)),o=a(i(5));function a(t){return t&&t.__esModule?t:{default:t}}var u=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.words=e,this.imgUrl=i,this.desk=document.getElementById("desk"),this.info=document.getElementById("info"),this.cards=[],this.firstCardIsFlipped=-1,this.secondCardIsFlipped=-1,this.numWords=this.words.length,this.allowAction=!0,this.idTimeout,this.init()}return n(t,[{key:"init",value:function(){this.initCards(),this.shuffleCards(),this.createViewCards(),s.default.subscribe("signalFromCard",this.signalFromCard.bind(this)),s.default.subscribe("endTime",this.endTime.bind(this))}},{key:"initCards",value:function(){for(var t=this.words.length,e=0;e<t;e++)this.cards[2*e]=new r.default({index:e,word:this.words[e],name:this.words[e]}),this.cards[2*e+1]=new o.default({index:e+1,url:this.imgUrl[e],name:this.words[e]})}},{key:"shuffleCards",value:function(){this.cards.sort(function(){return.5-Math.random()})}},{key:"createViewCards",value:function(){for(var t=0;t<this.cards.length;t++)this.cards[t].create(t),this.desk.appendChild(this.cards[t].divCard)}},{key:"signalFromCard",value:function(t,e){this.allowAction&&this[e.run](e.index)}},{key:"flip",value:function(t){var e=this;if(-1==this.firstCardIsFlipped)this.firstCardIsFlipped=t,this.cards[t].flip();else if(-1==this.secondCardIsFlipped&&this.firstCardIsFlipped!=t)if(this.secondCardIsFlipped=t,this.cards[t].flip(),this.allowAction=!1,this.checkStatus()){if(this.numWords--,Gl.cardTurns=0,this.cards[this.firstCardIsFlipped].matched(),this.cards[this.secondCardIsFlipped].matched(),this.firstCardIsFlipped=-1,this.secondCardIsFlipped=-1,0==this.numWords)return void this.win();setTimeout(function(){e.allowAction=!0},500)}else this.idTimeout=setTimeout(function(){e.cards[e.secondCardIsFlipped].flipBack(),e.cards[e.firstCardIsFlipped].flipBack(),e.allowAction=!0},1300)}},{key:"flipBack",value:function(){Gl.cardTurns--,0==Gl.cardTurns&&(this.firstCardIsFlipped=-1,this.secondCardIsFlipped=-1)}},{key:"checkStatus",value:function(){return this.cards[this.secondCardIsFlipped].name==this.cards[this.firstCardIsFlipped].name}},{key:"win",value:function(){var t=this;s.default.publish("win",{}),setTimeout(function(){t.info.classList.add("alert-success"),t.info.innerText="Well done! Congratulations!"},1500)}},{key:"endTime",value:function(){this.allowAction=!1,clearTimeout(this.idTimeout),this.desk.classList.add("end-time"),this.info.classList.add("alert-danger"),this.info.innerText="it's a failure"}},{key:"destroy",value:function(){for(var t=0;t<this.cards.length;t++)this.desk.removeChild(this.cards[t].divCard);clearTimeout(this.idTimeout),this.info.classList.remove("alert-danger"),this.desk.classList.remove("end-time"),this.info.classList.remove("alert-success"),this.words=null,this.imgUrl=null,this.desk=null,this.info=null,this.cards=null}}]),t}();e.default=u},function(t,e,i){"use strict";var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=l(i(8)),s=i(4),o=l(i(3)),a=l(i(0)),u=l(i(2));function l(t){return t&&t.__esModule?t:{default:t}}new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.btnStart,this.overlay,this.data,this.CM={},this.Timer={},this.init()}return n(t,[{key:"init",value:function(){var t=this;a.default.subscribe("isReady",this.run.bind(this)),document.addEventListener("DOMContentLoaded",function(){(window.Gl=(0,s.Global)(),window.innerWidth<576)&&(Gl.mobile=!0,document.getElementsByTagName("html")[0].classList.add("mobile"));t.prepare()})}},{key:"prepare",value:function(){new o.default;a.default.subscribe("endGame",this.endGame.bind(this)),a.default.subscribe("endTime",this.endGame.bind(this)),a.default.subscribe("win",this.win.bind(this)),this.overlay=document.getElementsByClassName("overlay")[0]}},{key:"run",value:function(t,e){this.data=e,this.btnStart=document.createElement("a"),this.btnStart.setAttribute("href","#"),this.btnStart.innerText="Start";var i=document.createElement("div");i.classList.add("overlay-content"),this.overlay.appendChild(i),i.appendChild(this.btnStart),this.btnStart.addEventListener("click",this.start.bind(this))}},{key:"endTime",value:function(){console.log("main.js endTime")}},{key:"endGame",value:function(){var t=this;setTimeout(function(){t.destroy()},1500)}},{key:"win",value:function(){var t=this;setTimeout(function(){t.destroy()},3500)}},{key:"destroy",value:function(){this.CM.destroy(),this.timer.destroy(),this.CM=null,this.timer=null,this.btnStart.innerText="Repeat",this.overlay.classList.remove("close")}},{key:"start",value:function(){this.CM=new r.default(this.data.words,this.data.imgUrl),this.timer=new u.default,this.overlay.classList.add("close")}},{key:"openOverlay",value:function(){this.overlay.classList.remove("close")}}]),t}())}]);