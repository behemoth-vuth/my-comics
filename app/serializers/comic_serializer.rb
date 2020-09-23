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
             :finished,
             :thumbnail,
             :publisher_id

  belongs_to :publisher
end
