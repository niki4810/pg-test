/**
 * Created with IntelliJ IDEA.
 * User: nkatakam
 * Date: 10/1/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */
"use strict";
require.config({
	// baseUrl:"./js",	
    paths : {
        "jquery" : "lib/jquery",
        "jqueryui" : "lib/jquery-ui",
        "underscore" : "lib/underscore",
        "backbone" : "lib/backbone",
        "marionette":'lib/backbone-marionette',
        "backbone.wreqr":'lib/backbone-wreqr',
        "backbone.babysitter":'lib/backbone-babysitter',
        "geppetto" : "lib/backbone-geppetto",
        "text" : "lib/text",
        "handlebars" : "lib/handlebars",
        "datatables" : "lib/datatables/jquery.dataTables"
    },
   // urlArgs: "bust=" + (new Date()).getTime(),
    shim : {
        "jquery" : {
            exports : "$"
        },
        "jqueryui" : {
            deps : ["jquery"]
        },
        "underscore" : {
            exports : "_"
        },
        "backbone" : {
            deps : ["underscore", "jquery"],
            exports : "Backbone"
        },     
        "lib/backbone-modelbinder" :{
            deps : ["backbone"]
        },
        "lib/jquery.mockjson" : {
        	deps : ["jquery"]
        },
        "lib/jquery.hammer" : {
        	deps : ["jquery"]
        }
		
    }

});

define([
    "jquery",
    "jqueryui",
    "underscore",
    "backbone",
    "marionette",
    "geppetto",
    "src/app/CMnApp",
    "lib/backbone-modelbinder",
    "handlebars",
    "lib/jquery.hammer",    
    "datatables",
    "lib/jquery.mockjson"
], function(
    $,
    jqueryUI,
    _,
    Backbone,
    Marionette,
    Geppetto,
    CMnApp) {	


	$(function() {
	
		Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
			return Handlebars.compile(rawTemplate);
		};

		$.noConflict(true);
		_.noConflict();
		Backbone.noConflict();

		return CMnApp.start();
	});
});
