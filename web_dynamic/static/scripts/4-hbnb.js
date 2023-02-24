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
  $('button').click(function () {
    const amenity_dict = {};
    amenity_dict.amenities = Object.keys(dict);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(amenity_dict),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(data);
        $.each(data, function (index, value) {
          const txt = '<article>\
          <div class="title_box">\
            <h2>' + value.name + '</h2>\
            <div class="price_by_night"> $' + value.price_by_night + '</div>\
          </div>\
          <div class="information">\
            <div class="max_guest">' + value.max_guest + 'Guest </div>\
                  <div class="number_rooms">' + value.number_rooms + ' Bedroom </div>\
                  <div class="number_bathrooms">' + value.number_bathrooms + 'Bathroom </div>\
          </div>\
          <div class="user">\
                  <b>Owner:</b>' + 'nil' + '\
                </div>\
                <div class="description">\
            ' + value.descritption + '\
                </div>\
        </article>';
          $('section.places').html(txt);
        });
      }
    });
  });
});
