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
             :last_saved_at

  belongs_to :publisher

  def meta
    object.meta || {}
  end
end
