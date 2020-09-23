Rails.application.routes.draw do
  devise_for :users
  root 'pages#index'

  namespace :api do
    resources :comics
    resources :publishers
  end

  get '*path', to: 'pages#index', via: :all
end
