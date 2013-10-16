define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
	
	"use strict";

	var command = function() {
	};

	command.prototype.execute = function() {
		_.bindAll(this);
		var that =this;						
		navigator.geolocation.getCurrentPosition(function(data) {
			var lat = data.coords.latitude;
			var lon = data.coords.longitude;

			var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon;
			$.ajax({
				url : url,
				dataType : "jsonp",
				success : function(data) {
					that.handleDataLoadSuccess(data);
				},
				statusCode : {
					503 : function() {
						that.handleDataLoadError("page not found");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					that.handleDataLoadError(errorThrown);
				}
			}); 
		}, function() {
			alert("oops, could not get geo location information");
		}, {}); 			
		
	};

	command.prototype.handleDataLoadSuccess = function(data) {
		var eventData ={
			description : data.weather[0].description,
			temp : data.main.temp,
			tempMin : data.main.temp_min,
			tempMax : data.main.temp_max,
			sunRise : data.sys.sunrise,
			sunSet: data.sys.sunset
		};
		this.context.dispatch("onWeatherDataLoaded",eventData);
	};
	command.prototype.handleDataLoadError = function(e) {
		//when there are no movies dispatch an error event
		this.context.dispatch("loadResultsErrorEvent"/*event name*/);
	};
	return command;

});
