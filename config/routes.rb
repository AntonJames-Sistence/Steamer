Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create

    resource :session, only: [:show, :create, :destroy]

    resources :games, only: [:show, :index] do
      resources :reviews, only: [:index, :create]
    end

    resources :reviews, only: [:update, :destroy]

    resources :cart_items, only: [:create, :index, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
