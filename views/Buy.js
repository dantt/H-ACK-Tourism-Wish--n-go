﻿KitchenSink.Buy = function(params) {
    var viewModel = {};
    
    var s = (Middle.getUser().saldo || 0.0);
    viewModel.saldo = ko.observable('' + s.toFixed(2) + ' p');
    
    viewModel.viewShown = function() {
        var s = (Middle.getUser().saldo || 0.0);
        viewModel.saldo('' + s.toFixed(2) + ' p');
    }

    
    viewModel.addFondi = function(n) {
        var s = (Middle.getUser().saldo || 0.0);
        var u = {
            saldo: s + n
        }
        Middle.setUser(u);
        viewModel.saldo('' + (s+n).toFixed(2) + ' p');
    }

    return viewModel;
};
