const Product = require("../models/product");
const Category = require("../models/category");

exports.getCategories = (req, res) => {
	Category.find({}, (er, cs) => {
		if (er) {
			console.log(er);
			return;
		}
		res.json(cs);
	});
};

exports.getProducts = (req, res) => {
	const { categ } = req.query;
	Category.findOne({ name: categ }, (er, category) => {
		Product.find({ category: category._id }, (err, prods) => {
			res.json(
				prods.map(p => {
					const { name, price, _id } = p;
					return { name, price, _id };
				})
			);
		});
	});
};
