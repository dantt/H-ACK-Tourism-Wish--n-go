﻿KitchenSink.CustomEvents = function (params) {
    var isDragging = false;
    var startPoint;
    var prevY = 0;
    var image_index = 1;
   
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
	    $("#hotel"+image_index).animate({left: "-=5000"}, 2000);
	  }
	}
      });
      element.on("dxpointerup",function(e){
	if (isDragging == true){
	  isDragging = false;
	  father = $("#cont");
	  image_index++;
	  image_name = "hotel" + image_index + ".jpg";
	  new_div =$("<div id='hotel" + image_index + "' style='position: absolute; background-image: url(\"" + image_name + "\"); width:100%; background-size: auto 100%; background-repeat: no-repeat; background-position: left top; height: 100%;max-height:400px;'></div>");
	  new_div.hide();
	  father.append(new_div);
	  new_div.fadeIn("slow");
	  create_events($('#hotel'+image_index));
	  
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
	$('#hotel'+image_index).animate({left: "-=5000"}, 2000);
	isDragging = true;
	$('#hotel'+image_index).trigger("dxpointerup");
      });
      
      $('#img_cross').hover(sourceSwap,sourceSwap);
      $('#img_like').hover(sourceSwap,sourceSwap);
      $('#img_like').on("dxpointerdown", function(e){
	$('#hotel'+image_index).animate({left: "+=5000"}, 2000);
	isDragging = true;
	$('#hotel'+image_index).trigger("dxpointerup");
      });
    };
    
    viewModel.viewShown = function() {
      create_events($('#hotel'+image_index));
      image_events();
    };
    
    return viewModel;
};