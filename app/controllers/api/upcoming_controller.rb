module Api
  class UpcomingController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      upcoming = Upcoming.available.order(date: :asc).ransack(params[:q]).result
      upcoming = upcoming.includes(:comic).order('comics.publisher_id asc')
      render json: upcoming,
             each_serializer: ::UpcomingSerializer,
             include: [comic: :publisher]
    end

    def update
      @upcoming = Upcoming.find(params[:id])
      @upcoming.update!(upcoming_params)
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def create
      Upcoming.create!(upcoming_params)
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def destroy
      @upcoming = Upcoming.find(params[:id])
      @upcoming.destroy!
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def grab
      @upcoming = Upcoming.find(params[:id])
      @upcoming.update!(grabbed_at: Time.now)
      @upcoming.comic.update!(volumes_collected: @upcoming.volume - 1 + @upcoming.combo, last_saved_at: Time.now)
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    private

    def upcoming_params
      params.permit(
        :comic_id,
        :date,
        :volume,
        :combo,
        :official
      )
    end
  end
end
