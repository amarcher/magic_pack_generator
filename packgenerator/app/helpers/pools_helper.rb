module PoolsHelper

	class JSON_Card
		attr_accessor :image_url, :name, :cmc, :color, :pack, :rarity

		def initialize(attributes)
			@id = attributes[:id]
			@image_url = attributes[:image_url]
			@name = attributes[:name]
			@cmc = attributes[:cmc]
			@color = attributes[:color]
			@pack = attributes[:pack]
			@rarity = attributes[:rarity]
			@foil = attributes[:foil]
		end
	end

	def self.int_color(card)
		if (card.colors.nil? && card.rarity.nil?)
			return 8
		elsif card.colors.nil?
			return 7
		elsif card.colors.include?(',')
			return 6
		elsif card.colors.include?('Green')
			return 5
		elsif card.colors.include?('Red')
			return 4
		elsif card.colors.include?('Black')
			return 3
		elsif card.colors.include?('Blue')
			return 2
		else
			return 1
		end
	end

	def self.int_rarity(card)
		if card.rarity.nil?
			return 5
		elsif card.rarity == 'Common'
			return 4
		elsif card.rarity == 'Uncommon'
			return 3
		elsif card.rarity == 'Rare'
			return 2
		else
			return 1
		end
	end

	def self.int_cmc(card)
		(card.cmc || 0) + 1
	end

	def self.jsonify(pool)

		json_cards = []

		pool.packs.each.with_index do |pack, index|
			pack.cards.each.with_index do |card, i|
				json_card = JSON_Card.new({
						id: 'pack_' + (index + 1).to_s + '_card_' + (i + 1).to_s,
						image_url: card.image_url,
						name: card.name,
						cmc: int_cmc(card),
						color: int_color(card),
						pack: index + 1,
						rarity: int_rarity(card),
						foil: card.foil
					})
				json_cards.push(json_card)
			end
		end

		json_cards
	end

end
