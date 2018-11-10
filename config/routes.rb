Rails.application.routes.draw do
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
  resources :maprooms
  resources :users
  resources :moves
  root to: "users#new"
end
