class Comic < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :publisher
  has_many :upcomings, -> { order(volume: :asc) }
  has_many :covers, -> { order(volume: :asc) }

  after_create :create_cover

  serialize :meta, JSON

  mount_uploader :thumbnail, ImageUploader

  scope :finished, -> { original_status_finished.where('volumes_collected = volumes_total') }
  scope :running, -> { where.not(publishing_status: %i[hiatus dropped finished]).where('volumes_collected > 0') }
  scope :pausing, -> { where(publishing_status: %i[hiatus dropped]).where('volumes_collected > 0') }
  scope :following, -> { where(volumes_collected: 0) }

  enum publishing_status: {
    upcoming: 0,
    running: 1,
    hiatus: 2,
    finished: 3,
    dropped: 4
  }, _prefix: true

  enum original_status: {
    running: 1,
    hiatus: 2,
    finished: 3,
    dropped: 4
  }, _prefix: true

  def create_cover
    covers.create!(volume: 1, image: thumbnail) if volumes_total == 1
  end
end
