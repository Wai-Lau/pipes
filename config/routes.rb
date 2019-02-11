Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :maprooms, only: [:show]
  resources :users, only: [:new, :create]
  resources :moves, only: [:create]
  root to: "users#new"
end
