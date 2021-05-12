class Cover < ApplicationRecord
  belongs_to :comic

  mount_uploader :image, VolumeImageUploader

  after_create :update_comic_thumbnail

  def update_comic_thumbnail
    maximum = comic.covers.maximum(:volume)
    comic.update!(thumbnail: image) if maximum <= volume
  end
end
