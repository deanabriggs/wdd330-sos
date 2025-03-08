import {
  formDataToJSON,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function login(formData, redirect) {
  try {
    const jsonFormData = formDataToJSON(formData);
    console.log(jsonFormData);
    const token = await loginRequest(jsonFormData);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    console.log(err);
  }
}

export function checkLogin() {
  let valid = false;
  let token;
  try {
    token = getLocalStorage(tokenKey);
    valid = isTokenValid(token);
  } catch (err) {
    console.error(err);
  }
  if (!valid) {
    removeLocalStorage(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location}`;
  } else {
    return token;
  }
}

function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token Expired");
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
