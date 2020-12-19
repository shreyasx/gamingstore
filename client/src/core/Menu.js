import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#2ecc72" };
	} else {
		return { color: "#FFFFFF" };
	}
};

const Menu = ({ history }) => {
	return (
		<div>
			<ul className="nav nav-tabs bg-dark">
				<li className="nav-item">
					<Link
						style={currentTab(history, "/gamingstore-frontend/")}
						className="nav-link"
						to="/gamingstore-frontend/"
					>
						Home
					</Link>
				</li>
				{isAuthenticated() && isAuthenticated().user.role !== 1 && (
					<li className="nav-item">
						<Link
							style={currentTab(history, "/gamingstore-frontend/cart")}
							className="nav-link"
							to="/gamingstore-frontend/cart"
						>
							Cart
						</Link>
					</li>
				)}
				{isAuthenticated() && isAuthenticated().user.role === 0 && (
					<li className="nav-item">
						<Link
							style={currentTab(
								history,
								"/gamingstore-frontend/user/dashboard"
							)}
							className="nav-link"
							to="/gamingstore-frontend/user/dashboard"
						>
							U. Dashboard
						</Link>
					</li>
				)}
				{isAuthenticated() && isAuthenticated().user.role === 1 && (
					<li className="nav-item">
						<Link
							style={currentTab(
								history,
								"/gamingstore-frontend/admin/dashboard"
							)}
							className="nav-link"
							to="/gamingstore-frontend/admin/dashboard"
						>
							A. Dashboard
						</Link>
					</li>
				)}
				{!isAuthenticated() && (
					<Fragment>
						<li className="nav-item">
							<Link
								style={currentTab(history, "/gamingstore-frontend/signup")}
								className="nav-link"
								to="/gamingstore-frontend/signup"
							>
								SignUp
							</Link>
						</li>
						<li className="nav-item">
							<Link
								style={currentTab(history, "/gamingstore-frontend/signin")}
								className="nav-link"
								to="/gamingstore-frontend/signin"
							>
								SignIn
							</Link>
						</li>
					</Fragment>
				)}
				{isAuthenticated() && (
					<li className="nav-item" style={{ cursor: "pointer" }}>
						<span
							className="nav-link text-warning"
							onClick={() => {
								signout(() => {
									history.push("/gamingstore-frontend/");
								});
							}}
						>
							Signout
						</span>
					</li>
				)}
			</ul>
		</div>
	);
};

export default withRouter(Menu);
