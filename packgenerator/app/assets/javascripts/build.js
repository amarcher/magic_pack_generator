var source, template, decks, mainDeckOne, ready, cardsInPool, getCardsInPool, drawCardsInPool;

getCardsInPool = function(cb) {
	$.ajax({
		url: window.location,
		type: 'get',
		cache: false
	}).done(function(result){
		cardsInPool = result;
		console.log(cardsInPool);
		cb(cardsInPool);
	}).fail(function(error){
		console.log(error);
	});
};

drawCardsInPool = function(cardsData) {

	decks = $(".main_deck, .sideboard").resizable({
      maxHeight: 1000,
      maxWidth: '100%',
      minHeight: 100,
      minWidth: '100%'
    });

	decks.find('ul').sortable({
							connectWith: '.main_deck ul, .sideboard ul',
							greedy: true
						}).disableSelection();

	mainDeckOne = $(".main_deck ul");
	
	$.each(mainDeckOne, function(index, value) {
		$(value).append(cardsAt(cardsInPool, index + 1, 'pack'));
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
	$(document).on('click', '.card', function() {
    $(this).toggleClass("selected");
	});
	$(document).on('contextmenu', '.card', function() {
    $(event.target).parent().toggleClass('big');
    return false;
	});
	$(document).on('mousedown', '.card', function() {
    console.log('hi', event.which, event.button);
    if (event.which === 3 || event.button === 2) {
  		event.preventDefault();
  		console.log('hi');
  		$(event.target).parent().css('width','220px').css('z-index','1002');
  	}
	});
	$(document).on('mouseup', '.card', function() {
    switch (event.which) {
      case 3:
	      event.preventDefault();
    		$(event.target).parent().css('width','110px');
    	}
	});
};

ready = function(){
	source   = $("#card_template").html();
	template = Handlebars.compile(source);
	setEventListeners();
	getCardsInPool(drawCardsInPool);
};

$(document).ready(ready);
$(document).on('page:load', ready);
