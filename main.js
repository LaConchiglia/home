console.log('Initialized. \n Lang=it');

const clickLang = function (lang) {
    if( !$(this).hasClass("active-l") ){
        $(".it").toggleClass("active-l");
        $(".en").toggleClass("active-l");
        console.log('lang=' + lang);
    }
}

$(".it").click( clickLang("it") );
$(".en").click( clickLang("en") );