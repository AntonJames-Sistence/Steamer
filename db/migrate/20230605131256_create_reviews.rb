class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.bigint :author_id, null: false, index: true, unique: true
      t.bigint :game_id, null: false, index: true, unique: true
      t.text :body, null: false
      t.boolean :recommended, null: false

      t.timestamps
    end

  end
end
