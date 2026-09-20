const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {

    static addProductToCart(id, productPrice) {
        let cart = { products:[], totalPrice: 0 };
        fs.readFile(p, (err, fileContent) => {
            if(!err) {
                //check if the product already exists, if yes then add quantity and replace product
                const cartData = JSON.parse(fileContent);
                const cartProducts = cartData.products;
                const cartTotalPrice =cartData.totalPrice;
                const existingProductIndex = cartProducts.findIndex(cartProdcut => cartProdcut.id === id);
                const existingProduct = cartProducts[existingProductIndex];
                if(existingProductIndex !== -1) {
                    // product already exits, we need to update the quantiy and the price
                    const updatedProduct = {...existingProduct};
                    updatedProduct.qty = updatedProduct.qty + 1
                    cart.products = [...cartProducts]
                    cart.totalPrice = cartTotalPrice + +existingProduct.price;
                    fs.writeFile(p, JSON.stringify(cart), (err) =>{
                        console.log(err);
                    });
                }
            } else {
                //file does not exist, create file
                cart.products.push({id, price:productPrice, qty:1 })
                fs.writeFile(p, JSON.stringify(cart), (err) =>{
                    console.log(err);
                    
                });

            }
        })
    }
}