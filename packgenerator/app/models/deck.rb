class Deck
  include Mongoid::Document

	field :name, type: String
  embeds_many :instruments
  embedded_in :build

end
