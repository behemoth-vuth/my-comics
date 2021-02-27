class Comic < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :publisher

  serialize :meta, JSON

  mount_uploader :thumbnail, ImageUploader

  scope :finished, -> { where('ongoing != 1 and volumes_collected = volumes_total') }
  scope :collecting, -> { where(hiatus: 0).where('volumes_collected > 0 and volumes_collected < volumes_total') }
  # scope :ongoing, -> { where(ongoing: 1, hiatus: 0).where('volumes_collected > 0') }
  scope :ongoing, -> { where(hiatus: 1).where('volumes_collected > 0') }
  scope :following, -> { where(volumes_collected: 0) }
end
