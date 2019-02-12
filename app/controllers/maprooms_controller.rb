class MaproomsController < ApplicationController
  def index
    @hsh = params[:hsh]
    room = current_room
    @maproom = room.id
    host = ENV['WEBSOCKET_HOST']
    port = ENV['WEBSOCKET_HOST_PORT']
    @host = "http://#{host}:#{port}"
  end

  private

  def current_room
    Maproom.find_or_create_by(hsh: params[:hsh])
  end
end
