/** Reactルーター指定のパス */
export const ReactRoutesPath = {
  SIGN_IN: '/signin', // サインイン画面
  SIGN_UP: '/signup', // サインアップ画面
  HOME: '/',          // ホーム画面
};

/** Railsルーター指定のパス */
export const RailsRoutesPath = {
  BASE_URL: 'http://localhost:3000/api/v1/',  // railsにapiを投げるメインのURL
  SIGN_IN:  'auth/sign_in',                   // サインイン
  SIGN_UP:  'auth',                           // サインアップ
  SIGN_OUT: 'auth/sign_out',                  // サインアウト
  SESSION:  'auth/sessions',                  // セッション確認
};

/** Cookieに保存するキー情報 */
export const CookieKeys = {
  ACCESS_TOKEN: '_access_token',
  CLIENT: '_client',
  UID: '_uid',
};
