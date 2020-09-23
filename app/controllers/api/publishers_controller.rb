module Api
  class PublishersController < ApplicationController
    def index
      render json: Publisher.all.to_json
    end

    def show
      publisher = Publisher.find(params[:id])
      render json: publisher.to_json
    end
  end
end
