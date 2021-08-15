class ApplicationController < ActionController::Base
  # deviceのヘルパーメソッドをインクルード
  include DeviseTokenAuth::Concerns::SetUserByToken
  helper_method :current_user, :user_signed_in?

  # CSRF保護をOFFにする
  protect_from_forgery with: :null_session, if: ->{request.format.json?}
end
