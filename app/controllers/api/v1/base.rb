module Api
  module V1
    class Base < Grape::API
      mount Api::V1::Props
      mount Api::V1::Users
      mount Api::V1::Rankings

      add_swagger_documentation base_path: '/api',
                                api_version: 'v1',
                                hide_documentation_path: true
    end
  end
end
