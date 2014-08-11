/**
* jQuery fix to make any ng-Switch control (<switch>) embedded within a a.form-group element clickable /anywhere/ not just on the actual switch itself.
* This makes it possible to click on the switches label to toggle the switch
*
*
*	<a class="form-group row">
*		<label class="control-label col-xs-9 col-sm-10 col-lg-11">Foo Switch</label>
*		<div class="form-control-wrapper col-xs-3 col-sm-2 col-lg-1">
*			<switch ng-model="fooModel"/>
*		</div>
*	</a>
*
* @author Matt Carter <m@ttcarter.com>
* @date 2014-07-26
*
*/
$(function() {
	$(document)
		.on('click', '.form-group .switch', function(e) {
			e.stopPropagation(); // Prevent the switch from bubbling events upwards or we get stuck in an inf loop
		})
		.on('click', '.form-group', function(e) {
			$(this).find('.switch').trigger('click');
		});
});
