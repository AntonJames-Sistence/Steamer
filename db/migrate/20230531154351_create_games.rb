class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :title, null:false, index:true, unique:true
      t.string :genre, null:false
      t.text :details, null:false
      t.text :description, null:false
      t.date :release_date, null:false
      t.string :developer, null:false
      t.string :publisher, null:false
      t.decimal :price, null:false

      t.timestamps
    end
  end
end
