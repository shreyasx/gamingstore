const { Order, ProductCart } = require("../models/order");
const order = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate("products.product", "name price")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "NO order found in DB",
				});
			}
			req.order = order;
			next();
		});
};

exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "FAILED to save your order in DB",
			});
		}
		res.json(order);
	});
};

exports.getAllOrders = (req, res) => {
	Order.find()
		.populate("user", "_id name")
		.exec((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: "NO orders found in DB",
				});
			}
			res.json(orders);
		});
};

exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
	Order.update(
		{ _id: req.body.order._id },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "CANNOT update order status",
				});
			}
			res.json(order);
		}
	);
};
