# WICUM
★READMEの書き方が素敵じゃないので編集します。


## 使用技術及び考慮事項
　●使用技術
　　・Ruby(2.7.1)
　　・Ruby on Rails(6.0.3)
　　・MySQL(8.0)
　　・Docker

　●考慮事項
　　・PCデザイン(960px以上)
　　・レスポンシブデザイン(500px以下)


## アプリの概要
　人生の目標設定を補助するためのアプリケーション


## アプリの詳細
　人生の目標にどうすれば到達できるかブレークダウンする。
　ブレークダウンした結果をTODO化する。
　作成したTODOを達成できたか否か、目標に到達するためのTODO見直しを行う。
　　目標見直しサイクル：年次、半年、３ヶ月毎、１ヶ月毎、週毎、１日毎


## 想定機能(※順次変更)
　●ログイン画面
　　・簡単ログイン
　　・ユーザ登録
　　・ログイン

　●トップ画面
　　・ログアウト
　　・メールアドレス変更
　　・パスワード変更
　　・退会

　●目標設定画面

　●TODO画面
　　・TODO一覧
　　・TODO検索
　　・TODO登録
　　・TODO修正
　　・TODO完了
　　・TODO永久完了
　　・TODO削除
　　・完了済TODO一覧
　　・完了済TODO検索
　　・完了済TODO復元
　　・TODOリマインド
　　・カテゴリ編集
　　・日記機能
　　・TodoIstとの連携機能
　　・ページネーション機能

　●DBテーブルのリレーション管理
　●DBトランザクションの制御機能
　●単体テスト機能
　●統合テスト機能

　
# アプリ起動情報


## コンテナ起動方法
①コンソールを開く
②アプリを入れたディレクトリに移動
③下記コマンド実行
　docker-compose up --build


## コンテナ停止方法
Ctrl + C


## コンテナ削除方法
①コンソールを開く
②アプリを入れたディレクトリに移動
③下記コマンド実行
　docker-compose down


# URL


## wicumアプリ
http://localhost:3000/


## DBテーブル確認
■phpMyAdmin(コンテナ起動後)
http://localhost:8080/


■開発対象スキーマ
http://localhost:8080/db_structure.php?server=1&db=wicum_develop


## コンテナ上のコンソールログイン
　docker exec -it <containerId> bash
　bundle exec rails c
　Ctrl + P + Q
