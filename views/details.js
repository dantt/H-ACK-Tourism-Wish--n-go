KitchenSink.details = function (req) {
  
  if (req.id === undefined) req.id = 1;
  var hotels;
  var globalHotelId;
  loadPanelVisible = ko.observable(false);
  loadPanelVisible(true);
  Middle.getProvidersByDistance(45.564, 12.428, function(hotels) {
    var hotel = '';
    for (i=0; i<hotels.length; i++) {
      if (hotels[i].Id == req.id) {
	hotel = hotels[i];
	break;
      }
    }
    loadPanelVisible(false);
    
    console.log(hotel);
    
    for (i in hotel.Photos) {
      var si = hotel.Photos[i];
      $('.swiper-wrapper').append('<div class="swiper-slide"><img src="http://h-ack-wd.azurewebsites.net' + si.Url + '" style="width:100%;" /></div>');
    }
    var mySwiper = $('.swiper-container').swiper({
      //Your options here:
      mode:'horizontal',
      loop: true
    });
    $('#Nome').html(hotel.Name);
    $('#Indirizzo').html(hotel.Address + ' - ' + hotel.Zip + ' ' + hotel.Location);
    
    $('#dtlbtn').attr('onclick', 'KitchenSink.app.navigate(\'EndBooking\');');
    
    
  });
  
  
  var viewModel = {};
  
  
  
  viewModel.viewShown = function() {
    
    
  };
  
  return viewModel;
};