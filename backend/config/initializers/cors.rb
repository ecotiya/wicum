# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 疎通を許可するリクエストオリジン
    origins "localhost:5000" # React側はポート番号5000で作るので「localhost:5000」を指定

    # 疎通を許可するリソースファイル
    resource "*",
      # 疎通を許可するHTTPヘッダー
      headers: :any,
      # 疎通を許可するHTTPメソッド(optionsはリクエスト許可チェックなので削除NG)
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
      # Cookieを利用するか否か
      # credentials: true
  end
end
