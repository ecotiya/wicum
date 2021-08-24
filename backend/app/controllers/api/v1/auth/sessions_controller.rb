# ログイン状態確認用コントローラー
class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { data: current_api_v1_user } ,methods: [:avatar_url]
    else
      render json: { message: "ユーザーが存在しません" }
    end
  end
end
