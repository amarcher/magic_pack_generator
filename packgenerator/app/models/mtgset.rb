class Mtgset
  include Mongoid::Document

  field :name, type: String
  embeds_many :cards

  def get_cards(number, rarity)
		self.cards.select {|card| card.rarity == rarity}.sample(number)
	end

end
