define([
	"jquery",
	"underscore", 
	"backbone", 
	"marionette",
	"geppetto"
],
	function(
		$, 
		_, 
		Backbone, 
		Marionette,
		Geppetto)
{
	
	var containerViewTemplate= '<div>'+
    '<div class="mainContainer">'+
    	'<h1>List Rendering examples</h1>'+
    	'<a class="btn btn-primary btn-lg btn-block" data-value ="10">Load 10 results as List</a>'+
    	'<a class="btn btn-primary btn-lg btn-block" data-value ="50">Load 50 results as List</a>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="100">Load 100 results as List</a>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="1000">Load 1000 results as List</a>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="10000">Load 10000 results as List</a>'+
		'<h1>Geo Location examples</h1>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="weather">Get Local Weather</a>'+
    '</div>'+
'</div>';

	var ContainerView = Marionette.ItemView.extend({
		//set template
		//template : TMnContainerTemplate,
		template : containerViewTemplate,
		initialize : function() {
			 _.bindAll(this);
			 this.context = this.options.context;
		},
		events : {
			"click a" : "onMenuItemClick"
		},
		onMenuItemClick : function(e){
			e.preventDefault();
			
			
			var count = this.$(e.currentTarget).data("value");
			if (count === "weather") {
				
				if (navigator.geolocation) {
					var weatherModel = new Backbone.Model({
							description : "",
							temp :"",
							tempMin:"",
							tempMax:"",
							sunRise:"",
							sunSet:""
						});
					var componentPath1 = "src/views/CMnWeatherDetailPage";
						var weatherEventData = {
							pageTitle: "Local Weather",
							componentPath : componentPath1,
							model : weatherModel
						};
					this.context.dispatch("loadModule", weatherEventData);							
				}					

			} else {
				var model = new Backbone.Model({
					count : count
				});
				var componentPath = "src/views/CMnListContainer";

				var eventData = {
					componentPath : componentPath,
					pageTitle : "Employees",
					model : model
				}

				this.context.dispatch("loadModule", eventData);
			}

		}
	});
	return ContainerView;
});
