KitchenSink.CustomEvents = function (params) {
    var isDragging = false;
    var current_x;
    var prevY = 0;
   
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
    };
    
    return viewModel;
};