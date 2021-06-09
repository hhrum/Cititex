
exports.productMaker = (product) => {

  const productElement = document.createElement('div');
  productElement.className = "product";

  const productHeader = document.createElement('div');
  productHeader.className = 'product__header';

  const image = document.createElement("div");
  image.className = "product__image";
  image.innerHTML = `<img src="${product.image}">`;

  const imageEl = document.createElement("div");
  imageEl.className = "product__image";
  imageEl.innerHTML = `<img src="${product.image}">`;

  const productFooter = document.createElement('div');
  productFooter.className = 'product__header';


  return productElement;
}