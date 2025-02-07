// central point of locating the requested "product" and calling the detail to be add for the page
import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);
