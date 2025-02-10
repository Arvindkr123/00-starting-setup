const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  // console.log("from add product",req.user)

  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    // Product.create({
    //   title,
    //   price,
    //   imageUrl,
    //   description,
    //   UserId: req.user.id,
    // })
    .then((product) => {
      console.log("Product added:", product);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Error adding product:", err);
      res.status(500).send("Internal Server Error");
    });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  // Product.findOne({ where: { id: prodId } })
  req.user
    .getProducts({
      where: {
        id: prodId,
      },
    })
    .then((products) => {
      let product = products[0];
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch(() => {});
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findOne({ where: { id: prodId } })
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT SUCCESSFULLY");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    // console.log(products);
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });

  // Product.findAll().then((products) => {
  //   // console.log(products);
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findOne({ where: { id: prodId } })
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      return product.destroy();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {});
};
