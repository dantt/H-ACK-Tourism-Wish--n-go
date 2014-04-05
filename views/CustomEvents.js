KitchenSink.CustomEvents = function (params) {
    var isDragging = false;
<<<<<<< HEAD
    var startPoint;
    var prevY = 0;
    var image_index = 1;
=======
    var current_x;
    var prevY = 0;
>>>>>>> 6998262d476d88c954939ee6a4ffadb6d9043799
   
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
  
<<<<<<< HEAD
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
	  new_div =$("<div id='hotel" + image_index + "' class='events-area' style='position: absolute; background-image: url(\"" + image_name + "\"); width:600px; height: 400px; background-size:100%; margin: 0 auto;'></div>");
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
=======
    viewModel.viewShown = function() {
        var eventsName = "";
        $.each(getAllEvents(), function(index, event) { eventsName += event.name + " "; });
        $("#hotel1").on(eventsName, function(e) {
            $.each(getAllEvents(), function(index, item) {
                if(item.enabled() && item.name === e.type) {
		    if(e.type == "dxpointerdown"){
		      //current_x = e.pageX;
		      //$("#hotel1").css("margin-left", 0);
		      isDragging = true;
		    }
		    if(e.type == "dxpointerup"){
		      isDragging = false;
		    }
		    if(e.type == "dxpointermove" && isDragging==true){
		      $("#hotel1").animate({left: "+=5000"}, 2000);
		      /*
		      xdif = e.pageX - current_x;
		      current_x = e.pageX;
		      prop = $("#hotel1").css("margin-left");
		      cur_margin = prop.substring(0, prop.length - 2);
		      $("#hotel1").css("margin-left", (cur_margin + xdif) + "px" );*/
		    }
		    //console.log(e.type + isDragging);
                    //item.count(item.count() + 1);
                }
            });
        });
	/*
	$(".events-area").on(eventsName, function(e) {
            $.each(getAllEvents(), function(index, item) {
                if(item.enabled() && item.name === e.type) {
                    item.count(item.count() + 1);
                }
            });
        });
        */
>>>>>>> 6998262d476d88c954939ee6a4ffadb6d9043799
    };
    
    return viewModel;
};