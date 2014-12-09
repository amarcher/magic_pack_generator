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
		redirect_to edit_pool_path(@pool)
	end

	def show
		@pool = Pool.find(params[:id])
		respond_to do |format|
			format.json { render json: @pool }
			format.html { }
		end
	end

	# TODO refactor into the builds controller
	def edit
		@pool = Pool.find(params[:id])
		respond_to do |format|
			format.json { render json: @pool }
			format.html { }
		end
	end

	# TODO refactor into the builds controller
	def update
		@pool = Pool.find(params[:id])
		respond_to do |format|
			format.json { render json: @pool }
			format.html { }
		end
	end

	private

  def setname_params
  	params.permit(:setname)
  end

end
