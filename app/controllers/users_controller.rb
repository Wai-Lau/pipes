class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new
    @user.name = params["user"]["name"]
    if @user.save
      redirect_to new_maproom_url
      return
    else
      redirect_to new_maproom_url
      return
    end
  end
end
