class Card
  include Mongoid::Document

  field :rarity,     type: String
  field :name,     	 type: String
  field :image_url,  type: String
  field :colors,	   type: String
  field :cmc,        type: Integer
  field :foil,  	 	 type: Boolean, default: false

  def make_foil
  	self.foil = true
  	return self
  end

end
