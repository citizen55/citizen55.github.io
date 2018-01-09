/**
 * Created by ss on 09.01.2018.
 */
var loadWrapp = (function (){
    var wrapp = document.createElement('div');
    wrapp.className = 'load-wrapp';

    var loading =
        "<div class='load-6'>           " +
        "<div class='letter-holder'>     " +
        "<div class='l-1 letter'>L</div> " +
        "<div class='l-2 letter'>o</div> " +
        "<div class='l-3 letter'>a</div> " +
        "<div class='l-4 letter'>d</div> " +
        "<div class='l-5 letter'>i</div> " +
        "<div class='l-6 letter'>n</div> " +
        "<div class='l-7 letter'>g</div> " +
        "<div class='l-8 letter'>.</div> " +
        "<div class='l-9 letter'>.</div> " +
        "<div class='l-10 letter'>.</div>" +
        "</div>                          " +
        "</div>                          ";

    wrapp.insertAdjacentHTML(`afterBegin`, loading);

    var content = document.getElementById('content');
    content.appendChild(wrapp);

    return wrapp;
}())


//CSSLoad('/addStyles.css'); //пример использования
