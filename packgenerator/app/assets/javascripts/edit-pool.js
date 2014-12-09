var gridster, ready, getCardsInPool, drawCardsInPool, htmlForCard;

getCardsInPool = function(callback) {
	$.ajax({
		url: window.location,
		type: 'get'
	}).done(function(result){
		console.log(result);
		callback(result);
	}).fail(function(error){
		console.log(error);
	});
};

htmlForCard = function(card) {
	var string = "<div class='card col span_1 ";
	if (card.foil) {
		string += " foil";
	}
	string += '\'><img src="' + card.image_url;
	string += '" /></div>';
	return string;
};	

drawCardsInPool = function(cardsData) {
	  // same object that's generated with gridster.serialize() method
	  // var serialization = [
		 //    {
		 //        col: 1,
		 //        row: 1,
		 //        size_x: 1,
		 //        size_y: 1
		 //    }
	  //   ];
	  // sort serialization
	  // serialization = Gridster.sort_by_row_and_col_asc(serialization);

    gridster = $(".gridster ul").gridster({
      widget_base_dimensions: [110, 33],
      widget_margins: [0,0]
    }).data('gridster');



    var sortByPacks = function() {
    	gridster.remove_all_widgets();
	    $.each(cardsData.packs, function() {
	    		console.log(this.cards);
	    		for ( var i=0; i < this.cards.length; i++ ) {
	        	gridster.add_widget(
	        		htmlForCard(this.cards[i]),
	        		1,
	        		1,
	        		cardsData.packs.indexOf(this) + 1,
	        		i + 1
	        	);
	  			}
	    });
	  };
	  
    sortByPacks();
    $('.sort-by-pack').on('click',sortByPacks);
  };



ready = function(){
	getCardsInPool(drawCardsInPool);
};
    
$(document).ready(ready);
$(document).on('page:load', ready);