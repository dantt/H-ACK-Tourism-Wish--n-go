KitchenSink.Exp = function (params) {
    return {
        viewShown: function() {
            var t = (Middle.getUser().saldo || 0.0);
            document.getElementById('exp-saldo').innerHTML = 'Saldo: ' + t.toFixed(2) + ' p';
        }
    }
};