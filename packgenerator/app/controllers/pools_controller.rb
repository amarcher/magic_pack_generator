class PoolsController < ApplicationController

	def new
		@pool = Pool.new()
	end

	def create
		packs = Array.new(6) do
			Pack.create(setname_params)
		end
		@pool = Pool.new
		@pool.packs = packs
		@pool.save!
		redirect_to @pool
	end

	def show
		@pool = Pool.find(params[:id])
	end

	private

  def setname_params
  	params.permit(:setname)
  end

end
