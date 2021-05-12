class VolumeImageUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    "uploads/comic/#{model.comic.id}/#{model.volume}"
  end
end
