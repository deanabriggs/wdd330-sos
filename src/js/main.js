import productList from "./productList.mjs";
import { totalQuantity, loadHeaderFooter } from "./utils.mjs";
import { loadAlerts, showRegisterModal } from "./alert.mjs";

loadHeaderFooter();
productList(".product-list", "tents");
loadAlerts();
showRegisterModal();

document.addEventListener("DOMContentLoaded", () => {
  totalQuantity();
});
