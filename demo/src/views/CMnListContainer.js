define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "geppetto",
   	"src/views/CMnListView"
],function(
    $,
    _,
    Backbone,
    Marionette,
    Geppetto,
    CMnListView
    ){
    	
    "use strict";
    
    var listContainerTemplate = '<div>'+
		'<div class="listContainer">'+	
		'</div>'+
	'</div>';
    
    return Marionette.Layout.extend({
        template: listContainerTemplate,
        regions : {
        	listContainer : ".listContainer"
        },
        initialize : function(){
            _.bindAll(this);
            this.context = this.options.context;
			this.context.listen(this,"onListItemsLoaded",this.loadListItems);
			this.context.listen(this,"loadResultsErrorEvent",this.loadListError);			
        },
		onRender : function(){
			this.context.dispatch("GetListItems",{count:this.model.get("count")});	
		},
        loadListError : function(){
        	alert("error loading data");
        },
		loadListItems : function(result){
			var subView;
			subView = new CMnListView({
				model : result.data,
				context : this.context
			}); 
			this.listContainer.show(subView);
		}
    });
});