import { getParam, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

document.forms.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = e.target;
  login(data, redirect);
});
