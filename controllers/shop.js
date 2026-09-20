const Product = require('../models/product');
const CartModel = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.showDetails = (req, resp, next) => {
      // const product = null
      console.log(req);
      Product.fetchAll(products => {
        const product = products.find(product => product.id === req.params.productId);
        console.log(`product is ${JSON.stringify(product)}`);
        resp.render('shop/product-detail', {product: product, pageTitle:product.title, path: '/products'});
      })
    
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.addToCart = (req, res, next) => {
    console.log(`productId is ${req.body.productId}`)
    CartModel.addProductToCart(req.body.productId, req.body.productPrice);
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
