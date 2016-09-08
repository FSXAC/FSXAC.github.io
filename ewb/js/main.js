var main = function() {
  $(".searchbar").focusin(function() {
    $(this).animate({
      width: '+=90px'
    }, 200);
  });

  $(".searchbar").focusout(function() {
    $(this).animate({
      width: '-=90px'
    }, 200);
  });
}

$(document).ready(main);
