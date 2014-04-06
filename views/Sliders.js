KitchenSink.Sliders = function(params) {
    var viewModel = {
        slider: {
            value: ko.observable(100)
        },
        rangeSlider: {
            minValue: ko.observable(50),
            maxValue: ko.observable(200)
        }
    };
    
    viewModel.slider.text = ko.computed(function() {
        return '' + viewModel.slider.value() + ' km';
    })
    
    viewModel.rangeSlider.text = ko.computed(function() {
        return '' + viewModel.rangeSlider.minValue() +
              '-' + viewModel.rangeSlider.maxValue() + ' €';
    })
    
    return viewModel;
};
