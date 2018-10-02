var text;
var phraseText;
var finishText = null;
var winPhrase = ['Excellent job!'];
var failPhrase = ['It’s a fail'];
var startPhrase = ['start'];
var finishPhrase = ['finish'];
var repeatPhrase = ['repeat'];
var words = [];
var clues = [];
var pClue;
var word;
var letter;
var letters = []; // Stored letters
var lives;
var counter; // Count correct letters
var space; // Number of spaces in word '-'
var correct;
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext('2d');
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', '\''
];
/* разрешение выбора букв*/
var allow = false;

/*количество слов*/
var successWords = 0;

var totalTime = "2:00";

console.log(window.innerWidth);
console.log(window.innerHeight);

var canvasWidth = window.innerWidth <= 300? window.innerWidth - 40 : 300;
var canvasHeight = window.innerWidth <= 520? window.innerHeight/4 : 150;
myStickman.setAttribute("width", canvasWidth);
myStickman.setAttribute("height", canvasHeight);

var style = "margin-top: " + (window.innerHeight >=600? window.innerHeight/8 : 0) + "px";
var divTop = document.getElementById("top");
divTop.setAttribute("style", style);

drawArray = ['leg', 'arm', 'body', 'head', 'frame4', 'frame3', 'frame2'];

/* Open overlay when page loads */
document.getElementById("myNav").style.width = "100%";

/**
 * switch to single player mode (timed or untimed)
 */
var screenSaverLink = document.getElementById('single-player-timed');
var screenSaver = document.getElementById('overlay-content');

var handlerStart = function(event){
    event.preventDefault();
    closeNav();
}

screenSaverLink.addEventListener('click', handlerStart);



/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

var openNav = function () {
    document.getElementById("myNav").style.width = "100%";
}

// Get elements
//var resultInfo = document.getElementById("result-info");
var clue = document.getElementById("clue");
pClue = document.createElement('p');
clue.appendChild(pClue);

var getData = function(){

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var xhr = new XHR();
    xhr.open('GET', 'lesson/words.txt', true);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            // обработать ошибку
            consolo.log( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
            return;
        }
        text = this.responseText;
        startPlay();
    }

    var xhr_phrase = new XHR();
    xhr_phrase.open('GET', 'lesson/phrase.txt', true);
    xhr_phrase.responseType = 'text';
    xhr_phrase.send();

    xhr_phrase.onreadystatechange = function (ev) {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            // обработать ошибку
            consolo.log( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
            return;
        }
        phraseText = this.responseText;
        parsePhrase();
    }
}

var parseWords = function (data) {
    var rows = data.split(/\r?\n|\r/);

    for (var str = 0; str < rows.length; str++){
        var res = rows[str].split(':');
        if(res !== '' && res[0] !== ''){
            words[str] = res.shift().trim();
            clues[str] = res.shift().trim();
        }
    }

    successWords = words.length;
}

var parsePhrase = function () {
    var rows = phraseText.split(/\r?\n|\r/);

    for (var str = 0; str < rows.length; str++){
        var res = rows[str].split(':');
        if(res !== '' && res[0] !== ''){
            switch (res[0].trim().toLowerCase()){
                case 'win':
                    winPhrase.push(res[1].trim());
                    break;
                case 'fail':
                    failPhrase.push(res[1].trim());
                    break;
                case 'start':
                    startPhrase.push(res[1].trim());
                    break;
                case 'finish':
                    finishPhrase.push(res[1].trim());
                    break;
                case 'repeat':
                    repeatPhrase.push(res[1].trim());
                    break;
                default:
                    break;
            }
        }
    }
}

getData();

var startPlay = function () {
    parseWords(text);
    play();
}

// create alphabet ul
var createBtnLetter = function() {
    myButtons = document.getElementById('buttons');
    keyBoard = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
        keyBoard.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(keyBoard);
        keyBoard.appendChild(list);
    }
}

// Create letters ul
var createHiddenWord = function() {

    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
        correct.setAttribute('class', 'my-word');
        letter = document.createElement('li');
        letter.setAttribute('class', 'letter');
        if (word[i] === "-") {
            letter.innerHTML = "-";
            space = 1;
        } else {
            letter.innerHTML = "_";
        }

        letters.push(letter);
        wordHolder.appendChild(correct);
        correct.appendChild(letter);
    }
}

var createClue = function(){
    pClue.setAttribute("id", "blink1");

    pClue.innerHTML = "Clue: " + clues.shift();
    setTimeout(function () {
       pClue.setAttribute("id", "");
    }, 2000);
}

