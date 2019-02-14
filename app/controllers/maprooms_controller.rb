require 'securerandom'

class MaproomsController < ApplicationController
  def index
    if params[:hsh]
      room = current_room if params[:hsh]
    end
    if not room
      room = Maproom.new(hsh: SecureRandom.hex[0..12])
      while not room.save
        room = Maproom.new(hsh: SecureRandom.hex[0..12])
      end
    end
    @hsh = room[:hsh]
    @maproom = room.id
    host = ENV['WEBSOCKET_HOST']
    @host = "https://#{host}/"
  end

  private

  def current_room
    Maproom.find_by(hsh: params[:hsh])
  end
end
