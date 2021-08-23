class ApplicationController < ActionController::Base
  # deviceのヘルパーメソッドをインクルード
  include DeviseTokenAuth::Concerns::SetUserByToken
  helper_method :current_user, :user_signed_in?

  # CSRF保護をOFFにする
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  # deviseコントローラにストロングパラメータを追加
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    # 編集画面から画像を受け取れるよう設定
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:account_update, keys: %i(avatar))
    end
end
