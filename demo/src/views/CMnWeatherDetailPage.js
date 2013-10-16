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
    "geppetto"
],function(
    $,
    _,
    Backbone,
    Marionette,
    Geppetto
    ){

    "use strict";

	var detailViewTemplate = '<div>'+
	'<div class="panel panel-default">'+	
	'<div class="panel-body">'+
		'Description: <label name="description"></label><br/>'+
		'Temperature : <label name="temp"></label><br/>'+
		'Low: <label name="tempMin"></label><br/>'+
		'High: <label name="tempMax"></label><br/>'+
		'Sunrise: <label name="sunRise"></label><br/>'+
		'Sunset: <label name="sunSet"></label><br/>'
	'</div>'+
'</div>'+
'</div>';
    return Marionette.ItemView.extend({
        template : detailViewTemplate,
        _modelBinder: undefined,
        initialize : function(){
            _.bindAll(this);
            this.context = this.options.context;            
            this._modelBinder = new Backbone.ModelBinder();
            this.context.listen(this,"onWeatherDataLoaded",this.onWeatherDataLoaded); 
        },
        close: function () {
           //when view closes, unbind Model bindings
           this._modelBinder.unbind();
        },
        onRender : function(){
        	var bindings = {
        		"description": '[name = "description"]',
        		"temp": '[name = "temp"]',
        		"tempMin": '[name = "tempMin"]',
        		"tempMax": '[name = "tempMax"]',
        		"sunRise": '[name = "sunRise"]',
        		"sunSet": '[name = "sunSet"]',
        	};
        	 this._modelBinder.bind(this.model/*the model to bind*/, this.el/*root element*/, bindings /*bindings*/ );
        	this.context.dispatch("loadWeatherData");        	
       },
       
		onWeatherDataLoaded : function(data) {
			this.model.set({
				"description" : data.description,
				"temp" : data.temp,
				"tempMin" : data.tempMin,
				"tempMax" : data.tempMax,
				"sunRise" : data.sunRise,
				"sunSet" : data.sunSet
			});
		}

    });

});