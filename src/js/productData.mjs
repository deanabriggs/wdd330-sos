// Provides functionality to retrieve data and expose to other parts of the application
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// add to cart button event handler
export async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

export async function getData(category = "hammocks") {
  console.log(baseURL + `products/search/${category}`);
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);

  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);

  return data.Result;
}
