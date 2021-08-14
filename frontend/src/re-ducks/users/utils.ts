import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

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
    case "/signup":
    case "/signin":
      isNonMemberPages = true;
      break;
    default:
      break;
  }

  return isNonMemberPages;
};

// rails-react 疎通用 ================ Start
export const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3000/api/v1"}));

export const client_config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  ignoreHeaders: true
};
// rails-react 疎通用 ================ End
