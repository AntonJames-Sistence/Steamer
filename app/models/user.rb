# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    
    #adding all password and password_digest related methods
    has_secure_password

    # adding session_token to each user
    before_validation :ensure_session_token

    # ================================ User Validations ================================
    
    validates :username, 
        uniqueness: true, 
        presence: true,
        length: { in: 3..30 }, 
        format: { without: URI::MailTo::EMAIL_REGEXP, message:  "Can't be an email" }

    validates :email, 
        uniqueness: true, 
        presence: true,
        length: { in: 3..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }

    validates :session_token,
        presence: true, 
        uniqueness: true

    validates :password, 
        length: { in: 6..255 }, 
        allow_nil: true

    has_many :cart_items,
        dependent: :destroy

    # ================================ Find By Credentials ================================

    def self.find_by_credentials(credential, password) # able to search username or email
        # assign email or username symbol according to regexp response
        if credential =~ URI::MailTo::EMAIL_REGEXP
            field = :email
        else
            field = :username
        end

        # finding user in DB, auth password and return false or user depending on result
        return user = User.find_by(field => credential)&.authenticate(password)
    end

    # resets session_token and returns a new one
    def reset_session_token!
        # self.session_token = generate_unique_session_token
        self.update!(session_token: generate_unique_session_token) # more explicit way
        return self.session_token
    end
    

    # ================================ User Private Methods ================================
    
    private

    # looping over DB and checks every session token to ensure uniqueness
    def generate_unique_session_token
        # utilizing securerandom
        token = SecureRandom.base64

        while User.exists?(session_token: token)
            token = SecureRandom.base64
        end

        return token
    end

    # simple method to assign session token to user or use existion one
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

end
