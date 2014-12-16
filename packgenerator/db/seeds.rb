# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


def read_file(file_name)
	file = File.open(file_name, "r")
	data = file.read
	file.close
	return data
end

data = JSON.parse(read_file("db/KTK.json"))
mtgset = Mtgset.create(name: "KTK")
data['cards'].each do |card|
	mtgset.cards.build(
					  					rarity: card['rarity'],
					  					name: card['name'],
					  					image_url: URI.escape('http://mtgimage.com/set/' + mtgset.name + '/' + card['imageName'] + '.jpg'),
                      colors: card['colors'],
                      cmc: card['cmc']
										)
	mtgset.save!
end
