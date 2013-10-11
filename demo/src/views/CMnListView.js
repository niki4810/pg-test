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
	"text!src/templates/TMnListView.html"
],function(
    $,
    _,
    Backbone,
    Marionette,
    Geppetto,
    TMnListView
    ){
    "use strict";
    return Marionette.ItemView.extend({
    	className:"list-group",
		template: TMnListView,
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