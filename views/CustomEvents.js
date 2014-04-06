KitchenSink.CustomEvents = function () {
    var isDragging = false;
    var startPoint;
    var prevY = 0;
    var image_index = 1;
    
    
    
    
      
      var hotels;
      var globalHotelId;
      loadPanelVisible = ko.observable(false);
	loadPanelVisible(true);
	Middle.getProvidersByDistance(45.564, 12.428, function(partners) {
	  hotels = partners;
	  loadPanelVisible(false);
	  father = $("#cont");
	  var hotel = hotels.shift();
	  console.log(hotel);
	  globalHotelId = hotel.Id;
	  //new_div =$("<div id='hotel" + hotel.Id + "' style='background-image: url(\"http://h-ack-wd.azurewebsites.net" + hotel.Photos[0].Url + "\"); width:100%; background-size: auto 100%; background-repeat: no-repeat; background-position: center top; height: 400px;max-height:400px;'></div>");
	  //new_div.hide();
	  new_div = $('<img src="http://h-ack-wd.azurewebsites.net' + hotel.Photos[0].Url + '" width="100%" height="auto" />');
	  father.html(new_div);
	  $('#Nome').html(hotel.Name);
	  $('#Indirizzo').html(hotel.Address + ' - ' + hotel.Location);
	  $('#img_info').attr('onclick', 'KitchenSink.app.navigate({view: \'details\', id: \''+ hotel.Id +'\'})');
	  
	});
	
	
	function appendimage() {
	  father = $("#cont");
	  var hotel = hotels.shift();
	  console.log(hotel);
	  globalHotelId = hotel.Id;
	  //new_div =$("<div id='hotel" + hotel.Id + "' style='background-image: url(\"http://h-ack-wd.azurewebsites.net" + hotel.Photos[0].Url + "\"); width:100%; background-size: auto 100%; background-repeat: no-repeat; background-position: center top; height: 400px;max-height:400px;'></div>");
	  //new_div.hide();
	  new_div = $('<img src="http://h-ack-wd.azurewebsites.net' + hotel.Photos[0].Url + '" width="100%" height="auto" />');
	  father.html(new_div);
	  $('#Nome').html(hotel.Name);
	  $('#Indirizzo').html(hotel.Address + ' - ' + hotel.Location);
	  $('#img_info').attr('onclick', 'KitchenSink.app.navigate({view: \'details\', id: \''+ hotel.Id +'\'})');
	};
	
      
      
      
   
    var pointerEvents = [
            { name: "dxpointerdown", displayName: "down" },
            { name: "dxpointermove", displayName: "move" },
            { name: "dxpointerup", displayName: "up" },
            { name: "dxhold", displayName: "hold" }
        ],
        swipeEvents = [
            { name: "dxswipestart", displayName: "start" },
            { name: "dxswipe", displayName: "swipe" },
            { name: "dxswipeend", displayName: "end" }
        ];

    var extendEvents = function(events) {
        return $.map(events, function(event, index) {
            event.count = ko.observable(0);
            event.enabled = ko.observable(true);
            event.badgeVisible = ko.computed(function() {
                return event.count() > 0;
            });
            return event;
        });
    };

    var getAllEvents = function() {
        return pointerEvents.concat(swipeEvents);
    };

    var viewModel = {
        swipeEvents: extendEvents(swipeEvents),
        pointerEvents: extendEvents(pointerEvents)
    };
  
    function create_events(element){
      element.on("dxpointerdown",function(e){
	isDragging = true;
	startPoint = e.pageX;
      });
      element.on("dxpointermove",function(e){
	if(isDragging == true){
	  if(e.pageX > startPoint){
	    $("#hotel"+image_index).animate({left: "+=5000"}, 2000);
	  }
	  if(e.pageX < startPoint){
	    $("#hotel"+image_index).animate({left: "+=5000"}, 2000);
	  }
	}
      });
      element.on("dxpointerup",function(e){
	if (isDragging == true){
	  isDragging = false;
	  createImage();
	}
      });
    };
    
    
    
    
    var sourceSwap = function () {
      var $this = $(this);
      var newSource = $this.data('alt-src');
      $this.data('alt-src', $this.attr('src'));
      $this.attr('src', newSource);
    }
    function image_events(){
      $('#img_cross').on("dxpointerdown", function(e){
	$('#hotel'+image_index).animate({left: "+=5000"}, 2000);
	isDragging = true;
	$('#hotel'+image_index).trigger("dxpointerup");
      });
      
      $('#img_cross').hover(sourceSwap,sourceSwap);
      $('#img_like').hover(sourceSwap,sourceSwap);
      $('#img_like').on("dxpointerdown", function(e){
	appendimage();
      });
    };
    
    viewModel.viewShown = function() {
      $('#img_like').on("dxpointerdown", function(e){
	Middle.addPreference(globalHotelId);
	//alert(globalHotelId);
	appendimage();
      });
      $('#img_cross').on("dxpointerdown", function(e){
	appendimage();
      });
    };
    
    return viewModel;
};