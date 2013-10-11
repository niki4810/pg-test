<script type="text/template">
<span> 
{{#each employees}} 
	<a href="#details/{{name}}/{{title}}/{{location}}/{{reportsTo}}" data-id="{{id}}" class="list-group-item"> 
		<h4 class="list-group-item-heading">{{name}}</h4>
		<p class="list-group-item-text">
			{{title}}
		</p> 
	</a> 
{{/each}} 
</span>
</script>
