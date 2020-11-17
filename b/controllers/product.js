const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");
const { update } = require("../models/product");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err) {
				res.status(400).json({
					error: "Product NOT found",
				});
			}
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem withh image",
			});
		}

		//destructure the field
		const { name, description, price, category, stock } = fields;

		if (!name || !description || !price || !category || !stock) {
			return res.status(400).json({
				error: "Please include all fields",
			});
		}

		let product = new Product(fields);

		//Handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "FILE size too big",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//console.log(product);

		//save to DB
		product.save((err, product) => {
			if (err) {
				res.status(400).json({
					error: "ERROR saving tshirt in DB",
				});
			}
			res.json(product);
		});
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

exports.deleteProduct = (req, res) => {
	const product = req.product;

	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: "FAILED to delete the product",
			});
		}
		res.json({
			message: `Deletion of ${deletedProduct.name} was Successfull`,
		});
	});
};

exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem withh image",
			});
		}

		let product = req.product;
		product = _.extend(product, fields);

		//Handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "FILE size too big",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//console.log(product);

		//save to DB
		product.save((err, product) => {
			if (err) {
				res.status(400).json({
					error: "Updation of product failed",
				});
			}
			res.json(product);
		});
	});
};

//product listing
exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sortBy ? (sortBy = req.query.sortBy) : "_id";

	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "NO product found in DB",
				});
			}
			res.json(products);
		});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, category) => {
		if (err) {
			return res.status(400).json({
				error: "NO categories found",
			});
		}
		res.json(category);
	});
};

exports.updateStock = (req, res, next) => {
	let myOperations = req.body.order.products.map(prod => {
		return {
			updateOne: {
				filter: { _id: prod._id },
				update: { $inc: { stock: -prod.count, sold: +prod.count } },
			},
		};
	});

	Product.bulkWrite(myOperations, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "BULK operation Failed",
			});
		}
		next();
	});
};
