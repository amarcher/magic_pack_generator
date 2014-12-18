var source, template, decks, mainDeckOne, ready, cardsInPool, getCardsInPool, drawCardsInPool;

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

	decks = $(".main_deck, .sideboard");

	decks.find('ul').sortable({
							connectWith: '.main_deck ul, .sideboard ul',
							greedy: true
						});

	mainDeckOne = $(".main_deck ul");
	
	$.each(mainDeckOne, function(index, value) {
		$(value).append(cardsAt(cardsInPool, index + 1, 'pack'));
	});

	resizeDivs();

};

var resizeDivs = function() {
	$.each(decks, function(index, value) {
		var parent = $(value);
		var ulHeight = parent.height() > 0 ? parent.height() : parent.parent().height();
		parent.find('ul').height(ulHeight);
	});
};

var cardsAt = function(cardsInArea, number, attribute) {
	var html = '';

	$.each(cardsInArea, function(index, value) {
		if (value[attribute] == number) {
			html += template(value);
		}
  });

  return html;
};

var cardsFor = function(cardIds) {
	cards = [];

	$.each(cardsInPool, function(index, value) {
		if ( cardIds.indexOf(value.id) > -1 ) {
			cards.push(value);
		}
	});

	return cards;
};

var sortBy = function(attribute) {
	var cardIdsInDeck, cardsInDeck, uls;

	$.each(decks, function(index, value) {
		cardIdsInDeck = [];

		uls = $(value).find('ul');

		$.each(uls, function(i, v) {
			cardIdsInDeck.push.apply( cardIdsInDeck, $(v).sortable("toArray") );
		});

		cardsInDeck = cardsFor(cardIdsInDeck);
		console.log(cardsInDeck);

		$.each(uls, function(i, v) {
			$(v).html( cardsAt(cardsInDeck, i + 1, attribute) );
		});
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
