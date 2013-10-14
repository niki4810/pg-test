define([
	"jquery",
	"underscore", 
	"backbone", 
	"marionette",
	"geppetto"
	//text!src/templates/TMnContainerTemplate.html"
],
	function(
		$, 
		_, 
		Backbone, 
		Marionette,
		Geppetto)
        //TMnContainerTemplate) 
{
	
	var containerViewTemplate= '<div>'+
    '<div class="mainContainer">'+
    	'<a class="btn btn-primary btn-lg btn-block" data-value ="10">Load 10 results as List</a>'+
    	'<a class="btn btn-primary btn-lg btn-block" data-value ="50">Load 50 results as List</a>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="100">Load 100 results as List</a>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="1000">Load 1000 results as List</a>'+
		'<a class="btn btn-primary btn-lg btn-block" data-value ="10000">Load 10000 results as List</a>'+
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
			var model = new Backbone.Model({
				count : count				
			});
			var componentPath = "src/views/CMnListContainer";
			
			var eventData = {
				componentPath : componentPath,
				pageTitle : "Employees",
				model  :model
			}		
    		
    		this.context.dispatch("loadModule",eventData);
			
		}
	});
	return ContainerView;
});
