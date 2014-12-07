class Pool
  include Mongoid::Document

  embeds_many :packs
  
end
