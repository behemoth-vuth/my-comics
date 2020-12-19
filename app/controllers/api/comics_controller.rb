module Api
  class ComicsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      comics = Comic.all.order(updated_at: :desc).ransack(params[:q]).result
      comics = comics.where('volumes_collected = volumes_total') if params[:q][:finished]
      render json: comics,
             each_serializer: ::ComicSerializer,
             include: [:publisher]
    end

    def update
      @comic = Comic.find(params[:id])
      @comic.update!(comic_params)
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def create
      Comic.create!(comic_params)
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def destroy
      @comic = Comic.find(params[:id])
      @comic.destroy!
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    private

    def comic_params
      params.permit(
        :title,
        :copyright_title,
        :author,
        :publisher_id,
        :year_start,
        :year_end,
        :volumes_collected,
        :volumes_total,
        :ongoing,
        :finished,
        :thumbnail
      )
    end
  end
end
