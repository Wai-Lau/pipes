class User < ApplicationRecord
  validates :name, presence: true
  validates_format_of :name, with: /\A[a-z0-9_-]{3,24}\z/i
end
