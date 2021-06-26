console.log("Initialized. \n Lang=it");

var it = true;

const clickLang = function () {
  if (!$(this).hasClass("active-l")) {
    $(".it").toggleClass("active-l");
    $(".en").toggleClass("active-l");
    it = !it;
  }
};

$(".it").click(clickLang);
$(".en").click(clickLang);

var btn = $("#button");

$(window).scroll(function () {
  if ($(window).scrollTop() > 800) {
    btn.addClass("show");
    video.pause();
  } else {
    if ($(window).scrollTop() < 3 && $(window).scrollTop() > -1) {
      btn.removeClass("show");
      video.play();
    }
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
