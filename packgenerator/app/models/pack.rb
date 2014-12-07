class Pack
  include Mongoid::Document

  field :setname, type: String
  embeds_many :cards

  before_create :fill

  def get_set
    return Mtgset.where( name: self.setname ).first
  end 

  def fill
    mtgset = get_set

  	commons = mtgset.get_cards(10, 'Common')
  	uncommons = mtgset.get_cards(3, 'Uncommon')
  	
  	if contains_mythic?
  		rare = mtgset.get_cards(1, 'Mythic Rare')
  	else
  		rare = mtgset.get_cards(1, 'Rare')
  	end

  	if contains_foil?
  		commons.pop
  		commons.push(mtgset.cards.sample.make_foil)
  	end

  	self.cards = commons + uncommons + rare
  end

  private

  def contains_mythic?
  	return rand(8) == 0
  end

  def contains_foil?
  	return rand(8) == 0
  end

end
