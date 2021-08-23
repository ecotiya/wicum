import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
import Cookies from "js-cookie"
import {ReactRoutesPath, RailsRoutesPath, CookieKeys} from '../../constants/commonConstants';

/**
 * Validate input email
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email:string) => {
    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
    return regex.test(email);
}


/**
 * Show an alert if required input is blank
 * @param args Required input values
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args:any) => {
    let validator = true;
    for (let i=0; i < args.length; i=(i+1)|0) {
        if (args[i] === "") {
            validator = false;
        }
    }
    return validator;
};

/**
 * 非会員ページか否か判定
 * @param pathname
 * @returns {boolean}
 */
export const isNonMemberPages = (pathname:string) => {
  let isNonMemberPages = false;

  switch (pathname) {
    case ReactRoutesPath.SIGN_IN:
    case ReactRoutesPath.SIGN_UP:
      isNonMemberPages = true;
      break;
    default:
      break;
  }

  return isNonMemberPages;
};

// rails-react 疎通用 ================ Start
export const client = applyCaseMiddleware(axios.create({
  baseURL: RailsRoutesPath.BASE_URL}));

export const unauth_client_config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  ignoreHeaders: true
};

export const logined_client_config = {
  headers: {
    'access-token': Cookies.get(CookieKeys.ACCESS_TOKEN),
    'client': Cookies.get(CookieKeys.CLIENT),
    'uid': Cookies.get(CookieKeys.UID),
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  ignoreHeaders: true
};
// rails-react 疎通用 ================ End
