console.log('Initialized. \n Lang=it');

const clickLang = function () {
    if( !$(this).hasClass("active-l") ){
        $(".it").toggleClass("active-l");
        $(".en").toggleClass("active-l");
    }
}

$(".it").click( clickLang );
$(".en").click( clickLang );

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
