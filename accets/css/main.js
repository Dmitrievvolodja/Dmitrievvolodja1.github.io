
// -------------------------------------------------------------
// [ IM slider ]
// -------------------------------------------------------------

function showBanner_init(num) {

    // thumbs generate
    function replaceAll(str, what, to) {
        return str.split(what).join(to);
    }

    var thumbs_tpl = $('#' + banners_div).html();
    var thumbs_qty = $('#' + banners_div + ' > a').length;
    var thumbs = '';
    var current_link = '';
    var current_inlay = '';

    thumbs_tpl = thumbs_tpl.toLowerCase();
    thumbs_tpl = replaceAll(thumbs_tpl, '</a>', '</a>`');
    var thumbs_arr = thumbs_tpl.split(/[`]/);

    for (var i=0; i<thumbs_qty; i++)
    {
        current_link = RegExp('.*href=\"([^\"]+)\".*', 'i').exec(thumbs_arr[i]);
        current_inlay = i+1;
        thumbs += '<li><a href="' + current_link[1] + '">' + current_inlay + '</a></li>';
    }

    $('#' + banners_tmb).html(thumbs);

    // launcher init
    $('#' + banners_div + ' a').hide();
    $('#' + banners_div + ' a:first').css('display', 'inline');
    $('#' + banners_tmb + ' li:first').addClass('selected');
    window.banners_qty = $('#' + banners_div + ' > a').length;
    window.banners_qty -= 1;
    window.mainNavLinks = $('ul#' + banners_tmb + ' li');
}

function showBanner(obj, delay) {
    var num = mainNavLinks.index(obj, delay);
    if (num < 0) num = currentBanner == banners_qty ? 0 : currentBanner + 1;

    var delay = (typeof(delay) != 'undefined') ? delay: 10000;

    if (currentBanner == num) {
        clearInterval(rotateInterval);
        rotateInterval = setInterval("nextBanner()", delay);
        return;
    }
    $('#' + banners_div + ' a').fadeOut();
    $('#' + banners_tmb + ' li').removeClass('selected');
    currentBanner = num;

    $('#' + banners_div + ' a:eq(' + (currentBanner) + ')').fadeIn();
    $('#' + banners_tmb + ' li:eq(' + (currentBanner) + ')').addClass('selected');
    clearInterval(rotateInterval);
    rotateInterval = setInterval("nextBanner()", delay);
}

function nextBanner() {
    var nextNum = currentBanner == banners_qty ? 0 : currentBanner + 1;
    showBanner('_', 3000);
}

$(function () {
    $('ul.slide_thumbs li').mouseover(function () {
        showBanner(this);
        return false;
    }).filter(':first').mouseover();
});

$(function () {
    $('ul.slide_thumbs li').mouseout(function () {
        showBanner(this);
        return false;
    }).filter(':first').mouseout();
});

