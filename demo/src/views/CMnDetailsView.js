/**
 * Created with IntelliJ IDEA.
 * User: nkatakam
 * Date: 10/1/13
 * Time: 8:42 PM
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

	var detailViewTemplate = '<div>'+
	'<div class="panel panel-default">'+	
	'<div class="panel-heading"><img src="{{profilepic}}" alt="profilepic" class="img-rounded"></div>'+
	'<div class="panel-body">'+
		'<h3>{{name}}</h3>'+
		'<p>{{title}}</p>'+
		'<p>{{location}}</p>'+
		'<p>{{reportsTo}}</p>'+
		'<p><a href="mailto:{{email}}">{{email}}</a></p>'+
		'<h2>Device Details : </h2>'+
		'<p>Device Name : {{deviceName}}</p>'+
		'<p>Device platform : {{devicePlatform}}</p>'+
		'<p>Device UUID : {{deviceUUID}}</p>'+
		'<p>Device Version : {{deviceVersion}}</p>'+
		'<p></p>'
	'</div>'+
'</div>'+
'</div>';
    return Marionette.ItemView.extend({
        template : detailViewTemplate,
        initialize : function(){
            _.bindAll(this);
        }
    });

});