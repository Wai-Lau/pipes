class UsersController < ApplicationController
  def new
    @url = params[:url]
  end

  def create
    @user = User.new
    @user.name = params["user"]["name"]
    if @user.save
      cookies.signed[:user_id] = @user.id
      url = params["user"]["url"]
      if url && Maproom.find_by(url: url)
        redirect_to maproom_url(id: url)
        return
      end
      url = random_string
      while Maproom.find_by(url: url) do
        url = random_string
      end
      Maproom.new(url: url).save!
      redirect_to maproom_url(id: url)
      return
    else
      redirect_to new_user_url
      return
    end
  end

  def random_string
    (0..15).map { (65 + rand(26)).chr }.join
  end
end
