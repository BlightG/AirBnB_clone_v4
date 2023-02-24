$(function () {
  const dict = {};
  $('input').click(function () {
    const dataid = $(this).attr('data-id');
    const dataname = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      dict[dataid] = dataname;
      $('.amenities h4').text(Object.values(dict)).join(', ');
    } else {
      if (dataid in dict) {
        delete dict[dataid];
      }
    }
    if (Object.keys(dict).length == 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status', function (data) {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
