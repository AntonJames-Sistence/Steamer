class RenameCarts < ActiveRecord::Migration[7.0]
  def change
    rename_table :carts, :cart_items
  end
end
