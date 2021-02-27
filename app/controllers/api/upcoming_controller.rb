module Api
  class UpcomingController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      # upcoming = Upcoming.available.order(date: :asc).ransack(params[:q]).result
      # render json: upcoming,
      #        each_serializer: ::UpcomingSerializer,
      #        include: [:comic]
    end

    # def update
    #   @comic = Comic.find(params[:id])
    #   @comic.update!(comic_params)
    #   render json: :ok
    # rescue StandardError => e
    #   render json: e.message, status: :unprocessable_entity
    # end

    # def create
    #   Comic.create!(comic_params)
    #   render json: :ok
    # rescue StandardError => e
    #   render json: e.message, status: :unprocessable_entity
    # end

    # def destroy
    #   @comic = Comic.find(params[:id])
    #   @comic.destroy!
    #   render json: :ok
    # rescue StandardError => e
    #   render json: e.message, status: :unprocessable_entity
    # end

    # private

    # def comic_params
    #   params.permit(
    #     :title,
    #     :copyright_title,
    #     :author,
    #     :publisher_id,
    #     :year_start,
    #     :year_end,
    #     :volumes_collected,
    #     :volumes_total,
    #     :ongoing,
    #     :finished,
    #     :thumbnail
    #   )
    # end
  end
end
