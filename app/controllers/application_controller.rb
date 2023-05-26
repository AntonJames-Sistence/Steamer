class ApplicationController < ActionController::API

    # convertion of camelCase to snake_case
    before_action :snake_case_params

    private

    def snake_case_params
    params.deep_transform_keys!(&:underscore)
    end
end
