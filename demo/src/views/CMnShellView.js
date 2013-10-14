define([
	"jquery",
	"underscore", 
	"backbone", 
	"marionette",
	"geppetto", 
	//"text!src/templates/TMnShellView.html",
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
      //  TMnShellView,
        CMnNavbar,
        CMnApplicationContext,
        CMnPageSlider) 
{
	var shellViewTemplate = '<div>'+
	'<div class="mnNavBar navbar navbar-inverse navbar-fixed-top">'+
		
	'</div>'+
	'<div class="mainContent container-liquid">'+
		'<div class="mainPanel">'+
			
		'</div>'+
	'</div>'+
   '</div>';

	var ContainerView = Marionette.Layout.extend({
		//set template
		//template : TMnShellView,
		template : shellViewTemplate,
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
			
			this.slider = new CMnPageSlider($('.mainContent'));
		},
		onRender : function(){
			this.constructNavBar();
		},
		initModule : function(eventData){
			this.pageLoadStart();
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
			this.mainContent.show(this.currentView);	
			this.context.dispatch("onModuleLoadComplete",eventData);	
			this.pageLoadComplete();
		},
		pageLoadStart :function(){
			this.$(".mainPanel").hide();
			$(".loadingSpinner").show();
		},
		pageLoadComplete : function(){
			$(".loadingSpinner").hide();
			this.$(".mainPanel").show();
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
