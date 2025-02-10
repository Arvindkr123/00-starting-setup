const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/databases");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const UserModel = require("./models/user.models");
const { where } = require("sequelize");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ where: { id: 1 } });
    // console.log(user);
    if (user) req.user = user;
    next();
  } catch (err) {
    console.error("Error fetching user:", err);
    next(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Define Model Relationships
Product.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(Product);

sequelize
  .sync({ alter: true }) // Avoid force:true in production
  .then(async () => {
    let user = await UserModel.findOne({ where: { id: 1 } });
    if (!user) {
      user = await UserModel.create({ name: "arvind", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log("User initialized:", user.name);
    app.listen(4000, () => console.log("Server running on port 4000"));
  })
  .catch((err) => console.error("Sequelize sync error:", err));
