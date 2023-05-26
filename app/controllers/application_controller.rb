class ApplicationController < ActionController::API

    # part of protection from forgery
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception
    
    # convertion of camelCase to snake_case
    before_action :snake_case_params
    # using helper method to protect from CSRF attack
    before_action :attach_authenticity_token


    def test
        render json: { message: ["Hello from Rails"] }
    end


    private

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def snake_case_params
    params.deep_transform_keys!(&:underscore)
    end
end