// Show lives
showInfo = function() {
    //resultInfo.innerHTML = "A ";
    if (lives < 1) {
        showFail();
    }
    for (var i = 0; i < letters.length; i++) {
        if (counter + space === letters.length) {
            showWin()
        }
    }
}

var showFail = function () {
    if(allow){
        allow = false;
        var length = failPhrase.length;
        if(length == 1){
            pClue.innerHTML = failPhrase[0];
        }else if(length > 1){
            var num = getRandom(0, length - 1);
            pClue.innerHTML = failPhrase[num];
        }
        pClue.setAttribute("class", "alert-danger");

        for (var i = 0; i < word.length; i++) {
            letters[i].innerHTML = word[i];
        }

        correct.setAttribute('id', 'blink1');

        setTimeout(function() {
            pClue.setAttribute("class", "");
            reset();
        }, 4000);
    }
}

var showWin = function(){

    if(allow){
        allow = false;
        successWords--;
        var length = winPhrase.length;
        if(length == 1){
            pClue.innerHTML = winPhrase[0];
        }else if(length > 1){
            var num = getRandom(0, length - 1);
            pClue.innerHTML = winPhrase[num];
        }
        pClue.setAttribute("class", "alert-success");

        for (var i = 0; i < word.length; i++) {
            letters[i].innerHTML = word[i];
        }

        correct.setAttribute('id', 'blink1');

        setTimeout(function() {
            pClue.setAttribute("class", "");
            reset();
        }, 4000);
    }
}

// Animate man
var animate = function() {
    var drawMe = drawArray[lives];
    drawer[drawMe]();
}

var drawer = {};

// Hangman
drawer.canvas = function() {
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 3;
};

drawer.head = function() {
    context.beginPath();
    context.arc(150, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
}

drawer.draw = function(fromX, fromY, toX, toY) {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
}

drawer.frame1 = function() {
    this.draw(0, canvasHeight, canvasHeight, canvasHeight);
};

drawer.frame2 = function() {
    this.draw(80, 10, 80, canvasHeight - 10);
};

drawer.frame3 = function() {
    this.draw(75, 15, 145, 15);
};

drawer.frame4 = function() {
    this.draw(140, 15, 140, 35);
};

drawer.body = function() {
    this.draw(147, 38, 145, 80);
};

drawer.arm = function () {
    this.draw(147, 46, 167, 70);
    this.draw(147, 46, 127, 70);
};

drawer.leg = function () {
    this.draw(145, 80, 155, canvasHeight - 20);
    this.draw(145, 80, 135, canvasHeight - 20);
}


// OnClick Function
check = function() {
    list.onclick = function() {
        if(allow){
            var letter = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    letters[i].innerHTML = letter;
                    counter += 1;
                }
            }
            var j = (word.indexOf(letter));
            if (j === -1) {
                lives -= 1;
                showInfo();
                animate();
            } else {
                showInfo();
            }
        }
    }
}

// Play
play = function() {
    if(words.length){
        word = words.shift();
        if(word instanceof String){
            word = word.replace(/\s/g, "-");
        }
        letters = []; //&
        lives = 7;
        counter = 0;
        space = 0;
        createHiddenWord();
        showInfo();
        drawer.canvas();
        createClue();
        createBtnLetter();
        allow = true;

    }else{
        finish();
    }
}

var handlerRepeat = function(){
    startPlay();
    closeNav();
}

var finish = function(){
    screenSaverLink.removeEventListener("click", handlerStart );
    screenSaverLink.innerHTML = "<i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i>" + " Repeat";

    if(finishText instanceof Object){
        finishText.innerHTML = '';
    }else{
        finishText = document.createElement('p');
        finishText.setAttribute("class", "info-time");
        screenSaver.appendChild(finishText);
    }
    //var infoTime = document.createElement('p');

    var length = finishPhrase.length;
    if(length == 1){
        if(successWords == 0){
            finishText.innerHTML = finishPhrase[0];
        }else{
            finishText.innerHTML = finishPhrase[0];
        }
    }else if(length > 1){
        if(successWords == 0){
            var num = getRandom(0, length - 1);
            finishText.innerHTML = finishPhrase[num];
        }else {
            var num = getRandom(0, length - 1);
            finishText.innerHTML = finishPhrase[num];
        }
    }
    //infoTime.innerHTML = ;

    screenSaverLink.addEventListener("click", handlerRepeat)
    openNav();
}



/**
 * Resets the game
 */
var reset = function () {
    keyBoard.parentNode.removeChild(keyBoard);
    correct.parentNode.removeChild(correct);
    pClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
}

var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



