// var source, template, pool_gridster, main_deck_gridster, ready, cardsInPool, getCardsInPool, drawCardsInPool;

// getCardsInPool = function(cb) {
// 	$.ajax({
// 		url: window.location,
// 		type: 'get'
// 	}).done(function(result){
// 		cardsInPool = result;
// 		console.log(cardsInPool);
// 		cb(cardsInPool);
// 	}).fail(function(error){
// 		console.log(error);
// 	});
// };

// drawCardsInPool = function(cardsData) {
// 	pool_gridster = $(".full_pool ul").gridster({
// 		widget_base_dimensions: [110, 33],
// 		widget_margins: [0, 0]
// 	}).data('gridster');

// 	var mainDeck = $(".main_deck");
//   mainDeck = $(mainDeck.find('ul')).height(mainDeck.height());

// 	main_deck_gridster = mainDeck.droppable({
// 	      drop: function( event, ui ) {
// 	      	console.log(event, ui);
// 	      }
// 	    });

// 	sortBy('pack');
// };

// var sortBy = function(attribute) {
// 	var columnCounts = {};
// 	pool_gridster.remove_all_widgets();

// 	$.each(cardsInPool, function(index, value) {
// 		if (columnCounts[value[attribute]]) { 
// 			columnCounts[value[attribute]] += 1;
// 		} else {
// 			columnCounts[value[attribute]] = 1;
// 		}
// 		pool_gridster.add_widget(
// 			template(value),
// 			1,
// 			1,
// 			value[attribute],
// 			columnCounts[value[attribute]]
// 		);
//   });
// };

// var setEventListeners = function() {
// 	$('.sort-by-pack').on('click',function() { sortBy('pack'); });
// 	$('.sort-by-cost').on('click',function() { sortBy('cmc'); });
// 	$('.sort-by-color').on('click',function() { sortBy('color'); });
// 	$('.sort-by-rarity').on('click',function() { sortBy('rarity'); });
// };

// ready = function(){
// 	source   = $("#card_template").html();
// 	template = Handlebars.compile(source);
// 	setEventListeners();
// 	getCardsInPool(drawCardsInPool);
// };

// $(document).ready(ready);
// $(document).on('page:load', ready);
