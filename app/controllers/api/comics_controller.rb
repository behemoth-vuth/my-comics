module Api
  class ComicsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      comics = Comic.all
      comics = Comic.send(params[:q][:state]) if params[:q].present? && params[:q][:state].present?
      comics = comics.order(last_saved_at: :desc).ransack(params[:q]).result

      # @pagy, @comics = pagy(
      #   comics,
      #   items: params[:per_page] || 20
      # )
      # render json: @comics,
      #        adapter: :json,
      #        each_serializer: ComicSerializer,
      #        meta: {
      #          total: @pagy.count,
      #          page: @pagy.page,
      #          items: @pagy.items,
      #        }

      render json: comics,
             each_serializer: ::ComicSerializer,
             include: [:publisher]
    end

    def show
      render json: Comic.find(params[:id]),
             include: %i[publisher upcomings covers]
    end

    def update
      @comic = Comic.find(params[:id])
      @comic.update!(comic_params)
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
        :original_status,
        :publishing_status,
        meta: %i[paper_size age_restriction]
      )
    end
  end
end
