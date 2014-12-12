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
    
	  var sortByColor = function() {
    	gridster.remove_all_widgets();
      // TODO: sort all cards into an array of arrays [[card1, card2], [card3], [card4, card5, card6]]
      // TODO: loop through the hash, making widgets for each card in the array at col = index
	    $.each(cardsData.packs, function() {
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

	  var sortByRarity = function() {
      var rarities = [[],[],[],[]]
    	gridster.remove_all_widgets();
      // TODO: sort all cards into an array of arrays [[card1, card2], [card3], [card4, card5, card6]]
      $.each(cardsData.packs, function(){
          for ( var i=0; i < this.cards.length; i++ ) {
              switch(this.cards[i].rarity) {
                      case 'Mythic Rare':
                              rarities[0].push(this.cards[i]);
                              break;
                      case 'Rare':
                              rarities[1].push(this.cards[i]);
                              break;
                      case 'Uncommon':
                              rarities[2].push(this.cards[i]);
                              break;
                      default:
                              rarities[3].push(this.cards[i]);
              }
          }
      });

      for ( var i=0; i < rarities.length; i++ ) {
          for ( var j=0; j < rarities[i].length; j++ ) {
            gridster.add_widget(
	        		htmlForCard(rarities[i][j]),
	        		1,
	        		1,
	        		i + 1,
	        	  j + 1
	        	);
	  			}

	     }
	  };

	  var sortByCMC = function() {
    	gridster.remove_all_widgets();
      // TODO: sort all cards into an array of arrays [[card1, card2], [card3], [card4, card5, card6]]
      // TODO: loop through the hash, making widgets for each card in the array at col = index
        for ( var i=0; i < rarities.length; i++ ) {
          for ( var j=0; j < rarities[i].length; j++ ) {
            gridster.add_widget(
	        		htmlForCard(rarities[i][j]),
	        		1,
	        		1,
	        	  j + 1,
	        		i + 1
	        	);
	  			}
	    };
	  };
	  
    sortByPacks();
    $('.sort-by-pack').on('click',sortByPacks);
    $('.sort-by-cost').on('click',sortByCMC);
    $('.sort-by-color').on('click',sortByColor);
    $('.sort-by-rarity').on('click',sortByRarity);
  };



ready = function(){
	getCardsInPool(drawCardsInPool);
};
    
$(document).ready(ready);
$(document).on('page:load', ready);
