class UpcomingSerializer < ActiveModel::Serializer
  attributes :id,
             :date,
             :volume,
             :combo,
             :grabbed_at,
             :comic_id,
             :official

  belongs_to :comic
end
