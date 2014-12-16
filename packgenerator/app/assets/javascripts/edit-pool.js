var source, template, gridster, ready, cardsInPool, getCardsInPool, drawCardsInPool;

getCardsInPool = function(cb) {
	$.ajax({
		url: window.location,
		type: 'get'
	}).done(function(result){
		cardsInPool = result;
		console.log(cardsInPool);
		cb(cardsInPool);
	}).fail(function(error){
		console.log(error);
	});
};

drawCardsInPool = function(cardsData) {
	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [110, 33],
		widget_margins: [0, 0]
	}).data('gridster');

	sortBy('pack');
};

var sortBy = function(attribute) {
	var counts = {};
	gridster.remove_all_widgets();

	$.each(cardsInPool, function(index, value) {
		if (counts[value[attribute]]) { 
			counts[value[attribute]] += 1;
		} else {
			counts[value[attribute]] = 1;
		}
		gridster.add_widget(
			template(value),
			1,
			1,
			value[attribute],
			counts[value[attribute]]
		);
  });
};

var setEventListeners = function() {
	$('.sort-by-pack').on('click',function() { sortBy('pack'); });
	$('.sort-by-cost').on('click',function() { sortBy('cmc'); });
	$('.sort-by-color').on('click',function() { sortBy('color'); });
	$('.sort-by-rarity').on('click',function() { sortBy('rarity'); });
};

ready = function(){
	source   = $("#card_template").html();
	template = Handlebars.compile(source);
	setEventListeners();
	getCardsInPool(drawCardsInPool);
};

$(document).ready(ready);
$(document).on('page:load', ready);
