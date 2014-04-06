KitchenSink.BuyExp = function(params) {
    var viewModel = {};
    
    var s = (Middle.getUser().saldo || 0.0);
    viewModel.saldo = ko.observable('' + s.toFixed(2) + ' p');
    
    viewModel.viewShown = function() {
        var s = (Middle.getUser().saldo || 0.0);
        viewModel.saldo('' + s.toFixed(2) + ' p');
    }
    
    viewModel.subFondi = function(n) {
        var s = (Middle.getUser().saldo || 0.0);
        
        if ((s-n) < 0) {
            var myDialog = DevExpress.ui.dialog.custom({
                title: "Punti insufficienti",
                message: "Non hai a disposizione abbastanza punti per questa attività.",
                buttons: [{
                    text: "Compra più punti",
                    clickAction: function() {
                        KitchenSink.app.navigate('Buy');
                    }},
                    {text: "OK"}]
            });
            myDialog.show();
            
        } else {
            var u = {
                saldo: s - n
            }
            Middle.setUser(u);
            viewModel.saldo('' + (s-n).toFixed(2) + ' p');
        }
    }

    return viewModel;
};
