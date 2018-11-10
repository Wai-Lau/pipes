class AddUrlToMaproom < ActiveRecord::Migration[5.0]
  def change
    add_column :maprooms, :url, :string
  end
end
