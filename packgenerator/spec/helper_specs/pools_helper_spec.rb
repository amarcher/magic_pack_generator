require 'rails_helper'

RSpec.describe PoolsHelper, :type => :helper do
  before(:all) do
  	@land_attributes = {name: "Blossoming Sands",
  											image_url: "http://mtgimage.com/set/KTK/blossoming%20sands.jpg",
  											rarity: "Common",
  											foil: false,
  											colors: nil,
  											cmc: nil}
  	@artifact_attributes = {cmc: 3,
  											colors: nil,
  											foil: false,
  											image_url: "http://mtgimage.com/set/KTK/abzan%20banner.jpg",
  											name: "Abzan Banner",
  											rarity: "Common"}
  	@muli_colored_attributes = {cmc: 6,
  											colors: "[\"White\", \"Black\", \"Red\"]",
  											foil: false,
  											image_url: "http://mtgimage.com/set/KTK/ponyback%20brigade.jpg",
  											name: "Ponyback Brigade",
  											rarity: "Common"}
  	@land_card = Card.new(@land_attributes)
  	@artifact_card = Card.new(@artifact_attributes)
  	@muli_colored_card = Card.new(@muli_colored_attributes)
  end

  describe "#int_color" do
    it "returns an integer representing a land card's color" do
      expect(helper.int_color(@land_card)).to eq 7
    end
    it "returns an integer representing an artifact card's color" do
      expect(helper.int_color(@artifact_card)).to eq 7
    end
    it "returns an integer representing an multi_colored card's color" do
      expect(helper.int_color(@muli_colored_card)).to eq 6
    end
  end

  describe "#int_rarity" do
    it "returns an integer representing a land card's rarity" do
      expect(helper.int_rarity(@land_card)).to eq 4
    end
  end

  describe "#jsonify" do
    before(:all) do
    	mtgset = Mtgset.create(name: "KTK")
    	mtgset.cards = [ @land_card,
    									 @artifact_card,
    									 @muli_colored_card ]
		  mtgset.save!
    end

    it "returns a json object representing a pool" do
      @pool = Pool.new
      @packs = Array.new(6) do
      	Pack.create(setname: 'KTK')
      end
      @pool.packs = @packs
      @pool.save!
      p @pool.packs
      expect(helper.jsonify(@pool.reload)).to eq 4
    end
  end
end