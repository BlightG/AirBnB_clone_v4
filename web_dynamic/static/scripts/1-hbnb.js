$(function () {
  const dict = {};
  $('input').click(function () {
    const dataid = $(this).attr('data-id');
    const dataname = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      dict[dataid] = dataname;
      $('.amenities h4').text(Object.values(dict));
    } else {
      if (dataid in dict) {
        delete dict[dataid];
      }
    }
    if (Object.keys(dict).length == 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
