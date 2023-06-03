# == Schema Information
#
# Table name: games
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  genre        :string           not null
#  details      :text             not null
#  description  :text             not null
#  release_date :date             not null
#  developer    :string           not null
#  publisher    :string           not null
#  price        :decimal(, )      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Game < ApplicationRecord

    validates :title, uniqueness: true
    validates :title, :genre, :details, :description, :release_date, :developer, :publisher, :price, presence: true

    has_many_attached :images

    has_many :cart_items,
    dependent: :destroy
end
