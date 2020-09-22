class Comic < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :publisher

  mount_uploader :thumbnail, ImageUploader
end
