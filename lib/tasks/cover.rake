namespace :cover do
  task migrate: :environment do
    Comic.all.find_each do |comic|
      if comic.volumes_total == 1 && comic.covers.count == 0
        comic.covers.create!(volume: 1, image: comic.thumbnail)
      end
    end
  end
end
