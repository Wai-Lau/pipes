class MaproomsController < ApplicationController
  def index
  end

  def show
    unless cookies.signed[:user_id]
      redirect_to new_user_url(url: params[:id])
      return
    end
    @url = params[:id]
  end

  def new
  end

  def create
  end

  private

  def room
    Maproom.find_by(url: params[:id])
  end
end
