class MovesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "moves_#{params[:hsh]}"
  end
end
