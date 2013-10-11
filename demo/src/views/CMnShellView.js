define([
	"jquery",
	"underscore", 
	"backbone", 
	"marionette",
	"geppetto", 
	"text!src/templates/TMnShellView.html",
	"src/views/CMnNavbar",
	"src/controller/CMnApplicationContext",
	"src/utils/CMnPageSlider"
],
	function(
		$, 
		_, 
		Backbone, 
		Marionette,
		Geppetto,
        TMnShellView,
        CMnNavbar,
        CMnApplicationContext,
        CMnPageSlider) 
{

	var ContainerView = Marionette.Layout.extend({
		//set template
		template : TMnShellView,
		regions :{
			"navBar" : ".mnNavBar",
			"mainContent" : ".mainPanel"
		},
		initialize : function() {
			 _.bindAll(this);
			 //create a Geppetto context
			Geppetto.bindContext({
				view : this,
				context : CMnApplicationContext
			});
			
			this.context.listen(this, "loadModule" , this.initModule);
			this.context.listen(this, "reLoadModule" ,this.reLoadModule);				
		},
		onRender : function(){
			this.slider = new CMnPageSlider(this.$('.mainContent'));
			this.constructNavBar();
		},
		initModule : function(eventData){
			var previousTitle = "";
			if (this.currentView) {
				var navPaths = this.context.model.get("paths");
				navPaths.push(this.currentView.eventData);/*previous View data*/
				previousTitle = this.currentView.eventData.pageTitle;
			}
			eventData.previousTitle = previousTitle;
			this.loadModule(eventData);
		},
		reLoadModule : function(eventData){
			this.loadModule(eventData);
		},
		loadModule : function(eventData){
			var path = eventData.componentPath;
			var that = this;
			var viewComp = require([path],function(ViewComponent){
				if(!ViewComponent){
					throw new Error("Invalid or missing component: " + path);
				}
				that.constructMainContent(ViewComponent,eventData);
			});
		},
		constructMainContent : function(ViewComponent,eventData){			
			this.currentView = new ViewComponent({
				model : eventData.model,
				context : this.context
			});
			
			this.currentView.eventData = eventData;		
			// this.currentView.render();
			// this.slider.slidePage(this.currentView.$el);	
			this.mainContent.show(this.currentView);	
			this.context.dispatch("onModuleLoadComplete",eventData);	
		},
		constructNavBar : function(){
			var model = new Backbone.Model({
				pageTitle : "",
				previousTitle : ""
			});
			var navBarInstance = new  CMnNavbar({
				model : model,
				context : this.context
			});
			this.navBar.show(navBarInstance);
		}
	});
	return ContainerView;
});
