Rails.application.routes.draw do
  devise_for :users
  root 'pages#index'

  namespace :api do
    resources :comics
    resources :publishers
    resources :upcoming do
      member do
        post :grab
      end
    end
  end

  get '*path', to: 'pages#index', via: :all
end
