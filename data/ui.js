define([
    './ui/main',
    'config'
], function(Ui, config) {
    'use strict';
    var ui = new Ui(config.ui);
    window.ui = ui;
    return Ui;
});