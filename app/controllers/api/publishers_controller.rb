module Api
  class PublishersController < ApplicationController
    def index
      render json: Publisher.all.to_json
    end
  end
end
