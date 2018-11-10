class AddMaproomIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :maproom_id, :integer
  end
end
