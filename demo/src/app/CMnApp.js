//trigger test
define( [
    "jquery",
    "backbone",
    "marionette",
    "geppetto",
    "src/views/CMnShellView"
], function (
    $,
    Backbone, 
    Marionette, 
    Geppetto, 
    CMnShellView
) {
    "use strict";
    

    
    var app = new Marionette.Application();

    app.addInitializer( function ( options ) {      	
    	
    	var shellView = new CMnShellView({});
    	$("body" ).append(shellView.render().$el);
    	var eventData = {
    		componentPath : "src/views/CMnContainerView",
    		pageTitle : "Home",
    		model : new Backbone.Model()
    	}
    	shellView.context.dispatch("loadModule",eventData);  	     	        
    } );
    
    return app;
} );
