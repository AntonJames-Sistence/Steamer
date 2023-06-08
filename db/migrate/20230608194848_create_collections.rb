class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.references :user, null: false, foreign_key: true, index: true, foreign_key: { to_table: 'users' }
      t.references :game, null: false, foreign_key: true, index: true, foreign_key: { to_table: 'games' }
      
      t.timestamps
    end
  end
end
