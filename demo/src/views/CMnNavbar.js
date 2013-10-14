/**
 * Created with IntelliJ IDEA.
 * User: nkatakam
 * Date: 10/1/13
 * Time: 7:26 PM
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
    var navBarTemplate = '<div class="navbar-header">'+
	'<div>'+
		'<div class="mnNavBackBtn">'+
			'<button class="btn btn-primary" name="backBtn"></button>'+
		'</div>'+
		'<div class="mnNavTitle">'+
			'<label name="pageTitle"></label>'+
		'</div>'+
		'<div class="mnNavSettings"></div>'+
	'</div>'+	
'</div>';
    return Marionette.ItemView.extend({
    	className:"container-liquid",
		template: navBarTemplate,
		_modelBinder : undefined,
        initialize : function(){
            _.bindAll(this);
            this.context = this.options.context;
            this._modelBinder = new Backbone.ModelBinder();
            this.context.listen(this, "onModuleLoadComplete",this.onLoadModule);
        },
        events : {
        	'click .mnNavBackBtn button.btn ' : "onBackButtonClick"
        },
        onBackButtonClick : function(){
        	var navPaths = this.context.model.get("paths");
        	var previousPathData = navPaths.pop();
        	this.context.dispatch("reLoadModule",previousPathData);
        },
        close : function() {
			//when view closes, unbind Model bindings
			this._modelBinder.unbind();
		},
		onRender : function(){
			var bindings = {
				"pageTitle" : '[name= "pageTitle"]',
				"previousTitle" : '[name= "backBtn"]'
			};
			this._modelBinder.bind(this.model/*the model to bind*/, this.el/*root element*/, bindings /*bindings*/ );
		},
		onLoadModule : function(eventData){
			
			this.model.set({pageTitle : eventData.pageTitle,previousTitle :eventData.previousTitle});
			if(eventData.previousTitle === ""){
				this.$(".mnNavBackBtn button.btn").hide();
			}else{
				this.$(".mnNavBackBtn button.btn").show();
			}
		}
    });
});