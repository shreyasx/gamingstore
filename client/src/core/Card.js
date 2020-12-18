import React, { useState } from "react";
import Imagehelper from "./helper/Imagehelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";

const Card = ({
	product,
	addtoCart = true,
	removeFromCart = false,
	setReload = f => f,
	reload = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cardTitle = product ? product.name : "A photo from pexels";
	const cardDescription = product ? product.descripton : "DEFAULT description";
	const cardPrice = product ? product.price : "5";

	const addToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = redir => {
		if (redir) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = () => {
		return (
			addtoCart && (
				<button
					onClick={addToCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = () => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div className="card text-white bg-dark border border-info ">
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				{getARedirect(redirect)}
				<Imagehelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
				<div className="row">
					<div className="col-12">{showAddToCart()}</div>
					<div className="col-12">{showRemoveFromCart()}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;