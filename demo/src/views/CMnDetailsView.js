/**
 * Created with IntelliJ IDEA.
 * User: nkatakam
 * Date: 10/1/13
 * Time: 8:42 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "geppetto",
    "text!src/templates/TMnDetailsView.html"
],function(
    $,
    _,
    Backbone,
    Marionette,
    Geppetto,
    TMnDetailsView
    ){

    "use strict";

    return Marionette.ItemView.extend({
        template : TMnDetailsView,
        initialize : function(){
            _.bindAll(this);
        }
    });

});