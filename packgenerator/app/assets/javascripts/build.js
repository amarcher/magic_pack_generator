var source, template, pool_gridster, decks_gridster, ready, cardsInPool, getCardsInPool, drawCardsInPool;

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

	var decks = $(".main_deck, .sideboard");
	pool_gridster = $(".main_deck ul");
	
	$.each(pool_gridster, function(index, value) {
		$(value).append(cardsAt(index + 1, 'pack'));
	});

	$.each( decks, function(index, value) {
		var parent = $(value);
		var ulHeight = parent.height() > 0 ? parent.height() : parent.parent().height();
		console.log(ulHeight);
		parent.find('ul')
					.height(ulHeight)
					.sortable({
						connectWith: '.full_pool ul, .main_deck ul, .sideboard ul',
						receive: function( event, ui ) {
							console.log(event, ui);
						}
					});
	});

};

var cardsAt = function(number, attribute) {
	var html = '';

	$.each(cardsInPool, function(index, value) {
		if (value[attribute] == number) {
			html += template(value);
		}
  });

  return html;
};

var sortBy = function(attribute) {
	$.each(pool_gridster, function(index, value) {
		$(value).html(cardsAt(index + 1, attribute));
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
