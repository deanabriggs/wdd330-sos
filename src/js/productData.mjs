// Provides functionality to retrieve data and expose to other parts of the application

function convertToJson(res) {
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

export async function getData(category = "tents") {
  const fileContents = await fetch(`../json/${category}.json`);
  let data = convertToJson(fileContents);
  return data;
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
