import { getLocalStorage, qs, setLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// Converts form data to JSON format
function formDataToJSON(formElement) {
  const formData = new FormData(formElement), // Create a FormData object form the form
    convertedJSON = {}; // Empty object to store key-value pairs

  formData.forEach(function (value, key) {
    // Loop through form data entries
    convertedJSON[key] = value; // assign key-value pairs to JSON object
  });

  return convertedJSON; // Return formatted JSON object
}

// Creates simplified list of items with relevant details
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    // Maps each item in the list to a new object
    console.log(item); // For Debugging - shows each item in console
    return {
      id: item.Id, // Stores item ID
      price: item.FinalPrice, // Stores item Final Price
      name: item.Name, // Stores item Name
      quantity: item.Quantity, // Stores item Quantity
      itemSubtotal: item.FinalPrice * item.Quantity, // Calculate and store item Subtotal
    };
  });
  return simplifiedItems; // Returns newly structured item list
}

// Main checkout process object
const checkoutProcess = {
  key: "", // Key for local storage reference
  outputSelector: "", // Selector for the checkout summary display
  list: [], // List of items in the cart
  itemTotal: 0, // Total cost of items before tax and shipping
  itemQuantity: 0, // Total number of items
  shipping: 0, // Shipping cost
  tax: 0, // Calculated tax
  orderTotal: 0, // Final order total including tax and shipping

  // Initializes the checkout process with stored cart data
  init: function (key, outputSelector) {
    this.key = key; // Set the key for local storage retrieval
    this.outputSelector = outputSelector; // Set the output selector for updating the UI
    this.list = getLocalStorage(key); // Retrieve stored cart data from local storage
    this.calculateItemSummary(); // Calculate item totals and update the UI
    this.calculateOrdertotal(); // Calculate shipping, tax, and final order total
  },

  // Calculates the item subtotal and updates UI
  calculateItemSummary: function () {
    const summaryElement = qs(this.outputSelector + " #cartTotal"); // Select cart total element
    const itemNumElement = qs(this.outputSelector + " #num-items"); // Select item count element

    const quantity = this.list.map((item) => item.Quantity); // Extract item quantities from the cart list
    this.itemQuantity = quantity.reduce((sum, item) => sum + item, 0);
    itemNumElement.innerText = this.itemQuantity; // Sum quantities and update UI

    const amounts = this.list.map((item) => item.FinalPrice * item.Quantity); // Calculate item subtotals
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0); // Store total item cost in checkoutProcess
    summaryElement.innerText = this.itemTotal; // Update total cost in UI
  },

  calculateOrdertotal: function () {
    this.shipping = 10 + (this.itemQuantity - 1) * 2; // Base shipping cost $10 + $2 per additional item
    this.tax = (this.itemTotal * 0.06).toFixed(2); // Calculate tax @ 6% of item total
    this.orderTotal = (
      parseFloat(this.itemTotal) + // Add item total
      parseFloat(this.shipping) + // Add shipping cost
      parseFloat(this.tax)
    ) // Add tax
      .toFixed(2); // Convert to 2-decimal format
    this.displayOrderTotals(); // Update UI with total
  },

  // Displays order totals in the UI
  displayOrderTotals: function () {
    const shipping = qs(this.outputSelector + " #shipping");
    const tax = qs(this.outputSelector + " #tax");
    const orderTotal = qs(this.outputSelector + " #orderTotal");
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },

  // Handles the checkout process and sends order data
  checkout: async function (form) {
    console.log("");
    // set "checkout" as KEY, use function to create VALUE
    const json = formDataToJSON(form); // formats form data to JSON
    json.orderDate = new Date(); // adds orderDate to the JSON
    json.orderTotal = this.orderTotal; // adds orderTotal to the JSON, based on "this" property
    json.tax = this.tax; // adds tax to the JSON, based on "this" property
    json.shipping = this.shipping; // adds shipping to the JSON, based on "this" property
    json.items = packageItems(this.list); // adds items to the JSON as an object, using packageItems function that returns simplified list of items (id, price, name, quantity, itemSubtotal)
    console.log(json); // show the json in the console
    try {
      const res = await checkout(json); // attempt to populate "checkout" using the json form data
      console.log(res); // display results to the console
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      // catch any errors
      
      removeAllAlerts();
      for(let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err); // display errors to the console
    }
  },
};

export default checkoutProcess;
