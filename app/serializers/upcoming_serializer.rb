class UpcomingSerializer < ActiveModel::Serializer
  attributes :id,
             :date,
             :volume,
             :combo,
             :grabbed_at,
             :comic_id

  belongs_to :comic
end
