define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
	
	"use strict";

	var command = function() {
	};

	command.prototype.execute = function() {
		_.bindAll(this);
		var count = this.eventData.count;
		var endCount = +count + 5;
		var that = this;
		var formatJSON = function(obj, indent) {
			var result = [];
			indent = (indent || '') + '  ';
			var type = $.isArray(obj) ? 'array' : (obj === null) ? 'null' : typeof obj;

			switch (type) {
				case 'object':
					result.push('{ ');
					for (var i in obj) {
						result.push('"' + i + '" : ' + formatJSON(obj[i], indent) + ',');
					}
					var last = result.pop();
					result.push(last.substr(0, last.length - 1));
					result.push('}');
					break;

				case 'array':
					result.push('[ ');
					for (var i = 0; i < obj.length; i++) {
						result.push(formatJSON(obj[i], indent) + ',');
					}
					var last = result.pop();
					result.push(last.substr(0, last.length - 1));
					result.push(']');
					break;

				case 'string':
					result.push('"' + obj + '"');
					break;

				default:
					result.push(obj + '');
					break;
			}

			return result.join('\n' + indent);
		};

		var key = "employees|" + count + "-" + endCount;
		var template1 = {};

		var templateObj = [{
			"id|+1" : 1,
			"email" : "@EMAIL",
			"name" : "@MALE_FIRST_NAME @LAST_NAME",
			"location" : "@LOREM",
			"title" : "@LOREM",
			"reportsTo" : "@MALE_FIRST_NAME @LAST_NAME",
			"profilepic" : "http://placekitten.com/150/150"
		}];

		template1[key] = templateObj;
		var templ = formatJSON(template1);
		var jsonTempl = $.parseJSON(templ);
		$.mockJSON(/mockme\.json/, jsonTempl);
		$.getJSON('mockme.json', function(json) {
			that.handleDataLoadSuccess(json);
		});
	};

	command.prototype.handleDataLoadSuccess = function(data) {
		var employees = data.employees;
		var model = new Backbone.Model();
		model.set({
			"employees" : employees
		});
		this.context.dispatch("onListItemsLoaded", {
			data : model
		});
	};
	command.prototype.handleDataLoadError = function(e) {
		//when there are no movies dispatch an error event
		this.context.dispatch("loadResultsErrorEvent"/*event name*/);
	};
	return command;

});
