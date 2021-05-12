class Upcoming < ApplicationRecord
  belongs_to :comic
  has_one :cover, foreign_key: %i[comic_id volume], primary_key: %i[comic_id volume]

  scope :available, -> { where(grabbed_at: nil, skipped_at: nil) }
end
