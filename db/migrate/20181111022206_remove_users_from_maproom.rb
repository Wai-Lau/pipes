class RemoveUsersFromMaproom < ActiveRecord::Migration[5.0]
  def change
    remove_column :maprooms, :user_id, :integer
  end
end
