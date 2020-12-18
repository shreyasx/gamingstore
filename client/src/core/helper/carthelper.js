import { API } from "../../backend";
import { isAuthenticated } from "../../auth/helper";

export const addItemToCart = (item, next) => {
	const data = JSON.stringify({
		user: isAuthenticated().user._id,
		product: item,
	});
	fetch(`${API}/addToCart`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: data,
	})
		.then(r => {
			next();
		})
		.catch(console.log);
};

export const loadCart = async id => {
	const data = JSON.stringify({ id });
	const products = await fetch(`${API}/getProducts`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: data,
	})
		.then(resp => resp.json())
		.catch(console.log);
	return products;
};

export const removeItemFromCart = (productId, next) => {
	const data = JSON.stringify({
		prod: productId,
		user: isAuthenticated().user._id,
	});
	fetch(`${API}/removeFromCart`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: data,
	}).then(r => {
		next();
	});
};

export const emptyCart = next => {
	fetch(`${API}/emptyCart`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user: isAuthenticated().user._id }),
	}).then(r => {
		next();
	});
};
