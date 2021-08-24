# アカウント作成用コントローラー
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end

    def account_update_params
      params.permit(:name, :email, :avatar)
    end

    # ActiveStorageに紐づけた画像情報を返却する。
    def render_update_success
      render json: { data: current_api_v1_user }, methods: [:avatar_url]
    end
end
