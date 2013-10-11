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
    "geppetto",
	"text!src/templates/TMnNavbar.html"
],function(
    $,
    _,
    Backbone,
    Marionette,
    Geppetto,
    TMnNavbar
    ){
    "use strict";
    return Marionette.ItemView.extend({
    	className:"container",
		template: TMnNavbar,
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