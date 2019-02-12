Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :moves, only: [:create]
  get '/:hsh', to: "maprooms#index"
  root to: "maprooms#index"
end
