define([
	'backbone', 
	'geppetto',
	'src/commands/CMnGetListCommand',
	'src/commands/CMnGetWeatherCommand'],
function(
	Backbone,
	Geppetto,
    CMnGetListCommand,
    CMnGetWeatherCommand) {

	//return a geppetto context
	return Geppetto.Context.extend({
		//setup an initialize function
		initialize : function() {
			this.model = new Backbone.Model({
				paths  : []
			});
			// map commands 
			//when ever a "performSearchEvent" is dispatch on this command
			//the context delegates that call to the SearchMoviesCommand
			this.mapCommand( "GetListItems"/*event name*/, CMnGetListCommand );
			this.mapCommand("loadWeatherData",CMnGetWeatherCommand);
		}
	});
})
