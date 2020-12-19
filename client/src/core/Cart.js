import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/carthelper";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const ps = await loadCart(isAuthenticated().user._id);
			setProducts(ps);
			setLoading(false);
		})();
	}, [reload]);

	const loadAllProducts = () => {
		if (products.length === 0) return "No items in your cart. Go add some now!";
		else
			return (
				<div>
					{products.map((product, index) => (
						<Card
							key={index}
							product={product}
							addtoCart={false}
							removeFromCart={true}
							setReload={setReload}
							reload={reload}
						/>
					))}
				</div>
			);
	};

	const loadCheckout = () => <h2>This Section for Checking out:</h2>;

	return (
		<Base title="Cart Page" description="Ready to checkout">
			<div className="row text-white">
				{!isAuthenticated().user ? (
					<h6>
						Please <Link to="/signin">SignIn</Link> first.
					</h6>
				) : (
					<>
						<div className="col-md-6">
							<h2>Your Cart:</h2>
							{loading ? <h2>Loading Cart...</h2> : loadAllProducts()}
						</div>
						<div className="col-md-6">{loadCheckout()}</div>
					</>
				)}
			</div>
		</Base>
	);
};

export default Cart;
