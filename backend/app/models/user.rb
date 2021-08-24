# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :validatable#, :confirmable
  include DeviseTokenAuth::Concerns::User

  # url_forを使うためにインクルード
  include Rails.application.routes.url_helpers

  # ActiveStorageとUserを紐付け
  has_one_attached :avatar

  # バリデーション
  validate :validate_avatar

  # アバター画像のバリデーション内容
  def validate_avatar
    return unless avatar.attached?
    # 画像サイズの制限
    if avatar.blob.byte_size > 10.megabytes
      # エラーメッセージはi18nから取得
      errors.add(:avatar, :file_too_large)
    elsif !avatar?
      errors.add(:avatar, :file_type_not_image)
    end
  end

   # 拡張子でファイルの種類を確認
   def avatar?
     avatar.content_type.in?(%("image/jpeg image/jpg image/png"))
   end

   def avatar_url
     # 紐づいている画像のURLを取得する
     avatar.attached? ?  url_for(avatar) : nil
   end

   # device機能説明
   ## database_authenticatable
   ### サインイン時にユーザーの正当性を検証するためにパスワードをハッシュ化してDBに登録します。認証方法としてはPOSTリクエストかHTTP Basic認証が使えます。
   ## registerable
   ### 登録処理を通してユーザーをサインアップします。また、ユーザーに自身のアカウントを編集したり削除できるようにします。
   ## recoverable
   ### パスワードをリセットし、それを通知します。
   ## rememberable
   ### 保存されたcookieから、ユーザーを記憶するためのトークンを生成・削除します。
   ## trackable
   ### サインイン回数や、サインイン時間、IPアドレスを記録します。
   ## validatable
   ### 	Emailやパスワードのバリデーションを提供します。独自に定義したバリデーションを追加することもできます。
   ## confirmable
   ### メールに記載されているURLをクリックして本登録を完了する、といったよくある登録方式を提供します。また、サインイン中にアカウントが認証済みかどうかを検証します。
   ## lockable
   ### 一定回数サインインを失敗するとアカウントをロックします。ロック解除にはメールによる解除か、一定時間経つと解除するといった方法があります。
   ## timeoutable
   ### 	一定時間活動していないアカウントのセッションを破棄します。
end
