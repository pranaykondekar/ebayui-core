const assign = require('core-js-pure/features/object/assign');

exports.Combobox_0Options = {
    autocomplete: 'list',
    options: []
}

exports.Combobox_3Options = {
    autocomplete: 'list',
    options: [{
        value: 1,
        text: 'option 1'
    }, {
        value: 2,
        text: 'option 2'
    }, {
        value: 3,
        text: 'option 3'
    }]
};

exports.Combobox_3Options_2Selected = assign({}, exports.Combobox_3Options, {
    value: exports.Combobox_3Options.options[1].text
});

exports.Combobox_3Options_Borderless = assign({}, exports.Combobox_3Options, {
    borderless: true
});