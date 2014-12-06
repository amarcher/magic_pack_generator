require 'json'

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
		@cards = data['cards'].map { |card| Card.new(card['rarity'], card['name']) }
	end

	def sample(number, rarity)
		@cards.select {|card| card.rarity == rarity}.sample(number)
	end

end

class Card
	attr_reader :rarity, :name

	def initialize(rarity, name)
		@rarity = rarity
		@name = name
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

		@cards = commons + uncommons + rare
	end

	def to_s
		puts "-"*50

		@cards.each do |card|
			puts card.name
		end

		puts "-"*50
	end

	private

	def contains_mythic
		return rand(8) == 0
	end

end

khans = Set.new("KTK.json")
pack = Pack.new(khans)
puts pack