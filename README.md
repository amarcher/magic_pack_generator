#Magic Pack Generator
Open a pool of MTG cards. Sort them into a build. Share it with others. See what they build.

##Models
* *Mtgset* - collection of *cards*
* *Card* - significant properties: *name*, *image_url*, *rarity*, *color*, *cmc*
* *Pool* - collection of cards from N packs, may have multiple builds each by a single user.
* *Build* - collection of cards from a pool sorted into between one and three decks
* *Deck* - consists of both a sideboard and a mainboard -- consists of cards from the pool plus basic lands
* *User* - may edit the build(s) they publish

##User Stories and TODOs
As a user...
 - I can generate a pool of N packs and see pictures of all the cards in the pool
 	- TODO: Add & wire up form to select number of packs in pool 
 - I can sort the pool by rarity, pack, color, and converted mana cost
  	- TODO: Add mana cost to the card attributes
  	- TODO: Sort by color
  	- TODO: Sort by CMC
 - I can zoom in on a card
  	- TODO: Tie right click mousedown event to add zoom class / remove it
  	- TODO: CSS for zoom class scale(2x)
 - I can create a build, then drag and sort the cards into decks that constitute a build
  	- TODO: Allow user to create & edit a build (specify # of decks in build)
  	- TODO: Add specified number of "deck" drop targets 
 - I can add basic lands to the decks in the build build
 	- TODO: Modal to add land cards (per deck)
 - I can save the build and publish it for others to see
	- TODO: Serialize the cards in each deck, save them to the DB
 - Animations!
