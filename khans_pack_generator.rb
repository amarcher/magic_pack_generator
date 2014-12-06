require 'json'
require 'uri'

def read_file(file_name)
	file = File.open(file_name, "r")
	data = file.read
	file.close
	return data
end

class Set
	attr_reader :cards

	def initialize(file)
		data = JSON.parse(read_file(file))
		@cards = data['cards'].map { |card| Card.new(card['rarity'], card['name'], card['imageName']) }
	end

	def sample(number, rarity)
		@cards.select {|card| card.rarity == rarity}.sample(number)
	end

end

class Card
	attr_reader :rarity, :name, :image_url, :foil

	def initialize(rarity, name, image, foil=false)
		@rarity = rarity
		@name = name
		@image_url = URI.escape('http://mtgimage.com/card/' + image + '.jpg')
		@foil = foil
	end

	def make_foil
		@foil = true
		return self
	end

end


class Pack
	attr_reader :cards

	def initialize(set)
		commons = set.sample(10, 'Common')
		uncommons = set.sample(3, 'Uncommon')
		
		if contains_mythic
			rare = set.sample(1, 'Mythic Rare')
		else
			rare = set.sample(1, 'Rare')
		end

		if contains_foil
			commons.pop
			commons.push(set.cards.sample.make_foil)
		end

		@cards = commons + uncommons + rare
	end

	def to_s
		puts "-"*50

		@cards.each do |card|
			print card.rarity[0] + " - " 
			print "**FOIL** " if card.foil
			puts card.name + " ---> " + card.image_url
		end

		puts "-"*50
	end

	private

	def contains_mythic
		return rand(8) == 0
	end

	def contains_foil
		return rand(8) == 0
	end

end

khans = Set.new("KTK.json")
pack = Pack.new(khans)
puts pack