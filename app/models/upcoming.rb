class Upcoming < ApplicationRecord
  belongs_to :comic

  scope :available, -> { where(grabbed_at: nil, skipped_at: nil) }
end
