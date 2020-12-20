import React from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "bg-dark text=white p-4",
	children,
}) => {
	return (
		<div>
			<Menu />
			<div className="container-fluid">
				<div className="jumbotron bg-dark text-white text-center">
					<h2 className="display-4">{title}</h2>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-dark mt-5">
				<div className=" pb-4 container-fluid p-3 bg-success text-white text-center">
					<h4 className="p-3">Feel free to reach out in case of queries.</h4>
					<Link to="/about">
						<button style={{ fontWeight: "bold" }} className="btn btn-warning">
							Contact Us
						</button>
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default Base;
