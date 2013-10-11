define([
	"jquery",
	"underscore", 
	"backbone", 
	"marionette",
	"geppetto", 
	"text!src/templates/TMnContainerTemplate.html"
],
	function(
		$, 
		_, 
		Backbone, 
		Marionette,
		Geppetto,
        TMnContainerTemplate) 
{

	var ContainerView = Marionette.ItemView.extend({
		//set template
		template : TMnContainerTemplate,
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
