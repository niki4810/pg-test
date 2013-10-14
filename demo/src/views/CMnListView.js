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
    
    var listViewTemplate = '<span>'+ 
'{{#each employees}}'+ 
	'<a href="#details/{{name}}/{{title}}/{{location}}/{{reportsTo}}" data-id="{{id}}" class="list-group-item">'+ 
		'<h4 class="list-group-item-heading">{{name}}</h4>'+
		'<p class="list-group-item-text">'+
			'{{title}}'+
		'</p>'+
	'</a>'+ 
'{{/each}}'+
'</span>';

    return Marionette.ItemView.extend({
    	className:"list-group",
		template: listViewTemplate,
        initialize : function(){
            _.bindAll(this);
            this.context = this.options.context;
        },
        events: {
        	"click a" : "loadDetail"
        },
        loadDetail : function(e){
        	e.preventDefault();
        	var employees = this.model.get("employees");
        	var id = this.$(e.currentTarget).data("id");
        	var employee = _.find(employees,function(emp){ 
              if(emp.id === id ){
                  return emp;
              }
            });
            
            var model = new Backbone.Model(employee);
        	var componentPath = "src/views/CMnDetailsView";
        	var pageTitle = employee.name;			
			var eventData = {
				componentPath : componentPath,
				pageTitle : pageTitle,
				model  :model
			}		
    		
    		this.context.dispatch("loadModule",eventData);
        }
    });
});