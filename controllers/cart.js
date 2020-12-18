const Cart = require("../models/cart");

const addToCart = (req, res) => {
	const { user, product } = req.body;
	Cart.findOne({ user }, (er, cart) => {
		if (er) {
			console.log(er);
			return;
		}
		if (!cart) {
			const cart = new Cart();
			cart.user = user;
			cart.products.push(product);
			cart.save((er, result) => {
				if (er) {
					console.log(er);
					res.status(400);
					return;
				}
				res.json(true);
			});
		} else {
			cart.products.push(product);
			cart.save((er, result) => {
				if (er) {
					console.log(er);
					res.status(400);
					return;
				}
				res.json(true);
			});
		}
	});
};

const removeFromCart = (req, res) => {
	const { prod, user } = req.body;
	Cart.findOne({ user }, (er, cart) => {
		if (er) {
			console.log(er);
			return;
		}
		if (!cart) {
			res.json("no cart!");
			return;
		}
		cart.products = cart.products.filter(product => product._id != prod);
		cart.save((er, result) => {
			if (er) {
				console.log(er);
				res.status(400);
				return;
			}
			res.json(true);
		});
	});
};

const getProducts = (req, res) => {
	const { id } = req.body;
	Cart.findOne({ user: id }, (er, cart) => {
		if (er) {
			console.log(er);
			return;
		}
		if (!cart) {
			res.json([]);
		} else {
			res.json(cart.products);
		}
	});
};

const empty = (req, res) => {
	const { user } = req.body;
	Cart.findOne({ user }, (er, cart) => {
		if (er) {
			console.log(er);
			return;
		}
		if (!cart) {
			res.json(true);
			return;
		}
		cart.products = [];
		cart.save((er, result) => {
			if (er) {
				console.log(er);
				res.status(400);
				return;
			}
			res.json(true);
		});
	});
};

module.exports = { getProducts, removeFromCart, empty, addToCart };
