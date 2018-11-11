class MovesController < ApplicationController
  def create
    move = params["move"]["content"]
    data = {
      "user": User.find_by(id: cookies.signed[:user_id]).name,
      "move": move
    }
    ActionCable.server.broadcast("moves_#{params["move"]["url"]}", data.to_json)
  end
end
