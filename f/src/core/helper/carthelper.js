import { API } from "../../backend";
import { isAuthenticated } from "../../auth/helper";

export const addItemToCart = (item, next) => {
	const data = JSON.stringify({
		user: isAuthenticated().user._id,
		product: item,
	});
	fetch(`${API}/addToCart`, { method: "POST", body: data })
		.then(next())
		.catch(console.log);
};

export const loadCart = async id => {
	const data = JSON.stringify({ id });
	console.log("data- ", data);
	const products = await fetch(`${API}/getProducts`, {
		method: "POST",
		body: data,
	})
		.then(resp => resp.json())
		.catch(console.log);
	return products;
};

export const removeItemFromCart = productId => {
	const data = JSON.stringify({
		prod: productId,
		user: isAuthenticated().user._id,
	});
	fetch(`${API}/removeFromCart`, {
		method: "POST",
		body: data,
	});
};

export const emptyCart = next => {
	fetch(`${API}/emptyCart`, {
		method: "POST",
		body: JSON.stringify({ user: isAuthenticated().user._id }),
	}).then(next());
};
