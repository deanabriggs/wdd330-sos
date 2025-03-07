import { formDataToJSON, setLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export async function login(formData, redirect = "/") {
  const loginUrl = baseURL + "login";
  const payload = formDataToJSON(formData);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  console.log(options);
  await fetch(loginUrl, options)
    .then((data) => {
      console.log(data);
      setLocalStorage("so-token", data);
      window.location = redirect;
    })
    .catch((err) => console.log(err));
}

function checkLogin() {}

function isTokenValid() {}
