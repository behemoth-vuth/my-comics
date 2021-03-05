module Api
  class PublishersController < ApplicationController
    def index
      render json: Publisher.all,
             each_serializer: ::PublisherSerializer
    end

    def show
      publisher = Publisher.find(params[:id])
      render json: publisher.to_json
    end
  end
end
