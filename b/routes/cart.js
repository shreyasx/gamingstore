const express = require("express");
const router = express.Router();

const {
	getProducts,
	addToCart,
	removeFromCart,
	empty,
} = require("../controllers/cart");

router.post("/getProducts", getProducts);
router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/emptyCart", empty);

module.exports = router;
