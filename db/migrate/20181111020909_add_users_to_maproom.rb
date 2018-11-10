class AddUsersToMaproom < ActiveRecord::Migration[5.0]
  def change
    add_column :maprooms, :user_id, :integer
  end
end
