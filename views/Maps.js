KitchenSink.Maps = function (params) {
    var basicOptions = {
        location: "45.5645927, 12.4280507",
        width: "100%",
        height: "100%",
        zoom: 8,
        markers: [{location: [45.5645927, 12.4280507], tooltip: "Posizione attuale"}],
        readyAction: function (obj) {
            Middle.getProvidersByDistance(45.5645927, 12.4280507, function(arr) {
                var mrk = arr.map(function(o) {
                    return {
                        location: [o.Lat, o.Lng],
                        tooltip: o.Name + ' (' + Math.floor(o.Distance) + 'km)'
                    };
                });
                mrk.push(obj.component.option('markers')[0]);
                obj.component.option('markers', mrk);
                obj.component.option('zoom', 8);
                obj.component.option('location', "45.5645927, 12.4280507");
            });
        }
    };

    var viewModel = {
        mapGoogle: $.extend({}, basicOptions, {
            provider: "google",
            mapType: "satellite"
        })
    };

    return viewModel;
};