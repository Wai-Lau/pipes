require 'securerandom'

class MaproomsController < ApplicationController
  def index
    if params[:hsh]
      room = current_room if params[:hsh]
    end
    room = Maproom.new(hsh: SecureRandom.hex[0..12]) unless room
    room.save!
    @hsh = room[:hsh]
    @maproom = room.id
    host = ENV['WEBSOCKET_HOST']
    @host = "http://#{host}/"
  end

  private

  def current_room
    Maproom.find_by(hsh: params[:hsh])
  end
end
