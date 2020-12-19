import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import AboutUs from "./core/AboutUs";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/gamingstore-frontend" exact component={Home} />
				<Route path="/gamingstore-frontend/signup" exact component={Signup} />
				<Route path="/gamingstore-frontend/signin" exact component={Signin} />
				<Route path="/gamingstore-frontend/cart" exact component={Cart} />
				<Route path="/gamingstore-frontend/about" exact component={AboutUs} />
				<PrivateRoute
					path="/gamingstore-frontend/user/dashboard"
					exact
					component={UserDashboard}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/dashboard"
					exact
					component={AdminDashboard}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/create/category"
					exact
					component={AddCategory}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/categories"
					exact
					component={ManageCategories}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/create/product"
					exact
					component={AddProduct}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/products"
					exact
					component={ManageProducts}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/product/update/:productId"
					exact
					component={UpdateProduct}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/categories"
					exact
					component={ManageCategories}
				/>
				<AdminRoute
					path="/gamingstore-frontend/admin/category/update/:categoryId"
					exact
					component={UpdateCategory}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
