class Card
  include Mongoid::Document

  field :rarity,     type: String
  field :name,     	 type: String
  field :image_url,  type: String
  field :foil,  	 	 type: Boolean, default: false

  # Relationships.
  store_in collection: "citizens"

  def make_foil
  	self.foil = true
  	return self
  end

end
