module Api
  class CoversController < ApplicationController
    protect_from_forgery with: :null_session

    def create
      Cover.create!(cover_params)
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def destroy
      @cover = Cover.find(params[:id])
      @cover.destroy!
      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    def batch_upload
      @comic = Comic.find(params[:comic_id])
      batch_params[:covers].each do |cover|
        @comic.covers.create!(cover)
      end

      render json: :ok
    rescue StandardError => e
      render json: e.message, status: :unprocessable_entity
    end

    private

    def cover_params
      params.permit(
        :comic_id,
        :volume,
        :image
      )
    end

    def batch_params
      params.permit(
        :comic_id,
        covers: %i[volume image]
      )
    end
  end
end
