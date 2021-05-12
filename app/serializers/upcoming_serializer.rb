class UpcomingSerializer < ActiveModel::Serializer
  attributes :id,
             :date,
             :volume,
             :combo,
             :grabbed_at,
             :skipped_at,
             :comic_id,
             :official,
             :cover

  belongs_to :comic
end
