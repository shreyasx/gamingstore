import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	return (
		<Base title="UserDashboard Page">
			<h1 className="text-white">This is a User-Dashboard Page</h1>
			<h2 className="text-white">Hey, {isAuthenticated().user.name}.</h2>
		</Base>
	);
};

export default UserDashboard;
