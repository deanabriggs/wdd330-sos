import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";
import req from "express/lib/request";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

async function processOrder(req, res){
  if(submitResponse){
    location.replace("/success");
  }
}



document.forms.checkout.addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});
