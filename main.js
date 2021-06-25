console.log('Initialized. \n Lang=it');

const clickLang = function () {
    if( !$(this).hasClass("active-l") ){
        $(".it").toggleClass("active-l");
        $(".en").toggleClass("active-l");
    }
}

$(".it").click( clickLang );
$(".en").click( clickLang );