class ApplicationController < ActionController::API

    # errors handling
    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        #if invalid authenticity token
        with: :invalid_authenticity_token

    # part of protection from forgery
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception

    # before action methods
    before_action :snake_case_params
    before_action :attach_authenticity_token

    # ===================================== CHRLLL Methods ==================================

    # test method, has to be removed later
    def test
        if params.has_key?(:login)
          login!(User.first)
        elsif params.has_key?(:logout)
          logout!
        end
      
        if current_user
          render json: { user: current_user.slice('id', 'username', 'session_token') }
        else
          render json: ['No current user']
        end
    end

    # return user whose current_user attribute matches the token from cookie file or creates one
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    # synchronize session_token from cookie file with session_token in user DB
    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    # reset session_token 
    def logout!
        current_user.reset_session_token! if current_user # reset session_token to current_user in DB
        session[:session_token] = nil                     # set session_token inside cokie file to nil
        @current_user = nil                               # sets current_user to nil in order to clear stored user object
    end 
    

    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized 
        end
    end

    # ================================ Common Private Methods ================================
    private

    # using helper method to protect from CSRF attack
    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    # convertion of camelCase to snake_case
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    # clear error handling
    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, 
          status: :unprocessable_entity
    end

    # clear errors for unspecified errors like wrong variable etc...
    def unhandled_error(error)
        if request.accepts.first.html?
          raise error
        else
          @message = "#{error.class} - #{error.message}"
          @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
          render 'api/errors/internal_server_error', status: :internal_server_error
          
          logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end

end
