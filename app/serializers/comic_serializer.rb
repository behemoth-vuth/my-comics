class ComicSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :copyright_title,
             :author,
             :year_start,
             :year_end,
             :year_end,
             :volumes_collected,
             :volumes_total,
             :ongoing,
             :hiatus,
             :thumbnail,
             :publisher_id,
             :meta,
             :original_status,
             :publishing_status,
             :last_saved_at,
             :updated_at

  belongs_to :publisher
  has_many :upcomings

  def meta
    object.meta || {}
  end
end
