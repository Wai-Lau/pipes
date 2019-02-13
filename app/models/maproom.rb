class Maproom < ApplicationRecord
  validates :hsh, uniqueness: true
end
