class MovesController < ApplicationController
  def create
    move = params["move"]["content"]
    user = params["move"]["user"]
    data = {
        "user": user,
        "move": move
    }
    ActionCable.server.broadcast("moves_#{params["move"]["hsh"]}",
                                 data.to_json)
  end
end
