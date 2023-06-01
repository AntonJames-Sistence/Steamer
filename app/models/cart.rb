# == Schema Information
#
# Table name: carts
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  game_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Cart < ApplicationRecord
    validates :user_id, :game_id, presence: true
    validates :user_id, uniqueness: { scope: :game_id, message: 'already has this game in their cart' }

    belongs_to :user
    belongs_to :game
end
