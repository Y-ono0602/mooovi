TechReviewSite::Application.routes.draw do

  devise_for :users
  resources :users, only: :show
  resources :reviews, only: [:new, :create]

  resources :products, only: :show do
    resources :reviews, only: [:new, :create]
    collection do
      get 'search'
    end
  end
  root 'products#index'
end
