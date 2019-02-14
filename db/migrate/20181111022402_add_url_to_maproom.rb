class AddUrlToMaproom < ActiveRecord::Migration[5.0]
  def change
    add_column :maprooms, :hsh, :string
  end
end
