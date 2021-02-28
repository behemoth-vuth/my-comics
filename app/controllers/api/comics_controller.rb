module Api
  class ComicsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      comics = Comic.all
      comics = Comic.send(params[:q][:state]) if params[:q].present? && params[:q][:state].present?
      comics = comics.order(last_saved_at: :desc).ransack(params[:q]).result
      render json: comics,
             each_serializer: ::ComicSerializer,
             include: [:publisher]
    end

    def update
      @comic = Comic.find(params[:id])
      updated_now = params[:volumes_collected].to_i > @comic.volumes_collected || params[:updated_now] == 'true'
      @comic.update!(comic_params)
      @comic.update!(last_saved_at: Time.now) if updated_now
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def create
      comic = Comic.create!(comic_params)
      comic.update!(last_saved_at: Time.now)
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
        :hiatus,
        :thumbnail,
        :last_saved_at,
        meta: %i[paper_size age_restriction]
      )
    end
  end
end
