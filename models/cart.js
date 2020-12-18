const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: "User",
		required: true,
	},
	products: [],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
